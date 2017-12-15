'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    authId: {
        type: String,
        required: 'Auth0 AccountId'
    },
    apiKey: {
        type: String
    },
    dashboardKey: {
        type: String
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
