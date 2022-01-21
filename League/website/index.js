//Global Variables 
let listOfPlayers = document.getElementById('playersList');

//postWeatherDataToServer is a POST function that posts data to the server
const postPlayerData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData

    } catch (error) {
        console.log("error", error);
    }
}


//getWeatherDatafromServer is a GET function that receives data from the server
const getDataBase = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'GET',
    });

    try {
        const newData = await response.json();
        // console.log(newData);
        return newData

    } catch (error) {
        console.log("error", error);
    }
}


//This function get database as an input and then loads this data into the webpage
function loadDataToWebsite(database) {
    let databaseLength = database.length;
    let pointsArray = [];
    let goalsArray = [];
    for (let index = 0; index < databaseLength; index++) {
        let member = database[index];
        let points = member.points;
        let goals = member.goals;
        pointsArray.push(points);
        goalsArray.push(goals);
    }

    //Bubble Sorting
    let tempPoint = 0;
    let tempGoal = 0;
    for (let i = 0; i < databaseLength; i++) {
        for (let j = 1; j < databaseLength; j++) {
            if (pointsArray[j - 1] > pointsArray[i]) {
                //This part sorts points array
                tempPoint = pointsArray[j - 1];
                pointsArray[j - 1] = pointsArray[i];
                pointsArray[i] = tempPoint;
                //this part sorts goals array based on points
                tempGoal = goalsArray[j - 1];
                goalsArray[j - 1] = goalsArray[i];
                goalsArray[i] = tempGoal;
            }
        }
    }
    let sortedArray = pointsArray.reverse();
    goalsArray.reverse();
    console.log(sortedArray)
    console.log("Bubble sorted array : " + pointsArray);
    console.log("Goals array sorted base on point array : " + goalsArray);

    //This part check if any player has same point and saves thier index in an array
    let equalPointPlayersIndex = [];
    let goalsOfPlayersHavingEqualPoints = [];

    for (let index = 0; index < databaseLength; index++) {
        if (sortedArray[index] == sortedArray[index + 1] || sortedArray[index] == sortedArray[index - 1]) {
            equalPointPlayersIndex.push(index);
            goalsOfPlayersHavingEqualPoints.push(goalsArray[index]);
        }
    }
    goalsOfPlayersHavingEqualPoints.sort((a, b) => b - a);
    // let sortedArray = pointsArray.sort((a, b) => b - a);;
    console.log("indexes of equal points players: " + equalPointPlayersIndex);
    console.log("goals of players having equal points: " + goalsOfPlayersHavingEqualPoints);
    let loadedNames = [];
    // console.log(sortedArray);

    let equalPointsCounter = 0;
    for (let index = 0; index < databaseLength; index++) {
        let flag = false;
        database.forEach((member) => {

            if (loadedNames.includes(member.name) || flag) {
                return;
            }


            if (member.points == sortedArray[index]) {
                //equalPointPlayersIndex.includes(index)
                if (goalsOfPlayersHavingEqualPoints.includes(member.goals)) {
                    console.log(member.name + " Has Equal points");
                    if (goalsOfPlayersHavingEqualPoints[equalPointsCounter] != member.goals) {
                        // console.log("hereeeeeee: " + goalsOfPlayersHavingEqualPoints[equalPointsCounter]);
                        // console.log("hereeeeeeeeeeeeegoals: " + member.goals);
                        console.log(member.name + " has " + member.goals + " goals")
                        // equalPointsCounter++;
                        return;
                    }
                    equalPointsCounter++;
                    // console.log("counter is : " + equalPointsCounter);
                    // let playersGoals = goalsOfPlayersHavingEqualPoints[index];
                }
                let newPlayer = document.createElement("li");
                newPlayer.classList.add("memberElement");
                newPlayer.innerHTML = `<div class="position">${index + 1}</div>
                <div class="name">${member.name}</div>
                <img src="${member.logo}" class="teamLogo" alt="">
                <div class="played">${member.played}</div>
                <div class="won">${member.won}</div>
                <div class="lost">${member.lost}</div>
                <div class="tie">${member.tie}</div>
                <div class="goals">${member.goals}</div>
                <div class="goalsIn">${member.goalIn}</div>
                <div class="points">${member.points}</div>`;
                listOfPlayers.appendChild(newPlayer);
                loadedNames.push(member.name);
                flag = true
            }
        });


    }
    // let count = 1;
    // for (let index = 0; index < databaseLength; index++) {
    //     for (let i = 0; i < databaseLength; i++) {
    //         let member = database[i];
    //         console.log('index is: ' + i);
    //         // console.log(`Member Position is: ${member.position}`);
    //         console.log(`Member Points are: ${member.points}`);
    //         if (member.position == count) {
    //             let newPlayer = document.createElement("li");
    //             newPlayer.classList.add("memberElement");
    //             newPlayer.innerHTML = `<div class="position">${member.position}</div>
    //             <div class="name">${member.name}</div>
    //             <img src="${member.logo}" class="teamLogo" alt="">
    //             <div class="played">${member.played}</div>
    //             <div class="won">${member.won}</div>
    //             <div class="lost">${member.lost}</div>
    //             <div class="tie">${member.tie}</div>
    //             <div class="goals">${member.goals}</div>
    //             <div class="goalsIn">${member.goalIn}</div>
    //             <div class="points">${member.points}</div>`;
    //             listOfPlayers.appendChild(newPlayer);
    //             // console.log(database);
    //             count++;
    //             console.log("count is " + count);
    //         }

    //     }
    // }


    // database.forEach((member) => {
    //     console.log(`Member Position is: ${member.position}`)
    //     let newPlayer = document.createElement("li");
    //     newPlayer.classList.add("memberElement");
    //     newPlayer.innerHTML = `<div class="position">${member.position}</div>
    //     <div class="name">${member.name}</div>
    //     <img src="${member.logo}" class="teamLogo" alt="">
    //     <div class="played">${member.played}</div>
    //     <div class="won">${member.won}</div>
    //     <div class="lost">${member.lost}</div>
    //     <div class="tie">${member.tie}</div>
    //     <div class="goals">${member.goals}</div>
    //     <div class="goalsIn">${member.goalIn}</div>
    //     <div class="points">${member.points}</div>`;
    //     listOfPlayers.appendChild(newPlayer);
    //     console.log(database);
    // })
}

