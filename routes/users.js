const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../config')

router.get("/", (req, res) => {
  connection.query('SELECT * FROM users', ( err, results) => {
    if(err) {
      res.status(500).send('Error retrieve users')
    } else {
      res.json(results)
    }
  })
});

// Route to protect
router.post("/profile", verifyToken, (req, res) => {
  // when you want to access send header value for
  // Autorization Bearer {token}
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).send(err);
    } else {
      res.json({
        message: "Access ok",
        authData
      });
    }

  });
  res.status(403).send("Errot connection")
});

// Create Users
router.post('/', (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);

  const formData = {
    email : req.body.email,
    password: hash
  }
  connection.query('INSERT INTO users SET ?', [ formData ], (err, results) => {
    if(err) {
      res.status(500).send('Error create users')
    } else {
      res.sendStatus(200)
    }
  })
})

// Route to create token
router.post("/login", (req, res) => {
  const formData = {
    email : req.body.email,
    password: req.body.password
  }
  connection.query('SELECT * FROM users WHERE email = ?', [formData.email], (err,user) => {
    if(err) {
      res.status(500).send("Error connection")
    } else {
      const isSame = bcrypt.compareSync(formData.password, user[0].password);
      if(!isSame) {
        res.status(500).send('Error Password')
      } else {
        jwt.sign({ user }, "secretkey", (err, token) => {
          // save the token in localstorage
          res.json({
            token
          });
        });
       
      }

    }
  })

});

// Fomat token
// Authorization: Bearer <access_token>

// Verify token
function verifyToken(req, res, next) {
  console.log("ok")
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  //Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // split
    const bearer = bearerHeader.split(" ");
    // get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // forbidden
    res.sendStatus(500);
  }
}

module.exports = router;
