const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    move1: {
        ref: {
            type: String,
            required: true
        },
        learnMethod: {
            type: String,
            required: true
        } 
    },
    move2: {
        ref: {
            type: String
        },
        learnMethod: {
            type: String
        } 
    },
    move3: {
        ref: {
            type: String
        },
        learnMethod: {
            type: String
        } 
    },
    move4: {
        ref: {
            type: String
        },
        learnMethod: {
            type: String
        } 
    },
    pokemon: {
        type: String,
        required: true
    },
    generation: {
        type: Number,
        required: true
    },
    owner: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Moveset',schema);