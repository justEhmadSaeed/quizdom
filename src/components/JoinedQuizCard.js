import React from "react"
import "./QuizCard.css"

const JoinedQuizCard = ({ title, score, questions }) => {
	return (
		<div className="quiz-card">
			<h1 id="created-quiz-title">{title}</h1>
			<div id="horizontal-line"></div>
			<div id="row">
				<div id="responses">Score : {score}</div>
				<div id="questions">Questions : {questions}</div>
			</div>
			<div id="open"></div>
		</div>
	)
}

export default JoinedQuizCard
