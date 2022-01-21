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
const { error } = require('console');

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
            res.end();
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
    // database.find({}).sort({ position: 1 }).skip(1).limit(2).exec(function (err, docs) {
    //     // docs is [doc3, doc1]
    // });
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
    //first stand for the winner and second stands for loser
    let first = "";
    let second = "";
    let firstScore = 0;
    let secondScore = 0;

    //Condition to check if players chosen have the same names
    if (req.body.firstPlayerName == req.body.secondPlayerName) {
        console.log("Please Choose Different players");
        res.send({ operation: "failed" });
        // res.end();
        return;


    } else {

        if (req.body.firstPlayerScore == req.body.secondPlayerScore) {
            console.log("this is Tieeeeeeeeeeeeeiiiieeeee");
            //Add Logic for Tie Match
            first = req.body.firstPlayerName;
            second = req.body.secondPlayerName;
            firstScore = req.body.firstPlayerScore;
            secondScore = req.body.secondPlayerScore;

            database.find({ name: first }, function (err, player) {
                //This part retrieves player's current points and adds 1 points to it
                let winnerCurrentPoints = parseInt(player[0].points);
                winnerCurrentPoints++;
                database.update({ name: first }, { $set: { points: winnerCurrentPoints } }, { multi: true }, function (err, numReplaced) {
                });
                //This part adds scored goals to his current number of goals
                let winnerCurrentGoals = parseInt(player[0].goals);
                winnerCurrentGoals += parseInt(firstScore);
                database.update({ name: first }, { $set: { goals: winnerCurrentGoals } }, { multi: true }, function (err, numReplaced) {
                });
                //This part adds goalsin scored by competitor to winnner current number of goals in
                let winnerCurrentGoalsIn = parseInt(player[0].goalIn);
                winnerCurrentGoalsIn += parseInt(secondScore);
                database.update({ name: first }, { $set: { goalIn: winnerCurrentGoalsIn } }, { multi: true }, function (err, numReplaced) {
                });
                //This part adds played matches to player
                let winnerPlayedMatches = parseInt(player[0].played);
                winnerPlayedMatches++;
                database.update({ name: first }, { $set: { played: winnerPlayedMatches } }, { multi: true }, function (err, numReplaced) {
                });
                //This part adds tie matches to the winner player
                let winnerTieMatches = parseInt(player[0].tie);
                winnerTieMatches++;
                database.update({ name: first }, { $set: { tie: winnerTieMatches } }, { multi: true }, function (err, numReplaced) {
                });


            });

            database.find({ name: second }, function (err, player) {
                //This part retrieves player's current points and adds 1 points to it
                let winnerCurrentPoints = parseInt(player[0].points);
                winnerCurrentPoints++;
                database.update({ name: second }, { $set: { points: winnerCurrentPoints } }, { multi: true }, function (err, numReplaced) {
                });
                //This part adds played matches to player
                let winnerPlayedMatches = parseInt(player[0].played);
                winnerPlayedMatches++;
                database.update({ name: second }, { $set: { played: winnerPlayedMatches } }, { multi: true }, function (err, numReplaced) {
                });
                //This part adds tie matches to the losing player
                let loserTieMatches = parseInt(player[0].tie);
                loserTieMatches++;
                database.update({ name: second }, { $set: { tie: loserTieMatches } }, { multi: true }, function (err, numReplaced) {
                });
                //This part adds scored goals to his current number of goals
                let loserCurrentGoals = parseInt(player[0].goals);
                loserCurrentGoals += parseInt(secondScore);
                database.update({ name: second }, { $set: { goals: loserCurrentGoals } }, { multi: true }, function (err, numReplaced) {
                });
                //This part adds scored goalsin to his current number of goalsIn
                let loserCurrentGoalsIn = parseInt(player[0].goalIn);
                loserCurrentGoalsIn += parseInt(firstScore);
                database.update({ name: second }, { $set: { goalIn: loserCurrentGoalsIn } }, { multi: true }, function (err, numReplaced) {
                });

            });

        }

        else {
            //Add logic for winning for each side 
            if (req.body.firstPlayerScore > req.body.secondPlayerScore) {
                //Start test
                first = req.body.firstPlayerName;
                second = req.body.secondPlayerName;
                firstScore = req.body.firstPlayerScore;
                secondScore = req.body.secondPlayerScore;
                //End test
                console.log("first player won");


            } else {
                //Start test
                first = req.body.secondPlayerName;
                second = req.body.firstPlayerName;
                firstScore = req.body.secondPlayerScore;
                secondScore = req.body.firstPlayerScore;
                //End test
                console.log("second player won");
            }

            console.log("first player name is: " + first);
            console.log("second player name is: " + second);
            console.log("first score: " + firstScore);
            console.log("second score: " + secondScore);
            database.find({ name: first }, function (err, player) {
                //This part retrieves player's current points and adds 3 points to it
                let winnerCurrentPoints = parseInt(player[0].points);
                winnerCurrentPoints += 3;
                database.update({ name: first }, { $set: { points: winnerCurrentPoints } }, { multi: true }, function (err, numReplaced) {
                });
                //This part adds scored goals to his current number of goals
                let winnerCurrentGoals = parseInt(player[0].goals);
                winnerCurrentGoals += parseInt(firstScore);
                database.update({ name: first }, { $set: { goals: winnerCurrentGoals } }, { multi: true }, function (err, numReplaced) {
                });
                //This part adds goalsin scored by competitor to winnner current number of goals in
                let winnerCurrentGoalsIn = parseInt(player[0].goalIn);
                winnerCurrentGoalsIn += parseInt(secondScore);
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
                loserCurrentGoals += parseInt(secondScore);
                database.update({ name: second }, { $set: { goals: loserCurrentGoals } }, { multi: true }, function (err, numReplaced) {
                });
                //This part adds scored goalsin to his current number of goalsIn
                let loserCurrentGoalsIn = parseInt(player[0].goalIn);
                loserCurrentGoalsIn += parseInt(firstScore);
                database.update({ name: second }, { $set: { goalIn: loserCurrentGoalsIn } }, { multi: true }, function (err, numReplaced) {
                });

            });


        }

    }


    // console.log("Data base neeeeeeeeeeeew length is: " + databaseLength);


    // database.update({ _id: 'id6' }, { $addToSet: req.body }, {}, function () {
    //     // The fruits array didn't change
    //     // If we had used a fruit not in the array, e.g. 'banana', it would have been added to the array
    // });



    // let newDatabase = [];
    // database.find({}, (err, data) => {
    //     newDatabase = data;
    //     data.forEach((element) => {
    //         console.log("this is element " + element);
    //     });
    //     // console.log(data);
    // })

    // console.log("tyyyyyyyyyyyyyyype is " + typeof (newDatabase));

    // console.log("Memeeeeeebr of data: " + newDatabase);
    // database.find({}).sort({ points: -1, goals: -1 }).exec(function (err, docs) {
    //     console.log("soooooooooooooooorted");
    //     console.log(docs);
    //     // let newDatabase = docs[0];
    //     // console.log("Docs is: " + docs);
    //     // database.update({ _id: 'id6' }, { $pull: {} }, {}, function () {
    //     //     // Now the fruits array is ['orange', 'pear']
    //     // });
    //     // database.remove({}, { multi: true }, function (err, numRemoved) {
    //     // });
    //     // database.update({}, { newDatabase }, {}, function (err, numReplaced) {
    //     //     // numReplaced = 1
    //     //     // The doc #3 has been replaced by { _id: 'id3', planet: 'Pluton' }
    //     //     // Note that the _id is kept unchanged, and the document has been replaced
    //     //     // (the 'system' and inhabited fields are not here anymore)
    //     // });

    // });




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