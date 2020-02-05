// Imports
const express = require('express');
const mysql = require('mysql');
var SqlString = require('sqlstring');
require('dotenv').config() //Load the variables from our local environment

//
const app = express();
const port = 5000;
const dbCredentials = {
  host     : process.env.DATABASE_HOST,
  user     : process.env.DATABASE_USER,
  password : process.env.DATABASE_PASSWORD,
  database : process.env.DATABASE_DATABASE
};

//






// ROUTES

app.get('/', (req, res) => {
  res.send("API for GERM system")
})

app.get('/api/division/all', (req, res) => {
  var sql = SqlString.format('SELECT * FROM division')
  const db = mysql.createConnection(dbCredentials);
  var conn = db;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    res.send(result);
    conn.end();
  });
})

app.get('/api/crime/all', (req,res) => {
  var sql = SqlString.format('SELECT * FROM crime')
  const db = mysql.createConnection(dbCredentials);
  var conn = db;

  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    res.send(result);
    conn.end();
  });
});

app.get('/api/crime/:id', (req,res) => {
  var sql = SqlString.format('SELECT * FROM crime WHERE id=?', req.params.id)
  const db = mysql.createConnection(dbCredentials);
  var conn = db;

  let query = db.query(sql, (err, result) => {
    if(err) throw err;

    if(Array.isArray(result) && result.length    ){
      res.send(result);
    }else{
      res.send("No results");
    }
    conn.end();
  });
});

app.get('/api/unit/all', (req,res) => {
  var sql = SqlString.format('SELECT * FROM unit');
  const db = mysql.createConnection(dbCredentials);
  var conn = db;

  let query = db.query(sql, (err, result) => {
    if(err) throw err;

    if(Array.isArray(result) && result.length){
      res.send(result);
    }else{
      res.send("No results");
    }
    conn.end();
  });
});

app.get('/api/unit/:id', (req,res) => {
  var sql = SqlString.format('SELECT * FROM unit WHERE id=?', req.params.id)
  const db = mysql.createConnection(dbCredentials);
  var conn = db;

  let query = db.query(sql, (err, result) => {
    if(err) throw err;

    if(Array.isArray(result) && result.length    ){
      res.send(result);
    }else{
      res.send("No results");
    }
    conn.end();
  });
});

// LISTEN
app.listen(port, () => console.log(`Server started on port ${port}.`))
