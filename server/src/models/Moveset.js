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
            type: {
                type: String,
            },
            category: {
                type: String,
            },
            power: {
                type: String,
            },
            accuracy: {
                type: String,
            },
            pp: {
                type: String,
            },
            description: {
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
                type: String,
            },
            type: {
                type: String,
            },
            category: {
                type: String,
            },
            power: {
                type: String,
            },
            accuracy: {
                type: String,
            },
            pp: {
                type: String,
            },
            description: {
                type: String,
            },
            learnMethod: {
                type: String,
            },
            learnAt: {
                type: Number,
            }
        },
        move2: {
            name: {
                type: String,
            },
            type: {
                type: String,
            },
            category: {
                type: String,
            },
            power: {
                type: String,
            },
            accuracy: {
                type: String,
            },
            pp: {
                type: String,
            },
            description: {
                type: String,
            },
            learnMethod: {
                type: String,
            },
            learnAt: {
                type: Number,
            }
        },
        move3: {
            name: {
                type: String,
            },
            type: {
                type: String,
            },
            category: {
                type: String,
            },
            power: {
                type: String,
            },
            accuracy: {
                type: String,
            },
            pp: {
                type: String,
            },
            description: {
                type: String,
            },
            learnMethod: {
                type: String,
            },
            learnAt: {
                type: Number,
            }
        }
    },
    pokemon: {
        type: Object,
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