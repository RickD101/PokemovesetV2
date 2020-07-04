const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
    },
    moves: {
        move0: {
            name: {
                type: String,
            },
            learnMethod: {
                type: String,
            },
            learnAt: {
                type: Number,
            }
        },
        move1: {
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