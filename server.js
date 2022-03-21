const express = require("express"),
  bodyParser = require("body-parser");
// Start up an instance of app
const app = express();
// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 4000;

// Cors for cross origin allowance

const cors = require("cors");

app.use(cors());

//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// Initialize the main project folder

// Setup Server

function getData(request, response) {
  response.send(projectData);
}

app.get("/get", getData);

function postData(request, response) {
  projectData = request.body;

  response.send(projectData);
}

app.post("/post", postData);
app.use(express.static("website"));

function listening() {
  console.log(`running on localhost: ${port}`);
}

app.listen(port, listening);