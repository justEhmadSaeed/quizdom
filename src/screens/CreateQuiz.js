import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import "./CreateQuiz.css"
import AddQuestionModal from "../components/AddQuestionModal"
import QuestionsTable from "../components/QuestionsTable"
import { Button, Switch } from "@material-ui/core"
import LoadingScreen from "./LoadingScreen"

const CreateQuiz = ({ user }) => {
	const [questionArray, setQuestionArray] = useState([])
	const [title, setTitle] = useState("")
	const [accesss, setAccesss] = useState(true)
	const [loading, setLoading] = useState("stop")
	const [quizCode, setQuizCode] = useState(null)
	const addQuestionHandle = (title, optionType, options) => {
		const arr = [...questionArray]
		arr.push({ title, optionType, options })
		setQuestionArray(arr)
	}
	console.table(questionArray)

	const createQuiz = async () => {
		console.log("Quiz Creation Starts...")
		setLoading("start")
		try {
			const result = await fetch("/API/quizzes/create", {
				method: "POST",
				body: JSON.stringify({
					title,
					uid: user.uid,
					questions: questionArray,
					isOpen: accesss,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			})
			console.log("Quiz posted ! ")
			const body = await result.json()
			console.log("Quiz Code : ", body.quizId)
			setQuizCode(body.quizId)
		} catch (e) {
			console.log("Quiz creation error : ", e)
			setLoading("error")
		}
	}
  console.log("Quiz:" + quizCode)
  
	if (quizCode)
    return <Redirect to={`/created-succesfully/${quizCode}`} />
  
	if (loading === "start") return <LoadingScreen />

	return (
		<div id="main-body">
			<div id="create-quiz-body">
				<div className="quiz-header">
					<input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						id="quiz-title"
						type="text"
						placeholder="Untitled Quiz"
					/>
				</div>
				<div className="controls">
					<AddQuestionModal addQuestionHandle={addQuestionHandle} />
					<Button variant="outlined" color="secondary">
						Responses 0
					</Button>
					<div className="switch">
						<Switch
							checked={accesss}
							onChange={(e) => setAccesss(e.target.checked)}
							color="secondary"
							name="access"
						/>
						<h4>{accesss ? "Public" : "Private"}</h4>
					</div>
				</div>
			</div>
			<div className="questionTable">
				<QuestionsTable
					questionArray={questionArray}
					setQuestionArray={setQuestionArray}
				/>
			</div>
			<div>
				<button
					disabled={!(title.length && questionArray.length)}
					className="button wd-200"
					onClick={() => createQuiz()}
				>
					Create Quiz
				</button>
			</div>
		</div>
	)
}

export default CreateQuiz
