import React, { createRef, useState } from "react"
import { Link } from "react-router-dom"
import "./CreateQuiz.css"
import Appbar from "../components/Appbar"
import AddQuestionCard from "../components/AddQuestionCard"
import AddQuestionModal from "./AddQuestionModal"
import { Paper } from "@material-ui/core"

const CreateQuiz = ({ user }) => {
	const [questionArray, setQuestionArray] = useState([])
	const [titleRef, setTitleRef] = useState(createRef())
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
				<Paper className="quiz-header">
					<input
						ref={titleRef}
						id="quiz-title"
						type="text"
						placeholder="Untitled Quiz"
					/>
				</Paper>
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
				<AddQuestionModal />
			</div>

			<Link to="/created-succesfully">
				<input id="create-btn" type="submit" value="Create" />
			</Link>
		</div>
	)
}

export default CreateQuiz
