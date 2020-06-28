const express = require('express');
const router = express.Router();
const API = require('../api/pokemon');

router.get('/', async (req,res)=>{
    if (req.body.name && req.body.gen){
        // tidy up searched pokemon name to suit API call
        req.body.name = req.body.name.replace(" ","-").toLowerCase();

        // set the selected generation name to suit API call
        if (req.body.gen === 'Generation 1'){
            req.body.gen = 1;
            req.body.genName = 'red-blue';
        }
        else if (req.body.gen === 'Generation 2'){
            req.body.gen = 2;
            req.body.genName = 'gold-silver';
        }
        else if (req.body.gen === 'Generation 3'){
            req.body.gen = 3;
            req.body.genName = 'ruby-sapphire';
        }
        else if (req.body.gen === 'Generation 4'){
            req.body.gen = 4;
            req.body.genName = 'diamond-pearl';
        }
        else if (req.body.gen === 'Generation 5'){
            req.body.gen = 5;
            req.body.genName = 'black-white';
        }
        else if (req.body.gen === 'Generation 6'){
            req.body.gen = 6;
            req.body.genName = 'x-y';
        }
        else if (req.body.gen === 'Generation 7'){
            req.body.gen = 7;
            req.body.genName = 'sun-moon';
        }

        const currentPokemon = await API.searchPokemon(req.body.name, req.body.genName);
        if (currentPokemon.err){
            if (currentPokemon.err.message === "Request failed with status code 404"){
                res.send({
                    msg: `${req.body.name} not found.`
                });
            }
            else{
                res.send({
                    msg: `External API error.`,
                    err: currentPokemon.err
                });
            }
        }
        else if (currentPokemon.name && !currentPokemon.moves[0]){
            res.send({
                msg: `${currentPokemon.name} did not exist in generation ${req.body.gen}`
            });
        }
        else if (currentPokemon.name){
            currentPokemon.generation = req.body.gen;
            res.send(currentPokemon);
        }
    }
    if (!req.body.name){
        res.send({
            msg: 'Please input a Pokémon name or Pokédex number.'
        });
    }
});

module.exports = router;