const express = require("express");
const app = express();

app.use(require("../Routes/task"));


module.exports = app;
