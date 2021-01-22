import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import "./CreateQuiz.css"
import Appbar from "../components/Appbar"
import AddQuestionModal from "../components/AddQuestionModal"

const CreateQuiz = ({ user }) => {
	const [questionArray, setQuestionArray] = useState([])
	const titleRef = useRef(null)
	const addQuestionHandle = (title, opType, optionsArray) => {
		let arr = [...questionArray]
		arr.push({ title, opType, optionsArray })
		setQuestionArray(arr)
	}
	console.table(questionArray)
	return (
		<div id="main-body">
			<div className="appheader">
				<Appbar user={user} />
			</div>
			<div id="create-quiz-body">
				<div className="quiz-header">
					<input
						ref={titleRef}
						id="quiz-title"
						type="text"
						placeholder="Untitled Quiz"
					/>
				</div>
				{/* {questionArray.map((question, key) => (
					<AddQuestionCard
						key={key}
						// question={question}
						// setQuestionArray={setQuestionArray}
						// index={i}
					/>
				))}
				<input
					id="add-btn"
					type="submit"
					onClick={addQuestionHandle}
					value="+"
				/> */}
				<AddQuestionModal addQuestionHandle={addQuestionHandle} />
				{questionArray.map((quest, key) => (
					<div
						key={key}
					>{`${quest.title} ${quest.opType}`}</div>
				))}
			</div>

			<Link to="/created-succesfully">
				<input id="create-btn" type="submit" value="Create" />
			</Link>
		</div>
	)
}

export default CreateQuiz
