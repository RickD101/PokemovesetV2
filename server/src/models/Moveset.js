const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
    },
    moves: {
        move1: {
            name: {
                type: String,
                required: true
            },
            learnMethod: {
                type: String,
                required: true
            },
            learnAt: {
                type: Number,
                required: true
            }
        },
        move2: {
            name: {
                type: String
            },
            learnMethod: {
                type: String
            },
            learnAt: {
                type: Number
            }
        },
        move3: {
            name: {
                type: String
            },
            learnMethod: {
                type: String
            },
            learnAt: {
                type: Number
            }
        },
        move4: {
            name: {
                type: String
            },
            learnMethod: {
                type: String
            },
            learnAt: {
                type: Number
            }
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