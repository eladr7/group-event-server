const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const API_PORT = process.env.PORT || 3001;

// -------------------------------------------
// 'app' setup
// -------------------------------------------

// Instantiating the express app
const app = express();
app.use(cors());

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
// (Setting up bodyParser to use json and set it to req.body)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// -------------------------------------------



// -------------------------------------------
// Data-Base setup!
// -------------------------------------------

// this is our MongoDB database
const dbRoute =
'mongodb+srv://eladr7:I2fhzbZqV4tbATW5@cluster0-haeud.mongodb.net/test?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// -------------------------------------------


// -------------------------------------------
// Auth-JWT setup
// -------------------------------------------

const exjwt = require('express-jwt');

// See the react auth blog in which cors is required for access
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});

// INstantiating the express-jwt middleware
const jwtMW = exjwt({
    secret: 'keyboard cat 4 ever'
});

app.get('/', jwtMW /* Using the express jwt MW here */, (req, res) => {
    res.send('You are authenticated'); //Sending some response when authenticated
});

// Error handling 
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
        res.status(401).send(err);
    }
    else {
        next(err);
    }
});

//Require the Router we defined in ./todo-store-server/todo-store-server.js
var registrationRouter = require('./registration/registration-server.js');

// append /api for our http requests
app.use('/registration', registrationRouter);

// -------------------------------------------



// // Test
// app.get('/', (req, res) => res.send('ok'));



// -------------------------------------------
// Full-Stack tutorial routing
// -------------------------------------------

//Require the Router we defined in ./todo-store-server/todo-store-server.js
var fsTutorialRouter = require('./fullStackTutorial/tutorial-server.js');

// append /api for our http requests
app.use('/api', fsTutorialRouter);

// -------------------------------------------

// -------------------------------------------
// My Movies group-event routing
// -------------------------------------------

//Require the Router we defined in ./todo-store-server/todo-store-server.js
var moviesRouter = require('./moviesGenresSchemas/movies-server.js');

//Use the Router on the sub route /movies
app.use('/movies', moviesRouter);

// -------------------------------------------

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
