//npm modules
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite3');
const port = process.env.PORT || 8080;

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS counts (key TEXT, value INTEGER)");
    db.run("INSERT INTO counts (key, value) VALUES (?, ?)", "counter", 0);
});

// create the server
const app = express();
// add ws to express
const expressWs = require('express-ws')(app);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.post('/register', (req, res) => {

  res.sendFile('index.html');
});

app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg);
    console.log('asdf');
  });
  console.log('socket asdf');
});

app.listen(port, () => {
      console.log(`server is listening on ${port}`);
});