"use strict"
const express = require("express")
const app = express()
const DB = require('./Routes/DB');
const userRoute = require('./Routes/Users');



// Middleware
app.use(express.json())
app.use("/API/users", userRoute);


app.listen(process.env.PORT || 8000, () =>
	console.log("Listening on Port 8000")
)
