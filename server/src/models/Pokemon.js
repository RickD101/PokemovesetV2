const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    spriteURL: {
        type: String,
        required: true
    },
    info: {
        dexNumber: {
            type: Number,
            required: true
        },
        type: [{
            type: String,
            required: true
        }],
        stats: {
            HP: {
                type: Number,
                required: true
            },
            ATK: {
                type: Number,
                required: true
            },
            DEF: {
                type: Number,
                required: true
            },
            SAK: {
                type: Number,
                required: true
            },
            SDF: {
                type: Number,
                required: true
            },
            SPD: {
                type: Number,
                required: true
            }
        }
    },
    moves: {
        levelUp: [{
            name: String,
            type: String,
            category: String,
            power: String,
            accuracy: String,
            pp: String,
            description: String,
            learnAt: String           
        }],
        machine: [{
            name: String,
            type: String,
            category: String,
            power: String,
            accuracy: String,
            pp: String,
            description: String            
        }],
        tutor: [{
            name: String,
            type: String,
            category: String,
            power: String,
            accuracy: String,
            pp: String,
            description: String            
        }],
        egg: [{
            name: String,
            type: String,
            category: String,
            power: String,
            accuracy: String,
            pp: String,
            description: String            
        }]
    }
});

module.exports = mongoose.model('Pokemon', schema);