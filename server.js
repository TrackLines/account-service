const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Account = require('./api/models/accountModel');
const routes = require('./api/routes/accountRoutes');

const port = process.env.PORT || 3000;
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_PATH, {
    useMongoClient: true
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

routes(app);
app.listen(port);

console.log("Listening on port: " + port);
