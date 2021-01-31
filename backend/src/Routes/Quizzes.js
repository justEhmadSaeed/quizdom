const express = require("express")
const Router = express.Router()
const DB = require("./DB")
const ObjectId = require("mongodb").ObjectId

// Get Quiz Data
Router.post("/join", (req, res) => {
	const { quizId, uid } = req.body
	DB.withDB(async (db) => {
		try {
			const cursor = db
				.collection("quizzes")
				.find({ _id: new ObjectId(quizId) })
				.project({
					// Excluded Fields
					responses: 0,
					"questions.options.isCorrect": 0,
				})

			const quizData = await cursor.toArray()
			console.log(quizData)
			if (!quizData[0].isOpen)
				res.status(500).json({ error: "ERR:QUIZ_ACCESS_DENIED" })
			else {
				const cursor2 = db.collection("users").find({
					$and: [{ uid }, { attemptedQuiz: { $elemMatch: { quizId } } }],
				})

				const quiz2 = await cursor2.toArray()
				console.log("quiz 2 : ", quiz2)
				if (quiz2[0]) {
					console.log("in quiz already attempted")
					res.status(200).json({ error: "ERR:QUIZ_ALREADY_ATTEMPTED" })
				} else res.status(200).json(quizData[0])
			}
		} catch (error) {
			res.status(500).json({ error: "ERR:QUIZ_NOT_FOUND" })
		}
	}, res)
})

// Submit the quiz
Router.post("/submit", (req, res) => {
	const quiz = req.body
	// quiz.quizId = "6011e9fedc4a163c9ced63ed"
	DB.submitQuiz(quiz, res)
})

// Create Quiz
Router.post("/create", (req, res) => {
	const quiz = req.body
	quiz.questions.forEach((question, i) => {
		question["id"] = i + 1
	})
	DB.createQuiz(quiz, res)
})

module.exports = Router
