import React, { useState, useEffect } from "react"
import "./UserDashBoard.css"
import CreatedQuizCard from "../components/CreatedQuizCard"
import JoinedQuizCard from "../components/JoinedQuizCard"
import LoadingScreen from "./LoadingScreen"

const UserDashboard = ({ user }) => {
	const [createdQuizzes, setCreatedQuizzes] = useState([])
	const [attemptedQuizzes, setAttemptedQuizzes] = useState([])
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const fetchQuizData = async () => {
			const results = await fetch(`/API/users/${user.uid}`)
			const quizData = await results.json()
			if (quizData.createdQuiz) setCreatedQuizzes(quizData.createdQuiz)
			if (quizData.attemptedQuiz) setAttemptedQuizzes(quizData.attemptedQuiz)
			setLoading(false)
		}
		if (user) fetchQuizData()
	}, [user])
	if (loading) return <LoadingScreen />

	return (
		<div className="dash-body">
			<div className="quizzes">
				<div className="heading">
					<div className="line-left" />
					<h2>Created </h2>
					<div className="line" />
				</div>
				<div className="card-holder">
					{createdQuizzes.map((quiz, key) => (
						<CreatedQuizCard
							key={key}
							title={quiz.title}
							code={quiz._id}
							responses={quiz.responses.length}
							questions={quiz.questions.length}
							isOpen={quiz.isOpen}
						/>
					))}
				</div>
			</div>
			<div className="quizzes">
				<div className="heading">
					<div className="line-left" />
					<h2>Attempted </h2>
					<div className="line" />
				</div>
				<div className="card-holder">
					{attemptedQuizzes.map((quiz, key) => (
						<JoinedQuizCard
							key={key}
							title={quiz.title}
							score={quiz.responses[0].score}
							questions={quiz.totalQuestions}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default UserDashboard
