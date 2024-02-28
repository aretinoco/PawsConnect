const express = require('express');
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

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
    res.render('accountDetails');
  });



  app.listen(3000, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log("App listening on port 3000");
    }
});
