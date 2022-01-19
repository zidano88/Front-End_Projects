const port = 8800;

// Require Express to run server and routes
const http = require('http');
const express = require('express');
/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('new'));

const server = app.listen(port, listening);
function listening() {
    console.log(`Server running on localhost: ${port}`);
};


// const port = 8800;

// const http = require('http');
// const express = require('express');
// const app = express();
// app.listen(port, () => console.log('listening at port: ' + port));
// app.use(express.static('new'));

// app.post('/postData', (req, res) => {
//     console.log(req);
// });
