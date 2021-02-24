'use strict'
const express = require('express')
const app = express()
const path = require('path')
const userRoute = require('./Routes/Users')
const quizzesRoute = require('./Routes/Quizzes')

// Hosting Frontend
// Create a production build of the frontend and paste the files in the public folder
app.use(express.static(path.join(__dirname, '/public/')))

// Middleware
app.use(express.json())
app.use('/API/users', userRoute)
app.use('/API/quizzes', quizzesRoute)

app.use('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/index.html'))
})
// Listening to APIs
app.listen(process.env.PORT || 8000, () =>
	console.log('Listening on Port 8000')
)
