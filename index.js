const express = require("express");
const http = require("http");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const app = express();
const server = http.createServer(app);
const Maincontroller = require("./controllers/main");
const Authcontroller = require("./controllers/auth");
// const dbconnection = require("./utliz/dbConnection");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(morgan("tiny"));

app.get("/",(req,res)=>{
  return res.status(200).json({msg:"server is running"});
})

app.use(Maincontroller);
app.use(Authcontroller);

const start = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect("mongodb+srv://astraldevelopers0:BVyF8kMNLx6V3601@cluster0.z1p58ro.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0
");
      console.log("connected to Database...");
      server.listen(3001);
      server.on("listening", () => {
        console.log("server is up...");
      });

      return;
    }
    console.log("alredy connected to Database...");
    server.listen(3001);
    server.on("listening", () => {
      console.log("server is up...");
    });
    return;
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

start();
