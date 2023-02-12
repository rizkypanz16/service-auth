const crypto = require('crypto');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const mysql = require('mysql');
const port = 6001;

// CREATE DATETIME NOW()
const now = new Date();
const datetime = now.toLocaleString('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

// HASH ID BY MD5 FUNCTION
function md5(values){
  const hash = crypto.createHash('md5');
  hash.update(values);
  const result = hash.digest('hex');
  return result;
}

// body: x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// body: raw -> json
app.use(express.json({ extended: true }))


// IMPORT CONNECTION MODULE
const config = require('./connection.js');
const { urlencoded } = require('express');
var connection = config.connection;

app.get('/api/login', (req, res) => {
  res.send('API LOGIN!')
});

// GET ALL USER DATA
app.get('/api/users', (req, res) => {
    connection.query("SELECT * from tb_user", (error, results, fields) => { 
      if (error) throw error;
      res.status(200);
      res.json(
        { 
            status: "OK",
            data: results
        }
      )
    });
    // connection.end();
});

// GET USER DATA BY ID
app.get('/api/users/:id', (req, res) => {
    connection.query("SELECT * from tb_user WHERE user_id = '"+req.params.id+"'", (error, results, fields) => { 
      if (error) throw error;
      res.status(200);
      res.json(
        { 
            status: "OK",
            data: results
        }
      )
    });
});

// POST DATA USER TYPE RAW JSON
app.post('/api/users/', (req, res) => {
  // REQUEST JSON DATA
  var v_userid = md5(req.body.user_id);
  var v_fullname = req.body.fullname;
  var v_username = req.body.username;
  var v_email = req.body.email;
  var v_phone = req.body.phone;

  var query = "INSERT INTO tb_user (user_id, fullname, username, email, phone, created_at) VALUES ('"+v_userid+"', '"+v_fullname+"', '"+v_username+"', '"+v_email+"', '"+v_phone+"', NOW())";
  connection.query(query, (error, results) => { 
    if (error) throw error;
    res.status(200);
    res.json(
      { 
          status: "SUCCESS",
          data: {
            user_id: v_userid,
            fullname: v_fullname,
            username: v_username,
            email: v_email,
            phone: v_phone,
            created_at: datetime
          }
      }
    )
  }); 
});

// PUT / UPDATE DATA 
app.put('/api/users/:id', (req, res) => {
  var reqID = req.params.id;
  // REQUEST JSON DATA
  var v_userid = req.body.user_id;
  var v_fullname = req.body.fullname;
  var v_username = req.body.username;
  var v_email = req.body.email;
  var v_phone = req.body.phone;
  
  var query = "UPDATE tb_user SET fullname='"+v_fullname+"', username='"+v_username+"', email='"+v_email+"', phone='"+v_phone+"' WHERE user_id='"+reqID+"'";
  connection.query(query, (error, results) => { 
    if (error) throw error;
    res.status(200);
    res.json(
      { 
          status: "SUCCESS",
          data: {
            user_id: v_userid,
            fullname: v_fullname,
            username: v_username,
            email: v_email,
            phone: v_phone
          }
      }
    )
  }); 
});

//DELETE DATA
app.delete('/api/users/:id', (req, res) => {
  var reqID = req.params.id;

  var query = "DELETE FROM tb_user WHERE user_id='"+reqID+"'";
  connection.query(query, (error, results) => { 
    if (error) throw error;
    res.status(200);
    res.json(
      { 
          status: "SUCCESS",
          data: []
      }
    )
  });
});


app.listen(port, () => {
  console.log("== SERVICE-AUTH ==");
  console.log(`server listening at http://${process.env.AUTH_HOST}:${port}`)
});

