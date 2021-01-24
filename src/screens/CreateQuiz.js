import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./CreateQuiz.css";
import Appbar from "../components/Appbar";
import AddQuestionModal from "../components/AddQuestionModal";
import QuestionsTable from "../components/QuestionsTable";
import { Button, Switch } from "@material-ui/core";

const CreateQuiz = ({ user }) => {
	const [questionArray, setQuestionArray] = useState([]);
	const [title, setTitle] = useState("");
	const [accesss, setAccesss] = useState(false);

	const addQuestionHandle = (title, optionType, options) => {
		const arr = [...questionArray];
		arr.push({ title, optionType, options });
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
						value={title}
						onChange={(e) => setTitle(e.target.value)}
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
			{title.length && questionArray.length ? (
				<Link className="link" to="/created-succesfully">
					<Button
						onClick={() => console.log({ title, accesss, questionArray })}
						variant="contained"
						color="secondary"
					>
						Create Quiz
					</Button>
				</Link>
			) : (
				<Button variant="contained" color="secondary" disabled>
					Create Quiz
				</Button>
			)}
		</div>
	);
};

export default CreateQuiz;
