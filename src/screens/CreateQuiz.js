import React, { useState } from "react"
import { Link } from "react-router-dom"
import "./CreateQuiz.css"
import Appbar from "../components/Appbar"
import AddQuestionCard from "../components/AddQuestionCard"
import AddQuestionModal from "./AddQuestionModal"

const CreateQuiz = ({ user }) => {
	const [questionArray, setQuestionArray] = useState([
		{ title: "", options: [], type: "" },
	])

	const addQuestionHandle = () => {
		let arr = [...questionArray]
		arr.push({})
		setQuestionArray(arr)
	}
	console.log(questionArray)
	return (
		<div id="main-body">
			<div className="appheader">
				<Appbar user={user} />
			</div>
			<div id="create-quiz-body">
				<div className="quiz-header">
					<input id="quiz-title" type="text" placeholder="Untitled Quiz" />
				</div>
				{/* {questionArray.map((question, i, key) => (
					<AddQuestionCard
						key={key}
						question={question}
						setQuestionArray={setQuestionArray}
						index={i}
					/>
				))}
				<input
					id="add-btn"
					type="submit"
					onClick={addQuestionHandle}
					value="+"
				/> */}
				<AddQuestionModal />
			</div>
			<Link to="/created-succesfully">
				<input id="create-btn" type="submit" value="Create" />
			</Link>
		</div>
	)
}

export default CreateQuiz
