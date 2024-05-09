const express = require('express');
const DbConnection = require("./database/index");
const expressApp = require('./express-app');
const { CreateChannel } = require('./utils');
require("dotenv").config()

const PORT = process.env.PORT;

const StartServer = async() => {

    const app = express();
    
    await DbConnection();

    const channel = await CreateChannel();
    
    await expressApp(app, channel );

    app.listen(PORT, () => {
        console.log(`Shopping listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();