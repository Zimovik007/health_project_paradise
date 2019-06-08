//npm modules
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite3');
const bodyParser = require('body-parser');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);


const port = process.env.PORT || 8080;

db.serialize(function() {
  db.run(
    'CREATE TABLE IF NOT EXISTS "users" ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `login` TEXT NOT NULL UNIQUE, `password` TEXT, `points` INTEGER DEFAULT 0, `searching` INTEGER DEFAULT 0 )'
  );

  db.run(
    'CREATE TABLE IF NOT EXISTS `cards` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `title` TEXT )'
  );

  db.run(
    'CREATE TABLE IF NOT EXISTS "user_cards" ( `id_user` INTEGER, `id_card` INTEGER, FOREIGN KEY(`id_card`) REFERENCES `cards`(`id`), FOREIGN KEY(`id_user`) REFERENCES `user`(`id`) )'
  );

  db.run(
    'CREATE TABLE IF NOT EXISTS matches ( id INTEGER PRIMARY KEY AUTOINCREMENT, '
      + ' id_first INTEGER, id_second INTEGER, '
      + ' city INTEGER, categories TEXT, request TEXT, winner INTEGER,'
      + ' FOREIGN KEY(id_first) REFERENCES users(id), FOREIGN KEY(id_second) REFERENCES users(id))');
});

// create the server
const app = express();
// add ws to express
const expressWs = require('express-ws')(app);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
  // app.use(express.cookieDecoder());
  // app.use(express.session());
app.use(session({
  store: new SQLiteStore({
    db: 'sessions.sqlite3',
  }),
  secret: 'asdf',
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 1 week
  resave: true,
  saveUninitialized: true,
}));

app.use((req, res, next) => {
  if ((req.url !== '/login' && req.url !== '/register') && !req.session.user)
    res.status(401).json({message: 'Unauthentificated'});
  else
    next();
});

app.post('/register', (req, res) => {
  // TODO: validation

  db.run(`INSERT INTO users(login, password) VALUES(?, ?)`, [req.body.login, req.body.password], (err) => {
    if (err) {
      res.json({ status: err.message });
    }
    else {
      req.session.user = {id: this.lastID, login: req.body.login};
      res.json({login: req.body.login, id: this.lastID});
    }
  });
});

app.post('/login', (req, res) => {
  db.get('SELECT id, password from users where login = ?', [req.body.login], (err, row) => {
    if (err)
      res.json({ status: err.message });
    else if (!row)
      res.json({ status: 'user not found' });
    else if (row.password !== req.body.password)
      res.json({ status: 'wrong password' });
    else {
      req.session.user = {id: row.id, login: req.body.login};
      res.json({login: req.body.login, id: row.id});
    }
  });
});

app.post('/logout', (req, res) => {
  req.session.user = undefined;
  res.status(200).json({message: 'logged out'});
});

app.post('/get_user', (req, res) => {
  res.json({login: req.session.user.login, id: req.session.user.id});
});

const ws_connections = [];

app.ws('/', function(ws, req) {
  ws_connections.push(ws);

  ws.on('message', (msg) => {
    console.log(msg);
    let message = JSON.parse(msg);
    switch (message.message) {
      case 'game start':
        ws.user_id = message.id;
        db.get('SELECT id FROM users WHERE searching = 1', [], (err, row) => {
          if (err || !row) {
            db.run(`UPDATE users SET searching = 1 WHERE id = ?`, [message.id]);
            return;
          }
          else {
            db.run(`UPDATE users SET searching = 0 WHERE id = ?`, [row.id]);

            db.run(`INSERT INTO matches(id_first, id_second) VALUES(?, ?)`, [message.id, row.id], (err) => {
              if (err) {}
              else {
                let game_id = this.lastID;
                let city_list = ['asdf', 'fdsa'];

                ws_connections.forEach((item) => {
                  if (item.user_id === row.id) {
                    item.game_id = game_id;
                    ws.game_id = game_id;
                    if (!!Math.round(Math.random()))
                      item.send(JSON.stringify({message: 'city_list', data: city_list}));
                    else
                      ws.send(JSON.stringify({message: 'city_list', data: city_list}));
                  }
                });
              }
            });
          }
        });
        break;
      case 'city selected':        
        db.run(`UPDATE matches SET city = ? WHERE id = ?`, [message.city_id, ws.game_id]);

        let city_list = ['asdf', 'fdsa'];
        let category_list = ['qwer', 'rewq'];

        ws.send(JSON.stringify({message: 'city selected', data: city_list[message.city_id]}));

        ws_connections.forEach((item) => {
          if (item.game_id === ws.game_id && item !== ws) {
            item.send(JSON.stringify({message: 'city selected', data: {
              city: city_list[message.city_id],
              category_list: category_list,
            }}));
          }
        });
        break;
      case 'categories selected':
        db.run(`UPDATE matches SET categories = ? WHERE id = ?`, [message.categories.join(','), ws.game_id]);

        let category_list = ['qwer', 'rewq'];
        let categories = [];
        message.categories.forEach((value) => {
          categories.push(category_list[value]);
        });

        ws_connections.forEach((item) => {
          if (item.game_id === ws.game_id) {
            item.send(JSON.stringify({message: 'categories selected', data: categories}));
          }
        });
        break;
      case 'request selected':
        db.get('SELECT request, city FROM matches WHERE id = ?', [ws.game_id], (err, row) => {

          if (row.request) {
            //let city_list = ['asdf', 'fdsa'];
            let ans = 0;//magic(message.request, row.request, city_list[row.city])
            ws.send(JSON.stringify({message: 'request selected', data: {
              winner: ans,
              request_my: message.request,
              request_enemy: row.request,
            }}));
            ws_connections.forEach((item) => {
              if (item.game_id === ws.game_id && item !== ws) {
                item.send(JSON.stringify({message: 'request selected', data: {
                  winner: -1 * ans,
                  request_my: row.request,
                  request_enemy: message.request,
                }}));
              }
            });
          }
          else {
            db.run(`UPDATE matches SET request = ? WHERE id = ?`, [message.request, ws.game_id]);
          }

        });
        break;
      default:
        break;
    }
    console.log(msg);
  });

  console.log('socket asdf');

  var object = {
    message: 'welcome to the socket api',
    time: Date.now().toString()
  };
  ws.send(JSON.stringify(object));
});

app.use((req, res) => {
  res.sendFile('/public/index.html', { root: __dirname });
});

app.listen(port, () => {
      console.log(`server is listening on ${port}`);
});

//45.67.57.145