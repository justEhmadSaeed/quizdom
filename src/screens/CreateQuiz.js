import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./CreateQuiz.css";
import Appbar from "../components/Appbar";
import AddQuestionModal from "../components/AddQuestionModal";
import QuestionsTable from "../components/QuestionsTable";
import { Button, Switch } from "@material-ui/core";

const CreateQuiz = ({ user }) => {
	const [questionArray, setQuestionArray] = useState([]);
	const titleRef = useRef(null);
	const [accesss, setAccesss] = useState(false);

	const addQuestionHandle = (title, opType, options) => {
		let arr = [...questionArray];
		arr.push({ title, opType, options });
		setQuestionArray(arr);
	};
	console.table(questionArray);
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
				<div className="controls">
					<AddQuestionModal addQuestionHandle={addQuestionHandle} />
					<Button color="secondary" variant="outlined">
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
			<Link className="link" to="/created-succesfully">
				<Button variant="contained" color="secondary">
					Create Quiz
				</Button>
			</Link>
		</div>
	);
};

export default CreateQuiz;
