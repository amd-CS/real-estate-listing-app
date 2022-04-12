const mongoose = require("mongoose");
require("dotenv").config();

let mongoDB = process.env.DB_CONNECTION;

mongoose.connect(mongoDB);

module.exports = mongoose.connection;
