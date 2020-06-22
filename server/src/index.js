// inclusions
const express = require('express');
const session = require('express-session');
require('./mongo');

// variables
const port = 3000;

// set app
const app = express();

// route inclusions


// session middleware
app.use(express.json());
app.use(session({
    secret: "justshootme", //a random string
    resave: false,
    saveUninitialized: false 
}));

// routes


// initialise backend server
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));