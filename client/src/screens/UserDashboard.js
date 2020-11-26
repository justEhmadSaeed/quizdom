import React from "react";
import "./UserDashBoard.css";
import Appbar from "../components/Appbar";
import CreatedQuizCard from "../components/CreatedQuizCard";

const UserDashboard = ({ user }) => {
	return (
		<div>
			<div className="appheader">
				<Appbar user={user} />
			</div>
			<div className="dash-body">
				<div className="quizzes">
					<div className="heading">
						<div>Created </div>
						<div className="line"></div>
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
						<div>Attempted </div>
						<div className="line"></div>
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
			</div>
		</div>
	);
};

export default UserDashboard;