//This functions loads players' names from database to select from them in new match section on the website
function loadPlayerNamesToSelect(database) {
    database.forEach((member) => {
        console.log(`player name is: ${member.name}`);
        let playerName = document.createElement("option");
        let duplicatePlayerName = document.createElement("option");
        playerName.innerHTML = member.name;
        duplicatePlayerName.innerHTML = member.name;
        // let duplicatePlayerName = playerName;
        document.getElementById('matchPlayerOne').appendChild(playerName);
        document.getElementById('matchPlayerTwo').appendChild(duplicatePlayerName);

    });

}


//Modal Code Starts here
const modal = document.querySelector(".modal");
// const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

// trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

//Modal code ends here


window.addEventListener('load', (event) => {
    getDataBase('/getDataBase').then(function (data) {
        console.log("loaded on start");
        loadDataToWebsite(data);
        loadPlayerNamesToSelect(data);
        let firstMember = document.getElementsByClassName('name')[1].innerHTML;
        console.log("First member is: " + document.getElementsByClassName('name')[1].innerHTML);
        document.getElementById("modalText").innerHTML = firstMember;
        document.getElementById("modalStaticText").innerHTML = `is the Leader of the league so far`;
        toggleModal();


    });
})

//this is an event listener that adds new player to database 
document.getElementById('addNewPLayerBtn').addEventListener('click', (event) => {
    // console.log(document.getElementById('enteredName').value);
    let newPlayerName = document.getElementById('enteredName').value;
    let newLogoUrl = '';
    let files = document.getElementById("enteredLogo").files;
    for (let i = 0, f; f = files[i]; i++) {
        newLogoUrl = f.name;
    }
    const timestamp = Date.now();

    getDataBase('/getDataBase').then(function (data) {

        let newEntryPlayer = {
            // position: (data.length) + 1,
            name: newPlayerName,
            logo: `/images/${newLogoUrl}`,
            played: 0,
            won: 0,
            lost: 0,
            tie: 0,
            goals: 0,
            goalIn: 0,
            points: 0,
            timestamp: timestamp
        }
        postPlayerData('/addNewPlayer', newEntryPlayer);
        //.then(function (data) {
        // getDataBase('/getDataBase').then(function (data) {
        //     console.log("loaded on click");
        //     console.log(data);
        //     loadDataToWebsite(data);
        // });
        //});
        console.log('player added');
        document.location.reload(true);

        // data.push(newEntryPlayer);
        // console.log("pushed successfully");
        // console.log(membersArray);
        // loadDataToWebsite(data);

    });


    // getDataBase('/getDataBase').then(function (data) {
    //     console.log("loaded on click");
    //     console.log(data);
    //     loadDataToWebsite(data);
    // });

});

