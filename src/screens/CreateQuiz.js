import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./CreateQuiz.css";
import Appbar from "../components/Appbar";
import AddQuestionModal from "../components/AddQuestionModal";
import { Button, Switch } from "@material-ui/core";

const CreateQuiz = ({ user }) => {
	const [questionArray, setQuestionArray] = useState([]);
	const titleRef = useRef(null);
	const [accesss, setAccesss] = useState(false);

	const addQuestionHandle = (title, opType, optionsArray) => {
		let arr = [...questionArray];
		arr.push({ title, opType, optionsArray });
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
						Access Control
					</div>
				</div>
				{questionArray.map((quest, key) => (
					<div key={key}>{`${quest.title} ${quest.opType}`}</div>
				))}
			</div>

			<Link to="/created-succesfully">
				<input id="create-btn" type="submit" value="Create" />
			</Link>
		</div>
	);
};

export default CreateQuiz;
