const express = require('express');
const Router = express.Router();
const DB = require('./DB');


Router.post("/create", (req, res)=>{
    const quiz = req.body;
    DB.createQuiz(quiz, res);
})

module.exports = Router;