const express = require("express");
const Router = express.Router();
const DB = require("./DB");
const ObjectId = require("mongodb").ObjectId;

// Get Quiz Data
Router.get("/join/:quizId", (req, res) => {
  const quizId = req.params.quizId;
  DB.withDB(async (db) => {
    try {
      const cursor = db
        .collection("quizzes")
        .find({ _id: new ObjectId(quizId) })
        .project({
          // Excluded Fields
          responses: 0,
          "questions.options.isCorrect": 0,
        });

      const quizData = await cursor.toArray();
      console.log(quizData);
      if (quizData[0].isOpen) res.status(200).json(quizData[0]);
      else res.status(500).json({ message: "Quiz is not Accessible" });
    } catch (error) {
      res.status(500).json({ error: "Quiz Not Found." });
    }
  }, res);
});

// Submit teh quiz
Router.post("/submit/", (req, res) => {
  // const quizID = req.params.quizID
  const request = req.body;
  DB.withDB(async (db) => {
    try {
      console.log("in the submit try: ", request.quizId);
      const quiz = await db
        .collection("quizzes")
        .findOne({ _id: new ObjectId("6011e9fedc4a163c9ced63ed") });
      console.log("retrieved quiz : ",quiz);
    } catch (e) {
      console.log("Error", e);
    }
  });
});

// Create Quiz
Router.post("/create", (req, res) => {
  const quiz = req.body;
  DB.createQuiz(quiz, res);
});

module.exports = Router;
