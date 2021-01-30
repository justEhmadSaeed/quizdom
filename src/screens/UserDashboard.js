import React, { useState, useEffect } from "react"
import "./UserDashBoard.css"
import CreatedQuizCard from "../components/CreatedQuizCard"
import JoinedQuizCard from "../components/JoinedQuizCard"

const UserDashboard = ({ user }) => {
	const [createdQuizzes, setCreatedQuizzes] = useState([])
	useEffect(() => {
		const fetchQuizData = async () => {
			const results = await fetch(`/API/users/${user.uid}`)
			const quizData = await results.json()
			console.log(quizData)
			if (quizData.createdQuiz) setCreatedQuizzes(quizData.createdQuiz)
		}
		fetchQuizData()
	}, [user])

	return (
		<div id="dashboard">
			<div className="dash-body">
				<div className="quizzes">
					<div className="heading">
						<div className="line-left" />
						<div>Created </div>
						<div className="line" />
					</div>
					<div className="card-holder">
						{createdQuizzes.map((quiz, key) => (
							<CreatedQuizCard
								key={key}
								title={quiz.title}
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
						<div>Attempted </div>
						<div className="line" />
					</div>
					<div className="card-holder">
						<JoinedQuizCard title="Quiz 1" score="23" questions="50" />
						<JoinedQuizCard title="Quiz 2" score="23" questions="50" />
						<JoinedQuizCard title="Quiz 3" score="23" questions="50" />
						<JoinedQuizCard title="Quiz 4" score="23" questions="50" />
						<JoinedQuizCard title="Quiz 5" score="23" questions="50" />
						<JoinedQuizCard title="Quiz 6" score="23" questions="50" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserDashboard
