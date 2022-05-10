//Import .env package
require('dotenv').config();
//Initialize express
let express = require('express');
let app = express();
//import bodyparser
let bodyParser = require('body-parser');
//Import mongoose
let mongoose = require('mongoose');
//Import CORS
let cors = require('cors');
//Import Main Routes File
let Routes = require('./app/mainRoute');

//Create mongoose connection
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

//make app use json
app.use(express.json());

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));

//import whitelist origins
const whitelist = process.env.WHITE_LISTED_DOMAINS;

//check cors requests
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(null, true);
        }
    }
};

app.use('/api', cors(corsOptions), Routes);

//Import Port Number
const PORT = process.env.APP_PORT;

app.listen(PORT, () => console.log('server is running on port:' + PORT));