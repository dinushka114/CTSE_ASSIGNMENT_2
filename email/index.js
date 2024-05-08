const express = require('express');
const expressApp = require('./express-app');
require("dotenv").config()

const PORT = process.env.PORT;

const StartServer = async() => {

    const app = express();
    
    await expressApp(app);

    app.listen(PORT, () => {
        console.log(`Customer listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();