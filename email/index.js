const express = require('express');
const expressApp = require('./express-app');
const { CreateChannel } = require('./utils');
require("dotenv").config()

const PORT = process.env.PORT;

const StartServer = async() => {

    const app = express();

    const channel = await CreateChannel();
    
    await expressApp(app, channel);

    app.listen(PORT, () => {
        console.log(`Customer listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();