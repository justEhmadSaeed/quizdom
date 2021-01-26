import React, { useState } from "react"
import { Link } from "react-router-dom"
import "./CreateQuiz.css"
import AddQuestionModal from "../components/AddQuestionModal"
import QuestionsTable from "../components/QuestionsTable"
import { Button, Switch } from "@material-ui/core"

const CreateQuiz = ({ user }) => {
	const [questionArray, setQuestionArray] = useState([])
	const [title, setTitle] = useState("")
	const [accesss, setAccesss] = useState(false)

	const addQuestionHandle = (title, optionType, options) => {
		const arr = [...questionArray]
		arr.push({ title, optionType, options })
		setQuestionArray(arr)
	}
	console.table(questionArray)

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
						<h4>Access Control</h4>
					</div>
				</div>
			</div>
			<QuestionsTable
				questionArray={questionArray}
				setQuestionArray={setQuestionArray}
			/>
			{title.length && questionArray.length ? (
				<Link to="/created-succesfully">
					<button
						className="button wd-200"
						onClick={() => console.log({ title, accesss, questionArray })}
					>
						Create Quiz
					</button>
				</Link>
			) : (
				<div>
					<button className="button wd-200">Create Quiz</button>
				</div>
			)}
		</div>
	)
}

export default CreateQuiz
