const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || process.env.LP;
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.ni8nft9.mongodb.net/${process.env.DB}?retryWrites=true&w=majority&appName=Cluster0`;

//middlewares
app.use(cors());
app.use(express.json());

//database connection
mongoose
  .connect(uri)
  .then(() => {
    //routes

    app.get("/", async (req, res) => {
      res.status(200).json("HOME PAGE");
    });

    app.listen(port, () => {
      console.log(`Connected to database and listening on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
