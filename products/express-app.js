const express = require("express");
const cors = require("cors");
const { products } = require("./api");

module.exports = async (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  products(app);
  


};
