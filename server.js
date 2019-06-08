//npm modules
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite3');
const bodyParser = require('body-parser');
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


app.post('/register', (req, res) => {
  // TODO: validation
  console.log(req.body.login);
  db.run(`INSERT INTO users(login, password) VALUES(?, ?)`, [req.body.login, req.body.password], function(err) {
    if (err) {
      res.json({ status: 'error' });
    }
    res.json({ status: 'ok' });
  });
  // db.get(sql, [playlistId], (err, row) => {
  //   if (err) {
  //     return console.error(err.message);
  //   }
  //   return row
  //     ? console.log(row.id, row.name)
  //     : console.log(`No playlist found with the id ${playlistId}`);
   
  // });

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