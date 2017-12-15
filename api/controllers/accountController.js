'use strict';

const mongoose = require('mongoose');
const uuid = require('uuid/v5');

const Account = mongoose.model('Account');

const ManagementClient = require('auth0').ManagementClient;
const auth0 = new ManagementClient({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    scope: "read:users create:users update:users delete:users"
});

const API_UUID = uuid('http://api.tracklin.es', uuid.DNS);
const DASHBOARD_UUID = uuid('http://dashboard.tracklin.es', uuid.DNS);

const classControl = {
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

            let newAccount = new Account();
            newAccount.authId = client.user_id;
            newAccount.apiKey = uuid(client.user_id, API_UUID);
            newAccount.dashboardKey = uuid(client.user_id, DASHBOARD_UUID);
            newAccount.save();

            client.permissionLevel = newAccount.status[0];

            res.json(client);
        })
    },

    get_account: function(req, res) {
        auth0.users.get({id: req.params.accountId}, function(err, client) {
            if (err) {
                res.send(err);
            }

            Account.findOne({
               authId: req.params.accountId
            }, function(errs, data) {
                if (errs) {
                    res.send(errs);
                }

                if (data) {
                    client.permissionLevel = data.status[0];
                }

                res.json(client);
            });
        });
    },

    update_account: function(req, res) {
        auth0.users.update({id: req.params.accountId}, req.body.auth, function(err, client) {
            if (err) {
                res.send(err);
            }

            Account.findOneAndUpdate({authId: req.params.accountId}, req.body.track, {new: true}, function(errs, data) {
                if (errs) {
                    res.send(errs);
                }

                // make sure there is data back from db
                if (data) {
                    client.permissionLevel = data.status[0];
                }

                res.json(client);
            });
        });
    },

    delete_account: function(req, res) {
        Account.findOneAndUpdate({authId: req.params.accountId}, {status: 'deleted'}, function(err, data) {
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
