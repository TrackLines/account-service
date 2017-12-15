'use strict';

module.exports = function(app) {
    const account = require('../controllers/accountController');

    app.route('/account')
        .get(account.list_all_accounts)
        .post(account.create_account);

    app.route('/account/:accountId')
        .get(account.get_account)
        .put(account.update_account)
        .delete(account.delete_account);
};
