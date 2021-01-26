const express = require("express");
const Router = express.Router();
const DB = require("./DB");

// Create User in DB
Router.post("/create", function (req, res) {
  // res.json("Hello world");
  console.log("In post");
  const { uid, name } = req.body;
  DB.createUser(uid, name, res);
});

// Get user Data
Router.get("/:uid", function (req, res) {
  const uid = req.params.uid;
  console.log(uid)
  DB.withDB(async function (db) {
	const userInfo = await db.collection("users").findOne({ name: "Ehmad Saeed" });
	res.status(200).json(userInfo);
  }, res);
});


module.exports = Router;
