// Imports
require('dotenv').config() //Load the variables from our local environment
const express = require('express');
const mysql = require('mysql');
var SqlString = require('sqlstring');
var sanitizer = require('sanitizer');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

// Config
const app = express();
const port = 5000;
const dbCredentials = {
  host     : process.env.DATABASE_HOST,
  user     : process.env.DATABASE_USER,
  password : process.env.DATABASE_PASSWORD,
  database : process.env.DATABASE_DATABASE
};
const jwtSecret = process.env.JWT_SECRET


// Middleware

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())





// Functions

function verifyToken(req, res, next){
  const bearerHeader = req.headers['authorization'];
  // console.log(bearerHeader)

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

        // Update user status
        var sql = SqlString.format(`UPDATE staff SET status = ? WHERE id=?`, ['busy', results[0].id])


          let query = db.query(sql, (err, result) => {
            if(err) throw err;
          });

        var user = {
          id: results[0].id,
          name: results[0].name,
          staffType: results[0].staffType,
          rank: results[0].rank,
          badgeNumber: results[0].badgeNumber,
          rank: results[0].rank,
          email: results[0].email,
          phone: results[0].phone,
          division_id: results[0].division_id
        }

        jwt.sign(user, jwtSecret,{expiresIn: '60m'}, (err, token) => {
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

app.post('/logout', verifyToken, (req, res) => {
  jwt.verify(req.token, jwtSecret, (err, authData) =>{
    if(err){
      res.sendStatus(403)
      }else{
        console.log("Verified")

        var user_id=sanitizer.sanitize(req.body.user_id);

        var sql = SqlString.format(`UPDATE staff SET status = ? WHERE id=?`, ['offline', user_id])
        const db = mysql.createConnection(dbCredentials);
        var conn = db;

        let query = db.query(sql, (err, result) => {
          if(err) throw err;
          console.log("Queried")
        });
      conn.end()
      res.send("Logged out")
    }
  })
})



// API



app.get('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, jwtSecret, (err, authData) =>{
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


app.get('/api/division/all', verifyToken, (req, res) => {

  jwt.verify(req.token, jwtSecret, (err, authData) =>{
    if(err){
      res.sendStatus(403)
      }else{
        // VERIFIED
        var sql = SqlString.format('SELECT * FROM division')
        const db = mysql.createConnection(dbCredentials);
        var conn = db;
        let query = db.query(sql, (err, result) => {
          if(err) throw err;
          res.send(result);
          conn.end();
        });
  
    }
  });

})



//////////// STAFF ////////////


// Sets status state of a staff field
app.post('/api/staff/setstatus', verifyToken, (req,res) => {

  jwt.verify(req.token, jwtSecret, (err, authData) =>{
    if(err){
      res.sendStatus(403)
      }else{
        console.log(req.body.status)
        var status = sanitizer.sanitize(req.body.status)
        var id = sanitizer.sanitize(req.body.user_id)

        if (status == "busy" || status == "active" || status == "offline"){
          var sql = SqlString.format(`UPDATE staff SET status = ? WHERE id=?`, [status, id])
          const db = mysql.createConnection(dbCredentials);
          var conn = db;
          console.log(req.body.status)

          let query = db.query(sql, (err, result) => {
            if(err) throw err;
            console.log([status, id])

            res.send("Successfully updated status");
            conn.end();
          });
        }else{
          //Bad input
          res.send("Bad input");
        }
        
    }
  });
});




//////////// ASSIGNMENTS ////////////


// Creates an assignment entry
app.post('/api/assignment/create', verifyToken, (req,res) => {


  jwt.verify(req.token, jwtSecret, (err, authData) =>{
    if(err){
      res.sendStatus(403)
      }else{
        // VERIFIED
        crime_id = sanitizer.sanitize(req.body.crime_id)
        staff_id = sanitizer.sanitize(req.body.staff_id)
        console.log(crime_id, staff_id)

        var sql = SqlString.format('INSERT INTO assignment(crime_id, staff_id) VALUES(?,?)', [crime_id, staff_id])
        const db = mysql.createConnection(dbCredentials);
        var conn = db;
      
        let query = db.query(sql, (err, result) => {
          if(err) throw err;
          sql = SqlString.format(`UPDATE crime SET attendeeCount = attendeeCount + 1 WHERE id=?`, [crime_id])

          let query = db.query(sql, (err, result) => {
          if(err) throw err;

            res.send("Success")
          });
          conn.end();
        });
    }
  });
});


// Returns whether a Garda is marked as attending a crime
app.post('/api/assignment/checkattendance', verifyToken, (req,res) => {

  jwt.verify(req.token, jwtSecret, (err, authData) =>{
    if(err){
      res.sendStatus(403)
      }else{
        // VERIFIED
        crime_id = sanitizer.sanitize(req.body.crime_id)
        staff_id = sanitizer.sanitize(req.body.staff_id)
        console.log(crime_id, staff_id)

        var sql = SqlString.format('SELECT * FROM assignment WHERE crime_id = ? AND staff_id = ?', [crime_id, staff_id])
        const db = mysql.createConnection(dbCredentials);
        var conn = db;
      
        let query = db.query(sql, (err, result) => {
          if(err) throw err;
          if(Array.isArray(result) && result.length){
            res.send("Attending")
          }else{
            res.send("Not Attending")
          }
          conn.end();
        });
    }
  });
});


//////////// CRIMES ////////////


// Returns all crime entries
app.post('/api/crime/all', verifyToken,(req,res) => {
  // console.log(req.headers.authorization)

  jwt.verify(req.token, jwtSecret, (err, authData) =>{
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

// Returns a single crime entry
app.get('/api/crime/:id', verifyToken, (req,res) => {

  jwt.verify(req.token, jwtSecret, (err, authData) =>{
    if(err){
      res.sendStatus(403)
      }else{
        // VERIFIED
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
    }
  });
});

// Returns crime entries based on division
app.post('/api/crime/division', verifyToken,(req,res) => {

  jwt.verify(req.token, jwtSecret, (err, authData) =>{
    if(err){
      res.sendStatus(403)
      }else{
        var division = req.body.division_id;
        var sql = SqlString.format('SELECT * FROM crime WHERE division_id = ?', [division])
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

// Returns all crime entries created in the last 30 days
app.post('/api/crime/all/lastmonth', verifyToken,(req,res) => {

  jwt.verify(req.token, jwtSecret, (err, authData) =>{
    if(err){
      res.sendStatus(403)
      }else{
        var sql = SqlString.format('SELECT * FROM crime WHERE datetime >= now() - INTERVAL 1 month', [])
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

// Creates a crime entry
app.post('/api/crime/create', verifyToken, (req,res) => {

  jwt.verify(req.token, jwtSecret, (err, authData) =>{
    if(err){
      res.sendStatus(403)
      }else{
        // VERIFIED
        // console.log(req.params.crime_crime)
        if(req.body.urgency == "" || typeof req.body.urgency == 'undefined'){req.body.urgency=1}
      
        for (const property in req.body) {
          // console.log(`${property}: ${req.body[property]}`);
          if(req.body[property] == "" || typeof req.body[property] == 'undefined'){req.body[property]="No information provided."}
          // console.log(`${property}: ${req.body[property]}`);
        }
      
        var sql = SqlString.format('INSERT INTO crime(latitude, longitude, crimeType, crimeDescription, suspectDescription, victimContact, urgency, dangers, division_id, staff_id) VALUES(?,?,?,?,?,?,?,?,?,?)', [req.body.latitude, req.body.longitude, req.body.crimeType, req.body.crimeDescription, req.body.suspectDescription, req.body.victimContact, req.body.urgency, req.body.dangers, req.body.division_id, req.body.staff_id])
        const db = mysql.createConnection(dbCredentials);
        var conn = db;
      
        let query = db.query(sql, (err, result) => {
          if(err) throw err;
      
          res.send("Success")
          conn.end();
        });
    }
  });
});

// Updates a crime entry
app.post('/api/crime/update', verifyToken, (req,res) => {

  jwt.verify(req.token, jwtSecret, (err, authData) =>{
    if(err){
      res.sendStatus(403)
      }else{
        // VERIFIED
        id = sanitizer.sanitize(req.body.id)

        console.log(req.params.crime_crime)
        var inputData = {
          id: sanitizer.sanitize(req.body.id),
          latitude: sanitizer.sanitize(req.body.latitude),
          longitude: sanitizer.sanitize(req.body.longitude),
          crimeType: sanitizer.sanitize(req.body.crimeType),
          crimeDescription: sanitizer.sanitize(req.body.crimeDescription),
          suspectDescription: sanitizer.sanitize(req.body.suspectDescription),
          victimContact: sanitizer.sanitize(req.body.victimContact),
          urgency: sanitizer.sanitize(req.body.urgency),
          dangers: sanitizer.sanitize(req.body.dangers),
          division_id: sanitizer.sanitize(req.body.division_id),
          staff_id: sanitizer.sanitize(req.body.staff_id)
        }

        console.log(inputData)
        if(inputData.urgency == "" || typeof inputData.urgency == 'undefined'){inputData.urgency=1}
      
        for (const property in inputData) {
          console.log(`${property}: ${inputData[property]}`);
          if(inputData[property] == "" || typeof inputData[property] == 'undefined'){inputData[property]="No information provided."}
          console.log(`${property}: ${inputData[property]}`);
        }
        
        var sql = SqlString.format(`UPDATE crime SET latitude=?, longitude=?, crimeType=?, crimeDescription=?, suspectDescription=?, victimContact=?, urgency=?, dangers=?, division_id=?, staff_id=? WHERE id=?`,
          [inputData.latitude, inputData.longitude, inputData.crimeType, inputData.crimeDescription, inputData.suspectDescription, inputData.victimContact, inputData.urgency, inputData.dangers, inputData.division_id, inputData.staff_id, inputData.id]
         )
        console.log(sql)
        const db = mysql.createConnection(dbCredentials);
        var conn = db;
      
        let query = db.query(sql, (err, result) => {
          if(err) throw err;
      
          res.send("Success")
          conn.end();
        });
    }
  });
});



// Marks a crime entry as resolved
app.get('/api/crime/:id/resolve', verifyToken, (req,res) => {

  jwt.verify(req.token, jwtSecret, (err, authData) =>{
    if(err){
      res.sendStatus(403)
      }else{
        // VERIFIED
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
    }
  });
});


/////////////// REPORTS ////////////////



// Creates a report entry
app.post('/api/report/create', verifyToken, (req,res) => {

  jwt.verify(req.token, jwtSecret, (err, authData) =>{
    if(err){
      res.sendStatus(403)
      }else{
        // VERIFIED
        var content = req.body.content;
        var staff_id = req.body.staff_id;
        var crime_id = req.body.crime_id;
      
        if(crime_id == ''){
          crime_id = null
        }
        // if(typeof crime_id != undefined && crime_id != "")
        var sql = SqlString.format('INSERT INTO report(content, staff_id, crime_id) VALUES(?,?,?)', [content, staff_id, crime_id])
        const db = mysql.createConnection(dbCredentials);
        var conn = db;
      
        let query = db.query(sql, (err, result) => {
          if(err) throw err;
      
          res.send("Complete")
          conn.end();
        });  
    }
  });
});


// Returns reports created by a specific Garda
app.post('/api/report/filterByStaff', verifyToken, (req,res) => {

  jwt.verify(req.token, jwtSecret, (err, authData) =>{
    if(err){
      res.sendStatus(403)
      }else{
        // VERIFIED
        var staff_id = sanitizer.sanitize(req.body.staff_id)

        var sql = SqlString.format('SELECT * FROM report WHERE staff_id = ?', [staff_id])
        const db = mysql.createConnection(dbCredentials);
        var conn = db;
      
        let query = db.query(sql, (err, result) => {
          if(err) throw err;
      
          res.send(result)
          conn.end();
        });
    }
  });
});


/////////// Deprecated ////////////


app.get('/api/unit/all', verifyToken, (req,res) => {
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

app.get('/api/unit/:id', verifyToken, (req,res) => {
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

// Listen for incoming requests
app.listen(port, () => console.log(`Server started on port ${port}.`))
