const express = require("express")
const Router = express.Router()
const DB = require("./DB")

// Create User in DB
Router.post("/create", (req, res) => {
	const { uid, name } = req.body
	DB.createUser(uid, name, res)
})

// Get user Data
Router.get("/:uid", (req, res) => {
	const uid = req.params.uid
	console.log(uid)
	DB.withDB(async (db) => {
		// const userInfo = await db.collection("users").findOne({ uid })
		const cursor = db.collection("quizzes").find({ uid })
		const createdQuiz = await cursor.toArray()
		console.log(createdQuiz)
		res.status(200).json({ createdQuiz })
	}, res)
})

module.exports = Router
