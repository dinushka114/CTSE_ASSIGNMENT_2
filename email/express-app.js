const express = require("express");
const cors = require("cors");
const { email } = require("./api");

module.exports = async (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  email(app);
  


};
