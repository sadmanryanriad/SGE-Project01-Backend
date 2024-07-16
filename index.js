const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.yv9dii9.mongodb.net/${process.env.DB}?retryWrites=true&w=majority&appName=Cluster0`;
const memberRoute = require("./routes/memberRoute");
const mcoRoute = require("./routes/mcoRoute");
const signUp = require("./controllers/signUp");
const login = require("./controllers/login");
const getRole = require("./controllers/getRole");
const adminRoute = require("./routes/adminRoute");

//middlewares
// Allow requests from specific origin and support credentials
const corsOptions = {
  origin: ["http://localhost:5173", "https://sge-project01.web.app"],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());

//database connection
mongoose
  .connect(uri)
  .then(() => {
    // protected routes
    app.use("/admin", adminRoute);
    app.use("/member", memberRoute);
    app.use("/mco", mcoRoute);

    app.get("/", async (req, res) => {
      res.status(200).json("HOME PAGE");
    });
    app.get("/signup", signUp);
    app.post("/login", login);
    app.get("/role/:email", getRole);

    app.listen(port, () => {
      console.log(`Connected to database and listening on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
