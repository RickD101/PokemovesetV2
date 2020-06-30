const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');
const Moveset = require('../models/Moveset');

// login status route
router.get('/', (req,res)=>{
    if (req.session.user){
        res.send({
            status: true,
            username: req.session.user.username
        });
    }
    else{
        res.send({
            status: false
        });
    }
});

// login check middleware
router.use((req,res,next)=>{
    if (req.session.user){
        if (req.path == '/logout' || req.path == '/delete'){
            next();
        }
        else{
            res.send({
                msg: req.session.user.username + ' is already logged in.'
            });
        }
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

        if (!findUsername && req.body.password.length < 8){
            res.send({
                status: false,
                msg: 'Password must contain at least 8 characters.'
            });
        }
        else if (!findUsername){
            // encrypt password using bcryptjs
            req.body.password = await bcrypt.hash(req.body.password, 10);

            // create user with encrypted password
            const newUser = await User.create(req.body);
            res.send({
                status: true,
                msg: newUser.username + ' saved to database.'
            });
        }
        else{
            res.send({
                status: false,
                msg: findUsername.username + ' already exists. Please select a different username.'
            });
        }
    }
    catch(err){
        res.status(400).send({
            msg: 'bad request.',
            err: err
        });
    }
});

// user login route
router.post('/login', async (req,res)=>{
    try{
        const savedUser = await User.findOne({username: req.body.username});
        // check if user exists in database
        if (!savedUser){
            res.status(404).send({
                status: false,
                msg: req.body.username + ' not found.'
            });
        }
        // compare request password with hashed DB password
        else if (await bcrypt.compare(req.body.password, savedUser.password)){
            req.session.user = {
                username: savedUser.username,
                id: savedUser._id
            };
            res.send({
                status: true,
                msg: savedUser.username + ' logged in.'
            });
        }
        else{
            res.status(404).send({
                status: false,
                msg: 'Incorrect password.'
            });
        }
    }
    catch(err){
        res.status(400).send({
            status: false,
            msg: 'Bad request.',
            err: err
        });
    }
});

// user logout route
router.get('/logout', (req,res)=>{
    if (req.session.user){
        const currentUser = req.session.user.username;
        req.session.destroy(()=>{
            res.send({
                msg: currentUser + ' logged out.'
            });
        });
    }
    else{
        res.send({
            msg: 'Already logged out.'
        });
    }
});

// delete user and associated data route
router.delete('/delete', async (req,res)=>{
    if (req.session.user){
        try{
            await Moveset.deleteMany({
                owner: req.session.user.id
            });
            await User.findByIdAndDelete(
                req.session.user.id
            );
            const username = req.session.user.username;
            req.session.destroy(()=>{
                res.send({
                    msg: username + ' and all associated movesets deleted.'
                });
            });
        }
        catch(err){
            res.status(400).send({
                msg: 'Bad request.',
                err: err
            });
        }
    }
    else{
        res.send({
            msg: 'Please login.'
        });
    }
});

module.exports = router;