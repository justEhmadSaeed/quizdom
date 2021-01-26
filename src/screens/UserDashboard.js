import React from "react"
import "./UserDashBoard.css"
import Appbar from "../components/Appbar"
import CreatedQuizCard from "../components/CreatedQuizCard"
import JoinedQuizCard from "../components/JoinedQuizCard"

const UserDashboard = ({ user }) => {
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
						<CreatedQuizCard
							title="Quiz 1"
							responses="23"
							questions="50"
							isOpen={true}
						/>
						<CreatedQuizCard
							title="Quiz 2"
							responses="23"
							questions="50"
							isOpen={false}
						/>
						<CreatedQuizCard
							title="Quiz 3"
							responses="23"
							questions="50"
							isOpen={true}
						/>
						<CreatedQuizCard
							title="Quiz 4"
							responses="23"
							questions="50"
							isOpen={false}
						/>
						<CreatedQuizCard
							title="Quiz 5"
							responses="23"
							questions="50"
							isOpen={true}
						/>
						<CreatedQuizCard
							title="Quiz 6"
							responses="23"
							questions="50"
							isOpen={false}
						/>
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
