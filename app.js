require('dotenv').config(); // env-variables

const express = require("express");
const morgan = require('morgan');
const helmet = require("helmet");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoDriver = require("./connection/mongoose")

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

//Recognize the incoming Request Object as a JSON Object.
app.use(express.json({ limit: "20mb" }));

//Recognize the incoming Request Object as strings or arrays.

app.use(express.urlencoded({ limit: "20mb", extended: true }));


require("./routes")(app);

module.exports = app;