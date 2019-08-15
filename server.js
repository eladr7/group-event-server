const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const API_PORT = process.env.PORT || 3001;

// -------------------------------------------
// 'app' setup
// -------------------------------------------

const app = express();
app.use(cors());

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
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



// Test
app.get('/', (req, res) => res.send('ok'));



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
