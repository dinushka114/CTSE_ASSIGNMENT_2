const mongoose = require("mongoose");
require("dotenv").config();
const DB_URL = process.env.MONGODB_URI;

const db_connection = async () => {
    mongoose.connect(DB_URL, { useNewUrlParser: true, useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Database connected!!")
        })
        .catch((err) => {
            console.log(err)
            console.log("Database connection error")
        })
}


module.exports = db_connection;