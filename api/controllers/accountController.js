'use strict';

let mongoose = require('mongoose');
let Account = mongoose.model('Account');

exports.list_all_accounts = function(req, res) {
    Account.find({}, function(err, account) {
        if (err) {
            res.send(err);
        }

        res.json(account);
    });
};

exports.create_account = function(req, res) {
    let new_account = new Account(req.body);
    new_account.save(function(err, account) {
        if (err) {
            res.send(err);
        }

        res.json(account);
    });
};

exports.get_account = function(req, res) {
    Account.findById(req.params.accountId, function(err, account) {
        if (err) {
            res.send(err);
        }

        res.json(account);
    });
};

exports.update_account = function(req, res) {
    Account.findOneAndUpdate({_id: req.params.accountId}, req.body, {new: true}, function(err, account) {
        if (err) {
            res.send(err);
        }

        res.json(account);
    });
};

exports.delete_account = function(req, res) {
    Account.findOneAndUpdate({_id: req.params.accountId}, {status: 'deleted'}, function(err, account) {
        if (err) {
            res.send(err);
        }

        res.json({message: 'Account Deleted'});
    });
};
