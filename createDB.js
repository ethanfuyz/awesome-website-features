const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('mySurveyDB.db');

db.serialize(function () {
    db.run(`
    CREATE TABLE IF NOT EXISTS users (
      username TEXT PRIMARY KEY,
      password TEXT NOT NULL
    )
  `);
});

db.close();