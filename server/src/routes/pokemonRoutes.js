const express = require('express');
const router = express.Router();
const API = require('../api/pokemon');

router.get('/', async (req,res)=>{
    if (req.body.name && req.body.gen){
        // tidy up searched pokemon name to suit API call
        req.body.name = req.body.name.replace(" ","-").toLowerCase();

        // set the selected generation name to suit API call
        if (req.body.gen === 'Generation 1'){ 
            req.body.gen = 'red-blue';
        }
        else if (req.body.gen === 'Generation 2'){
            req.body.gen = 'gold-silver';
        }
        else if (req.body.gen === 'Generation 3'){
            req.body.gen = 'ruby-sapphire';
        }
        else if (req.body.gen === 'Generation 4'){
            req.body.gen = 'diamond-pearl';
        }
        else if (req.body.gen === 'Generation 5'){
            req.body.gen = 'black-white';
        }
        else if (req.body.gen === 'Generation 6'){
            req.body.gen = 'x-y';
        }
        else if (req.body.gen === 'Generation 7'){
            req.body.gen = 'sun-moon';
        }

        const currentPokemon = await API.searchPokemon(req.body.name, req.body.gen);
        res.send(currentPokemon);
    }
});

module.exports = router;