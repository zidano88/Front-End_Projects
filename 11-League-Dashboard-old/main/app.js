let membersArray = [
    { position: 1, name: "OZ", logo: '/images/AC_Milan.png', played: 3, won: 2, lost: 1, tie: 0, goals: 5, goalIn: 2, points: 6 },
    { position: 2, name: "MD", logo: "/images/Real_Madrid.png", played: 4, won: 3, lost: 1, tie: 0, goals: 7, goalIn: 1, points: 9 },
    { position: 3, name: "AM", logo: "/images/FC_Barcelona.png", played: 4, won: 1, lost: 2, tie: 0, goals: 2, goalIn: 5, points: 3 }
];

let listOfPlayers = document.getElementById('playersList');

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

document.getElementById('addNewPLayer').addEventListener('click', (event) => {
    // console.log(document.getElementById('enteredName').value);
    let newPlayerName = document.getElementById('enteredName').value;
    let newLogoUrl = '';
    let files = document.getElementById("enteredLogo").files;
    for (let i = 0, f; f = files[i]; i++) {
        newLogoUrl = f.name;
    }
    let newEntryPlayer = {
        position: membersArray.length,
        name: newPlayerName,
        logo: `/images/${newLogoUrl}`,
        played: 0,
        won: 0,
        lost: 0,
        tie: 0,
        goals: 0,
        goalIn: 0,
        points: 0
    }
    membersArray.push(newEntryPlayer);
    console.log("pushed successfully");
    console.log(membersArray);
});


// <li class="memberElement">

//     <div class="position">1</div>
//     <div class="name">OZ</div>
//     <div class="logo">Logo</div>
//     <div class="played">5</div>
//     <div class="won">3</div>
//     <div class="lost">2</div>
//     <div class="tie">0</div>
//     <div class="goals">7</div>
//     <div class="goalsIn">4</div>
//     <div class="points">9</div>
// </li>

// document.getElementById('playersList');

//<div class="logo">${member.logo}</div>