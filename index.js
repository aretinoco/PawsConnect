const express = require('express');
const mysql = require('mysql'); 
const app = express();
const pool = dbConnection();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.get("/", (req, res) => {
    res.redirect('login');
  });
  
  app.get('/login', (req, res) => {
    res.render('login');
  });

  app.get('/createAccount', (req, res) => {
    res.render('createAccount');
  });
  app.get('/accountDetails', (req, res) => {
    res.render('accountDetails', { accountDetails: null }); 
});

app.post('/accountDetails',async(req, res) => {
  try {
    const username = req.body.username; // Get the username entered by the user
    const accountDetails = await getAccountDetails(username);

    if (!accountDetails) {
        // If no account details found for the entered username
        res.render('accountDetails', { accountDetails: null, error: 'Account not found' });
    } else {
        // If account details found
        res.render('accountDetails', { accountDetails, error: null });
    }
} catch (error) {
    console.error('Error fetching account details:', error);
    res.status(500).send('Internal Server Error');
}
});

async function getAccountDetails(username) {
  const sql = `SELECT * FROM users WHERE username = ?`;
  const params = [username];
  const rows = await executeSQL(sql, params);
  return rows[0]; 
}

app.post("/updateAccount", async (req, res) => {
  let username = req.body.username;
  let displayname = req.body.displayname;
  let location = req.body.location;
  let language = req.body.language;
  let picture = req.body.picture;
  let sql = `UPDATE users
             SET displayname = ?, location = ?, language = ?, picture = ?
             WHERE username = ?`
   let params = [displayname, location, language, picture, username];
   let rows = await executeSQL(sql, params);
   res.redirect('/accountDetails');
});

  app.post("/createAccount", async (req, res) => {
    const { username, password, displayname, email, picture, location, language } = req.body;
  
        console.log(username, password);

        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(salt + password, salt);
        console.log(salt, hash);
      
        let sql = `INSERT INTO users (username, displayname, email, password, salt, picture, location, language) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [username, displayname, email, hash, salt, picture, location, language];
        executeSQL(sql, values);
    
      
  
      console.log("signing up");
      res.redirect("/accountDetails");
    
  });

  async function executeSQL(sql, params) {
    return new Promise(function (resolve, reject) {
      pool.query(sql, params, function (err, rows, fields) {
        if (err) throw err;
        resolve(rows);
      });
    });
  } //executeSQL
  function dbConnection() {
    const pool = mysql.createPool({
      connectionLimit: 10,
      host: "localhost",
      user: "root",
      password: "password123",
      database: "pawsconnect",
      insecureAuth: true
    });
  
    return pool;
  } //dbConnection

  app.listen(3000, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log("App listening on port 3000");
    }
});
