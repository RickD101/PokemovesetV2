// inclusions
const express = require('express');
const session = require('express-session');
const consts  = require('./consts');
const cors    = require('cors');
require('./mongo'); // server setup JS inclusion

// set app
const app = express();

if (consts.environment === 'production') {
    // Use Express middleware to serve static files from the designated directory
    console.log('Express is running in production mode')
    app.use(express.static('./public'));
}

// route inclusions
const userRouter = require('./routes/userRoutes');
const pokeAPIRouter = require('./routes/pokeAPIRoutes');
const movesetRouter = require('./routes/movesetRoutes');

// CORS allows requests to come in from React
app.use(cors());

// middleware
app.use(express.json());        // middleware for JSON parsing     
app.use(session({               // session middleware
    secret: consts.key,
    resave: false,
    saveUninitialized: false 
}));

// routes
app.use('/api/user', userRouter);
app.use('/api/pokeAPI', pokeAPIRouter);
app.use('/api/movesets', movesetRouter);

if (consts.environment === 'production') {
    // setting up to serve static files via Express in production
    app.get('/*', (req, res) => {
      res.sendFile('./public/index.html', { root: './' });
    })
}

// initialise backend server
app.listen(consts.port, () => console.log(`App listening at http://localhost:${consts.port}`));