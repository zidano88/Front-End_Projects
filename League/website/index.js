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
    let count = 1;
    for (let index = 0; index < databaseLength; index++) {
        for (let i = 0; i < databaseLength; i++) {
            let member = database[i];
            console.log('index is: ' + i);
            console.log(`Member Position is: ${member.position}`)
            if (member.position == count) {
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
                listOfPlayers.appendChild(newPlayer);
                // console.log(database);
                count++;
                console.log("count is " + count);
            }

        }
    }


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

window.addEventListener('load', (event) => {
    getDataBase('/getDataBase').then(function (data) {
        console.log("loaded on start");
        loadDataToWebsite(data);
        loadPlayerNamesToSelect(data);
        // console.log("data is: " + data)
        // data.forEach((member) => {
        //     console.log("member" + member);
        // });

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
            position: (data.length) + 1,
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
    let firstPLayer = selected1.value;
    let selected2 = document.getElementById("matchPlayerTwo");
    let secondPLayer = selected2.value;
    let firstPLayerGoals = document.getElementById('playerOneGoals').value;
    let secondPLayerGoals = document.getElementById('playerTwoGoals').value;


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