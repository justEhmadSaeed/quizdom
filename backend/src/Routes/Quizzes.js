const express = require("express")
const Router = express.Router()
const DB = require("./DB")
const ObjectId = require("mongodb").ObjectId

// Get Quiz Data
Router.get("/:quizId", (req, res) => {
	const quizId = req.params.quizId
	DB.withDB(async (db) => {
		try {
			const quizData = await db
				.collection("quizzes")
				.findOne({ _id: new ObjectId(quizId) })
			delete quizData.responses
			quizData.questions.forEach((question) =>
				question.options.forEach((op) => delete op.isCorrect)
			)
			console.log(quizData)
			res.status(200).json(quizData)
		} catch (error) {
			res.status(500).json({ error: "Quiz Not Found." })
		}
	}, res)
})
// Create Quiz
Router.post("/create", (req, res) => {
	const quiz = req.body
	DB.createQuiz(quiz, res)
})

module.exports = Router
