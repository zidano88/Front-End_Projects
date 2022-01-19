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