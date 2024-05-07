const express = require('express');
const DbConnection = require("./database/index");
const expressApp = require('./express-app');
require("dotenv").config()

const PORT = process.env.PORT;

const StartServer = async() => {

    const app = express();
    
    await DbConnection();
    
    await expressApp(app);

    app.listen(PORT, () => {
        console.log(`Products listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();