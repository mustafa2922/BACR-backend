const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const app = express();
const server = http.createServer(app);
const Maincontroller = require("./controllers/main");
const Authcontroller = require("./controllers/auth");
const dbconnection = require("./utliz/dbConnection");

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(morgan("tiny"));

app.use(Maincontroller);
app.use(Authcontroller);

dbconnection();
server.listen(3001);
server.on("listening", () => {
  console.log("server is up...");
});
