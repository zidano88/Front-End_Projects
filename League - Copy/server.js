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
    let first = "";
    let second = "";
    let firstScore = 0;
    let secondScore = 0;

    if (req.body.firstPlayerScore == req.body.secondPlayerScore) {
        console.log("this is Tieeeeeeeeeeeeeiiiieeeee");
        //Add Logic for Tie Match
    }

    else {
        //Add logic for winning for each side 
        if (req.body.firstPlayerScore > req.body.secondPlayerScore) {
            //Start test

            //End test
            first = req.body.firstPlayerName;
            second = req.body.secondPlayerName;
            console.log("first player name is: " + first);
            console.log("second player name is: " + second);
            database.find({ name: first }, function (err, player) {
                //This part retrieves player's current points and adds 3 points to it
                let winnerCurrentPoints = parseInt(player[0].points);
                winnerCurrentPoints += 3;
                database.update({ name: first }, { $set: { points: winnerCurrentPoints } }, { multi: true }, function (err, numReplaced) {
                });
                //This part adds scored goals to his current number of goals
                let winnerCurrentGoals = parseInt(player[0].goals);
                winnerCurrentGoals += parseInt(req.body.firstPlayerScore);
                database.update({ name: first }, { $set: { goals: winnerCurrentGoals } }, { multi: true }, function (err, numReplaced) {
                });
                //This part adds goalsin scored by competitor to winnner current number of goals in
                let winnerCurrentGoalsIn = parseInt(player[0].goalIn);
                console.log("winner old GoalIn: " + winnerCurrentGoalsIn);
                winnerCurrentGoalsIn += parseInt(req.body.secondPlayerScore);
                console.log("winner new GoalIn: " + winnerCurrentGoalsIn);
                database.update({ name: first }, { $set: { goalIn: winnerCurrentGoalsIn } }, { multi: true }, function (err, numReplaced) {
                });
                //This part adds played matches to player
                let winnerPlayedMatches = parseInt(player[0].played);
                winnerPlayedMatches++;
                database.update({ name: first }, { $set: { played: winnerPlayedMatches } }, { multi: true }, function (err, numReplaced) {
                });
                //This part adds won matches to the winner player
                let winnerWonMatches = parseInt(player[0].won);
                winnerWonMatches++;
                database.update({ name: first }, { $set: { won: winnerWonMatches } }, { multi: true }, function (err, numReplaced) {
                });


            });

            database.find({ name: second }, function (err, player) {
                //This part adds played matches to player
                let winnerPlayedMatches = parseInt(player[0].played);
                winnerPlayedMatches++;
                database.update({ name: second }, { $set: { played: winnerPlayedMatches } }, { multi: true }, function (err, numReplaced) {
                });
                //This part adds lost matches to the losing player
                let loserLostMatches = parseInt(player[0].lost);
                loserLostMatches++;
                database.update({ name: second }, { $set: { lost: loserLostMatches } }, { multi: true }, function (err, numReplaced) {
                });
                //This part adds scored goals to his current number of goals
                let loserCurrentGoals = parseInt(player[0].goals);
                loserCurrentGoals += parseInt(req.body.secondPlayerScore);
                database.update({ name: second }, { $set: { goals: loserCurrentGoals } }, { multi: true }, function (err, numReplaced) {
                });
                //This part adds scored goalsin to his current number of goalsIn
                let loserCurrentGoalsIn = parseInt(player[0].goalIn);
                console.log("loser old GoalIn: " + loserCurrentGoalsIn);
                loserCurrentGoalsIn += parseInt(req.body.firstPlayerScore);
                console.log("loser new GoalIn: " + loserCurrentGoalsIn);
                database.update({ name: second }, { $set: { goalIn: loserCurrentGoalsIn } }, { multi: true }, function (err, numReplaced) {
                });

            });

        } else if (req.body.firstPlayerScore < req.body.secondPlayerScore) {
            console.log("second player is the winner and his score is: " + req.body.secondPlayerScore);
        }

    }


    // } else {
    //     console.log("it is a Tie");
    // }
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