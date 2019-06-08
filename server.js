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
    'CREATE TABLE IF NOT EXISTS "users" ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `login` TEXT NOT NULL UNIQUE, `password` TEXT, `points` INTEGER DEFAULT 0 )'
  );

  db.run(
    'CREATE TABLE IF NOT EXISTS `cards` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `title` TEXT )'
  );

  db.run(
    'CREATE TABLE IF NOT EXISTS "user_cards" ( `id_user` INTEGER, `id_card` INTEGER, FOREIGN KEY(`id_card`) REFERENCES `cards`(`id`), FOREIGN KEY(`id_user`) REFERENCES `user`(`id`) )'
  );
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
      req.session.user = {id: row.id, login: row.id};
      res.json({login: req.body.login, id: row.id});
    }
  });
});

app.post('/get_user', (req, res) => {
  res.json({login: req.session.user.login, id: req.session.user.id});
});

app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg);
    console.log('asdf');
  });
  console.log('socket asdf');
});

app.use((req, res) => {
  res.sendFile('/public/index.html', { root: __dirname });
});

app.listen(port, () => {
      console.log(`server is listening on ${port}`);
});

//45.67.57.145