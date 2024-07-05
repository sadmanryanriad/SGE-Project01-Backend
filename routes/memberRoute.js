const express = require("express");
const memberRoute = express.Router();
const MemberSchema = require("../models/memberRegistration");

memberRoute.get("/", async (req, res) => {
  res.json("member Home");
});

memberRoute.post("/registration", async (req, res) => {
  const data = req.body;
  const member = new MemberSchema({
    ...data,
  });
  try {
    const result = await member.save();
    res.status(201).json({
      message: "member data registered successfully",
      _id: result._id,
      role: result.role,
      email: result.email,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
      res.status(400).json({ errors });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

module.exports = memberRoute;
