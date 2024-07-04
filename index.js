const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.status(200).json("HOME PAGE");
});

app.listen(port, () => {
  `listening on port: ${port}`;
});
