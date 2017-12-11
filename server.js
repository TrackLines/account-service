let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

let Account = require('./api/models/accountModel');
let routes = require('./api/routes/accountRoutes');

let port = process.env.PORT || 3000;
let app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo/Account', {
    useMongoClient: true
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

routes(app);
app.listen(port);

console.log("Listening on port: " + port);
