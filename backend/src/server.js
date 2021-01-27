"use strict"
const express = require("express")
const app = express()
const userRoute = require('./Routes/Users');
const quizzesRoute = require('./Routes/Quizzes');


// Middleware
app.use(express.json())
app.use("/API/users", userRoute);
app.use("/API/quizzes", quizzesRoute);


// Listening to APIs
app.listen(process.env.PORT || 8000, () =>
	console.log("Listening on Port 8000")
)
