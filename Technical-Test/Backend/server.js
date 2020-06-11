const express = require ('express');
require ('express-async-errors');
const cors = require ('cors');
const app = express ();
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');

//database connection
require ('./config/db');

//Models

require ('./models/User');
require ('./models/UserPost');

//Middleware
app.use (bodyParser.json ());
app.use (cors ());


//Routes
app.use ('/api/user', require ('./controllers/User'));



//Not Found Route
app.use ((req, res, next) => {
  req.status = 404;
  const error = new Error ('404! Routes not found');
  next (error);
});

//error handler
if (app.get ('env') === 'production') {
  app.use ((error, req, res, next) => {
    res.status (req.status || 500).send ({
      message: error.message,
    });
  });
}

app.use ((error, req, res, next) => {
  res.status (req.status || 500).send ({
    message: error.message,
    stack: error.stack,
  });
});

app.get("/getPost", async (req, res) => {
  res.send("Welcome To Himadri App")
})

var port = process.env.PORT || 4000;

app.listen (port , function () {
  console.log ('Server is running on port: '+ port);
});
