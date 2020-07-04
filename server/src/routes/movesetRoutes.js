const express = require('express');
const Moveset = require('../models/Moveset');
const router  = express.Router();

// auth check
router.use((req,res,next)=>{
    if(req.session.user){
        next();
    }
    else{
        res.status(401).send({
            msg: 'Please login to access.'
        });
    }
});

// new moveset route
router.post('/new', async (req,res)=>{
    req.body.owner = req.session.user.id;

    try{
        const moveset = await Moveset.create(req.body);
        if (moveset.name){
            res.send({
                status: true,
                msg: `${moveset.name} saved.`
            });
        }
        else{
            res.send({
                status: true,
                msg: 'Moveset saved.'
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

// get movesets route
router.get('/', async (req,res)=>{
    try{
        const movesets = await Moveset.find({
            owner: req.session.user.id
        });
        if (!movesets[0]){
            res.send({
                msg: 'No movesets found.'
            });
        }
        else{
            res.send(movesets);
        }
    }
    catch(err){
        res.status(400).send({
            msg: 'Bad request.',
            err: err
        });
    }
});

// update moveset route
router.patch('/update', async (req,res)=>{
    try{
        const moveset = await Moveset.findOneAndUpdate(
            {
                _id: req.body.id,
                owner: req.session.user.id
            },
            req.body.moveset,
            {new: true}
        );
        if (moveset){
            if (moveset.name){
                res.send({
                    msg: `${moveset.name} updated.`
                });
            }
            else{
                res.send({
                    msg: 'Moveset updated.'
                });
            }
        }
        else{
            res.send({
                msg: 'Moveset not found.'
            });
        }
    }
    catch(err){
        res.status(400).send({
            msg: 'Bad request.',
            err: err
        });
    }
});

// delete moveset route
router.delete('/delete', async (req,res)=>{
    try{
        const moveset = await Moveset.findOneAndDelete({
            _id: req.body.id,
            owner: req.session.user.id
        })
        if (moveset){
            if (moveset.name){
                res.send({
                    msg: `${moveset.name} deleted.`
                });
            }
            else{
                res.send({
                    msg: 'Moveset deleted.'
                });
            }
        }
        else{
            res.send({
                msg: 'Moveset not found.'
            });
        }
    }
    catch(err){
        res.status(400).send({
            msg: 'Bad request.',
            err: err
        });        
    }
});

module.exports = router;