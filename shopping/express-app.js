const express = require("express");
const cors = require("cors");
const { shopping } = require("./api");

module.exports = async (app, channel) => {
  app.use(cors());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  shopping(app, channel);
  


};
