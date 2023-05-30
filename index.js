const swaggerUi = require('swagger-ui-express');
const docs = require('./swagger'); // import the docs object from swagger.js

//require express
const express = require('express');
const app = express();


// body-parser middleware takes the data from the HTTP request body and puts it into the req.body object
const bodyParser = require('body-parser');

// it help to handle incoming data in the form of JSON or URL-encoded data.

app.use(bodyParser.json()); //json
app.use(bodyParser.urlencoded({ extended: false })); //URL-encoded


//import mongoose
const mongoose = require('mongoose');


const cors = require('cors'); // Import the CORS middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:3000' })); // Enable CORS for requests from http://localhost:3000

//get routes from route file routes.js you can call it as you like
const routes = require('./routes/routes');



// loads environment variables from a .env file

require('dotenv').config();


//get the database from .env file
const mongoString = process.env.DATABASE_URL


//connect the database to our server using Mongoose.

mongoose.connect(mongoString);
const database = mongoose.connection

//to check if the connection is successful or fails.

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs)); //for swagger docs

app.use('/api', routes) //all routes start with /api

//wrong apis
app.use("/*", (req, res) => {
    res.status(404).json("This is a wrong endpoint!")
})

//server listening

app.listen(3001 , () => {

    console.log('server is runing at port 3001')
});

