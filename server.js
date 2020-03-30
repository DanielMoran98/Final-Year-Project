// Imports
require('dotenv').config() //Load the variables from our local environment
const express = require('express');
const mysql = require('mysql');
var SqlString = require('sqlstring');
var sanitizer = require('sanitizer');
const jwt = require('jsonwebtoken')

// Config
const app = express();
const port = 5000;
const dbCredentials = {
  host     : process.env.DATABASE_HOST,
  user     : process.env.DATABASE_USER,
  password : process.env.DATABASE_PASSWORD,
  database : process.env.DATABASE_DATABASE
};

const bodyParser = require('body-parser')

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())





// Functions

function verifyToken(req, res, next){
  const bearerHeader = req.headers['authorization'];
  console.log(bearerHeader)

  if(typeof bearerHeader != 'undefined'){
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next()

  }else{
    res.sendStatus(403)
  }
}


// ROUTES

app.get('/', (req, res) => {
  res.send("API for GERM system")
})



app.post('/login', (req, res) => {
   // Create connection
  const db = mysql.createConnection(dbCredentials);
  var conn = db;
  console.log(req.body);

  var email=sanitizer.sanitize(req.body.email);
  var password=sanitizer.sanitize(req.body.password);

  let sql = `SELECT * FROM staff WHERE email = '${email}'`;

  let query = db.query(sql, (err, results, fields) => {
    console.log("Querying DB")

    if(err) throw err;
    if(results.length > 0){
      // Email match found

      if(results[0].password == password){
        // Password correct
        var user = {
          id: results[0].id,
          name: results[0].name,
          staffType: results[0].staffType,
          rank: results[0].rank,
          badgeNumber: results[0].badgeNumber,
          rank: results[0].rank,
          email: results[0].email
        }

        jwt.sign(user, 'mysecretkey',{expiresIn: '40s'}, (err, token) => {
          console.log("Login success!")
          res.json({
            token: token,
            user: user
          })
        });
        
      }else{
        // Password incorrect
        res.send("Login failed")
      }
    }else{
      res.send("Login failed")
    }
    conn.end()

  });

});


app.get('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'mysecretkey', (err, authData) =>{
    if(err){
      res.sendStatus(403)
      }else{
      res.json({
        message: "Post Created",
        authData
      })
    }
  });
})
// API

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

app.post('/api/crime/all', verifyToken,(req,res) => {
  // console.log(req.headers.authorization)
  
  jwt.verify(req.token, 'mysecretkey', (err, authData) =>{
    if(err){
      res.sendStatus(403)
      }else{
        var sql = SqlString.format('SELECT * FROM crime')
        const db = mysql.createConnection(dbCredentials);
        var conn = db;

        let query = db.query(sql, (err, result) => {
          if(err) throw err;
          res.send(result);
          conn.end();
        });
    }
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

app.get('/api/crime/:id/resolve', (req,res) => {
  var sql = SqlString.format('SELECT * FROM crime WHERE id=?', req.params.id)
  const db = mysql.createConnection(dbCredentials);
  var conn = db;

  let query = db.query(sql, (err, result) => {
    if(err) throw err;

    if(Array.isArray(result) && result.length){
      //If crime exists: Mark it as resolved
      sql = SqlString.format(`UPDATE crime SET status = 'inactive' WHERE id=?`, req.params.id)
      console.log(sql)

      let query = db.query(sql, (err, result) => {
      if(err) throw err;

        res.json("Crime #"+req.params.id+" marked as resolved.");
      });

    }else{
      res.json("Crime #"+req.params.id+" doesn't exist.");
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
