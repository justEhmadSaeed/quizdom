"use strict"
const express = require("express")
const MongoClient = require("mongodb")
const app = express()

app.use(express.json())

async function withDB(operations, res) {
	try {
		const client = await MongoClient.connect(
			"mongodb://quizdom:quizdom-mongodb@cluster0-shard-00-00.lecax.mongodb.net:27017,cluster0-shard-00-01.lecax.mongodb.net:27017,cluster0-shard-00-02.lecax.mongodb.net:27017/quizdom-project?ssl=true&replicaSet=atlas-hmlbn7-shard-0&authSource=admin&retryWrites=true&w=majority",
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		)
		console.log("DB Connected Successfully.")
		const db = client.db("quizdom-project")
		await operations(db)
		client.close()
	} catch (error) {
		res.status(500).json({ message: "Error Connecting to db ", error })
	}
}

async function createUser(uid, name, res) {
	await withDB(async function (db) {
		const user = await db.collection("users").findOne({ uid: uid })
		if (!user) {
			const result = await db.collection("users").insertOne({
				uid,
				name,
				createdQuiz: [],
				attemptedQuiz: [],
			})
			res.status(200).json({ message: "User Created successfully." })
		} else res.status(200).json({ message: "User Record Exist" })
	})
}
// Create User in DB
app.post("/API/users/create", function (req, res) {
	const { uid, name } = req.body
	createUser(uid, name, res)
})
// Get user Data
app.get("/API/users/:uid", function (req, res) {
	const uid = req.params.uid

	withDB(async function (db) {
		const userInfo = await db.collection("users").findOne({ name: "Ehmad" })
		res.status(200).json(userInfo)
	}, res)
})

app.listen(process.env.PORT || 8000, () =>
	console.log("Listening on Port 8000")
)
