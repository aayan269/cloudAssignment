const express = require("express");
const { AddTask, RemoveTask, GetTask, UpdateStatus } = require("../controller/taskController");
const app = express.Router();

app.post("/add", AddTask);
app.delete("/remove", RemoveTask);
app.get("/gettask/:id",GetTask);
app.patch("/updatestatus",UpdateStatus)

module.exports = app
