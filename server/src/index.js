// inclusions
const express = require('express');
const session = require('express-session');
require('./mongo'); // server setup JS inclusion

// variables
const port = 3000;

// set app
const app = express();

// route inclusions
const userRouter = require('./routes/userRoutes');
const pokemonRouter = require('./routes/pokemonRoutes');
const movesetRouter = require('./routes/movesetRoutes');

// middleware
app.use(express.json());        // middleware for JSON parsing     
app.use(session({               // session middleware
    secret: "justshootme",
    resave: false,
    saveUninitialized: false 
}));

// routes
app.use('/user', userRouter);
app.use('/pokemon', pokemonRouter);
app.use('/movesets', movesetRouter);

// initialise backend server
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));