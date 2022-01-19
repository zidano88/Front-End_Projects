// Setup empty JS object to act as endpoint for all routes
const Datastore = require('nedb');
projectData = {};
const port = 8800;

// Require Express to run server and routes
const http = require('http');
const express = require('express');
/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');
const { response } = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const database = new Datastore('database.db');
database.loadDatabase();
// database.insert({ name: 'Sheefmahn' });
// database.insert({ name: 'Mack' });

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const server = app.listen(port, listening);
function listening() {
    console.log(`Server running on localhost: ${port}`);
};

//GET method
app.get("/getDataBase", (req, res) => {
    // res.send(database);
    database.find({}, (err, data) => {
        if (err) {
            console.log('error here');
            response.end();
            return;
        }
        res.json(data);
    })
});

//POST method
app.post("/addNewPlayer", (req, res) => {
    console.log(req.body);
    console.log('Post received');
    database.insert(req.body);
    database.find({}).sort({ position: 1 }).skip(1).limit(2).exec(function (err, docs) {
        // docs is [doc3, doc1]
    });
    database.update({ _id: 'id6' }, { $addToSet: req.body }, {}, function () {
        // The fruits array didn't change
        // If we had used a fruit not in the array, e.g. 'banana', it would have been added to the array
    });

});