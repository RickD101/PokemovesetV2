const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');

// login status route
router.get('/', (req,res)=>{
    if (req.session.user){
        res.send(true);
    }
    else{
        res.send(false);
    }
});

// login check middleware
router.use((req,res,next)=>{
    if (req.session.user && req.path !== '/logout'){
        res.send({msg: req.session.user.username + ' is already logged in.'});
    }
    else{
        next();
    }
});

// CREATE new user route
router.post('/new', async (req,res)=>{
    try{
        // search for username availability
        const findUsername = await User.findOne({
            username: req.body.username
        });

        if (!findUsername){
            // encrypt password using bcryptjs
            req.body.password = await bcrypt.hash(req.body.password, 10);

            // create user with encrypted password
            const newUser = await User.create(req.body);
            res.send({msg: newUser.username + ' saved to database.'});
        }
        else{
            res.send({msg: findUsername.username + ' already exists.'});
        }
    }
    catch(err){
        res.send({msg: 'bad request.'});
        console.log(err);
    }
});

// user login route
router.post('/login', async (req,res)=>{
    try{
        const savedUser = await User.findOne({username: req.body.username});
            // check if user exists in database
        if (!savedUser){
            res.status(404).send({msg: req.body.username + ' not found.'});
        }

            // compare request password with hashed DB password
        if (await bcrypt.compare(req.body.password, savedUser.password)){
            req.session.user = {
                username: savedUser.username,
                id: savedUser._id
            };
            res.send({msg: savedUser.username + ' logged in.'});
        }
        else{
            res.status(404).send({msg: 'incorrect password.'});
        }
    }
    catch(err){
        res.send({msg: 'bad request.'});
        console.log(err);
    }
});

// user logout route
router.get('/logout', (req,res)=>{
    if (req.session.user){
        const currentUser = req.session.user.username;
        req.session.destroy(()=>{
            res.send({msg: currentUser + ' logged out.'});
        });
    }
    else{
        res.send({msg: 'already logged out.'});
    }
});

module.exports = router;