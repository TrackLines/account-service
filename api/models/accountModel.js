'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AccountSchema = new Schema({
    name: {
        type: String,
        required: 'Enter Name'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: [
                'deleted',
                'pending',
                'standard',
                'master',
                'deity'
            ]
        }],
        default: [
            'pending'
        ]
    }
});

module.exports = mongoose.model('Account', AccountSchema);
