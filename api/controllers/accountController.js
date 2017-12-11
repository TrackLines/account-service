'use strict';

let mongoose = require('mongoose');
let Account = mongoose.model('Account');

let ManagementClient = require('auth0').ManagementClient;
let auth0 = new ManagementClient({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    scope: "read:users create:users update:users delete:users"
});

let classControl = {
    list_all_accounts: function(req, res) {
        auth0.users.getAll(function(err, clients) {
            if (err) {
                res.send(err);
            }

            res.json(clients);
        });
    },

    create_account: function(req, res) {
        auth0.users.create(req.body, function(err, client) {
            if (err) {
                res.send(err);
            }

            res.json(client);
        })
    },

    get_account: function(req, res) {
        auth0.users.get(req.params.accountId, function(err, client) {
            if (err) {
                res.send(err);
            }

            res.json(client);
        })
    },

    update_account: function(req, res) {
        auth0.users.update(req.params.accountId, req.body, function(err, client) {
            if (err) {
                res.send(err);
            }

            res.json(client);
        });
    },

    delete_account: function(req, res) {
        auth0.users.delete(req.params.accountId, function(err, client) {
            if (err) {
                res.send(err);
            }

            res.json({
                message: 'Account Deleted'
            });
        });
    }
};

module.exports = classControl;
