//postWeatherDataToServer is a POST function that posts data to the server
const postData = async (url = '', data = {}) => {
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

postData('/addMovie', { movie: 'the matrix', score: 5 })




//getWeatherDatafromServer is a GET function that receives data from the server
// const getWeatherDatafromServer = async (url = '', data = {}) => {
//     const response = await fetch(url, {
//         method: 'GET',
//     });

//     try {
//         const newData = await response.json();
//         return newData

//     } catch (error) {
//         console.log("error", error);
//     }
// }


//performAction function that calls getWeatherData functions with user parameters to retrieve data from the API and then calls postWeatherDataToServer to post this received data to the server
// function performAction(e) {

//     //This part call the postWeatherDataToServer function to post retireved data from the api to the server and this data includes date and temperature and user entered feeling
//     //This part calls the postWeatherDataToServer function to POST data to the server
//     postWeatherDataToServer('/addToProjectData', {
//         location: "ooop"
//     })

// };





//Event listener for generate button
document.getElementById('addNewPLayer').addEventListener('click', performAction);


// const postData = async (url = '', data = {}) => {
//     const response = await fetch(url, {
//         method: 'POST',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     });

//     try {
//         const newData = await response.json();
//         return newData

//     } catch (error) {
//         console.log("error", error);
//     }
// }


// const getData = async (url = '/getData', data = {}) => {
//     const response = await fetch(url, {
//         method: 'GET',
//     });

//     try {
//         const newData = await response.json();
//         return newData

//     } catch (error) {
//         console.log("error", error);
//     }
// }


// postData('/postData', {
//     location: 'teeeet',

// })


// window.addEventListener('load', postData('/postData', {
//     location: 'teeeet',
// }))