document.getElementById('addNewMatchBtn').addEventListener('click', (event) => {
    let selected1 = document.getElementById("matchPlayerOne");
    let firstPlayer = selected1.value;
    let selected2 = document.getElementById("matchPlayerTwo");
    let secondPlayer = selected2.value;
    let firstPlayerGoals = document.getElementById('playerOneGoals').value;
    let secondPlayerGoals = document.getElementById('playerTwoGoals').value;

    let newMatch = { firstPlayerName: firstPlayer, firstPlayerScore: firstPlayerGoals, secondPlayerName: secondPlayer, secondPlayerScore: secondPlayerGoals };

    postPlayerData('/addNewMatch', newMatch).then(function (data) {
        // console.log(data);

        if (data.operation == "failed") {
            console.log("Operation Failed");
            alert("Please Choose Different PLayers")
        }

    });
    document.location.reload(true);
    //    /addNewMatch
    // console.log(`first player goals: ${firstPLayerGoals} and second players goals: ${secondPLayerGoals}`);
    // var strUser2 = e.options[e.selectedIndex].text; //test2
    // console.log(strUser2);

});




/*** OLD PART***/
/*
let membersArray = [
    { position: 1, name: "OZ", logo: '/images/AC_Milan.png', played: 3, won: 2, lost: 1, tie: 0, goals: 5, goalIn: 2, points: 6 },
    { position: 2, name: "MD", logo: "/images/Real_Madrid.png", played: 4, won: 3, lost: 1, tie: 0, goals: 7, goalIn: 1, points: 9 },
    { position: 3, name: "AM", logo: "/images/FC_Barcelona.png", played: 4, won: 1, lost: 2, tie: 0, goals: 2, goalIn: 5, points: 3 }
];
*/


/*
window.addEventListener('load', (event) => {
    membersArray.forEach((member) => {
        let newPlayer = document.createElement("li");
        newPlayer.classList.add("memberElement");
        newPlayer.innerHTML = `<div class="position">${member.position}</div>
        <div class="name">${member.name}</div>
        <img src="${member.logo}" class="teamLogo" alt="">
        <div class="played">${member.played}</div>
        <div class="won">${member.won}</div>
        <div class="lost">${member.lost}</div>
        <div class="tie">${member.tie}</div>
        <div class="goals">${member.goals}</div>
        <div class="goalsIn">${member.goalIn}</div>
        <div class="points">${member.points}</div>`;
        // console.log(newPlayer);
        listOfPlayers.appendChild(newPlayer);
        console.log(membersArray);
    })
});
*/





//Event listener for generate button
// document.getElementById('addNewPLayer').addEventListener('click', postData('/addNewPlayer', { name: "omoz" }));