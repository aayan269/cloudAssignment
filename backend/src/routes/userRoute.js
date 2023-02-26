const express = require("express");
const loginController = require("../controller/userController");
const app = express.Router();


app.post("/login", loginController);

module.exports =  app

