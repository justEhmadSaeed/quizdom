import React from "react"
import "./QuizCard.css"

const CreatedQuizCard = ({ title, responses, code, questions, isOpen }) => {
	return (
		<div className="quiz-card">
			<div>
				<h1 id="created-quiz-title">{title}</h1>
				<p className="card-code">Code: {code}</p>
			</div>
			<div id="horizontal-line"></div>
			<div id="row">
				<div id="responses">Responses : {responses}</div>
				<div id="questions">Questions : {questions}</div>
			</div>
			{isOpen ? <div id="open">open</div> : <div id="closed">closed</div>}
		</div>
	)
}

export default CreatedQuizCard
