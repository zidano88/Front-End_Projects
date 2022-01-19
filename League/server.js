// Setup empty JS object to act as endpoint for all routes
const Datastore = require('nedb');
// projectData = {};
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
const matchesdatabase = new Datastore('matchesdatabase.db');
database.loadDatabase();
matchesdatabase.loadDatabase();
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

//POST method to add new player
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

//POST method to add new match result
app.post("/addNewMatch", (req, res) => {
    console.log('New Match Record Received');
    console.log(req.body);
    matchesdatabase.insert(req.body);
    if (req.body.firstPlayerScore > req.body.secondPlayerScore) {
        console.log("first player is the winner and his score is: " + req.body.firstPlayerScore);
        let first = req.body.firstPlayerName;
        console.log("first player name is: " + first);
        database.find({ name: first }, function (err, player) {
            console.log(player);
            //This part retrieves player's current points and adds 3 points to it
            let winnerCurrentPoints = player[0].points;
            let winnerCurrentGoals = parseInt(player[0].goals);
            let winnerCurrentGoalsIn = parseInt(player[0].goalIn);
            //This part adds scored goals to his current number of goals  
            winnerCurrentGoals += parseInt(req.body.firstPlayerScore);
            //This part adds goalsin scored by competitor to winnner current number of goals in
            winnerCurrentGoalsIn += parseInt(req.body.secondPlayerScore);
            winnerCurrentPoints += 3;
            console.log("Current Points: " + winnerCurrentPoints);
            database.update({ name: first }, { $set: { points: winnerCurrentPoints } }, { multi: true }, function (err, numReplaced) {
            });
            database.update({ name: first }, { $set: { goals: winnerCurrentGoals } }, { multi: true }, function (err, numReplaced) {
            });
            database.update({ name: first }, { $set: { goalIn: winnerCurrentGoalsIn } }, { multi: true }, function (err, numReplaced) {
            });

        });

    } else if (req.body.firstPlayerScore < req.body.secondPlayerScore) {
        console.log("second player is the winner and his score is: " + req.body.secondPlayerScore);
    } else {
        console.log("it is a Tie");
    }
    // 

    // database.insert(req.body);
    // // database.find({}).sort({ position: 1 }).skip(1).limit(2).exec(function (err, docs) {
    //     // docs is [doc3, doc1]
    // });
    // database.update({ _id: 'id6' }, { $addToSet: req.body }, {}, function () {
    //     // The fruits array didn't change
    //     // If we had used a fruit not in the array, e.g. 'banana', it would have been added to the array
    // });

});