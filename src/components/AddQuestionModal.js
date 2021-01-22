import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Button, Icon } from "@material-ui/core";
// import AddQuestionCard from "./AddQuestionCard"
import "./AddQuestionCard.css";
import { DeleteRounded, EditRounded, SaveRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: "10px",
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		outline: 0,
		width: "80%",
		borderRadius: "10px",
	},
	buttons: {
		display: "flex",
		justifyContent: "flex-end",
	},
	button: {
		margin: "5px",
	},
}));

export default function AddQuestionModal({
	titleRef = "",
	opType = "radio",
	opArray = [],
	addQuestionHandle,
}) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [optionType, setOptionType] = useState(opType);
	const [optionsArray, setOptionsArray] = useState(opArray);
	const [editedOption, setEditedOption] = useState(null);
	const [editOpIndex, setEditOpIndex] = useState(-1);

	const optionsRef = useRef(null);
	const checkBoxRef = useRef(null);
	const titleField = useRef(titleRef);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const addQuestionCallBack = () => {
		if (titleField.current.value.length === 0) return;

		const tempArr = [...optionsArray];
		if (optionsRef.current.value.length !== 0) {
			// For radio options, set all other options incorrect
			if (optionType === "radio" && checkBoxRef.current.checked)
				tempArr.forEach((op) => (op.isCorrect = false));
			
			tempArr.push({
				text: optionsRef.current.value,
				isCorrect: checkBoxRef.current.checked,
			});
		}
		addQuestionHandle(titleField.current.value, optionType, tempArr);
		setOpen(false);
	};

	const addOption = () => {
		if (optionsRef.current.value.length === 0) return;

		const arr = [...optionsArray];

		// For radio options, set all other options incorrect
		if (optionType === "radio" && checkBoxRef.current.checked)
			arr.forEach((op) => (op.isCorrect = false));

		arr.push({
			text: optionsRef.current.value,
			isCorrect: checkBoxRef.current.checked,
		});
		optionsRef.current.value = "";
		checkBoxRef.current.checked = false;
		setOptionsArray(arr);
	};
	const handleTypeChange = (e) => setOptionType(e.target.value);

	const deleteHandler = (ind) => {
		const temp = [...optionsArray];
		temp.splice(ind, 1);
		setOptionsArray(temp);
		setEditOpIndex(-1);
	};

	const handleEdit = (ind) => {
		if (editOpIndex === -1) {
			setEditOpIndex(ind);
			setEditedOption(optionsArray[ind].text);
		}
	};

	const saveEdited = () => {
		const temp = [...optionsArray];
		temp[editOpIndex].text = editedOption;
		// isCorrect: checkBoxRef.current.checked,
		setOptionsArray(temp);
		setEditOpIndex(-1);
	};

	useEffect(() => {
		if (!open) {
			setOptionsArray([]);
			setOptionType("radio");
		}
	}, [open]);
	return (
		<div className={classes.root}>
			<Button color="secondary" variant="contained" onClick={handleOpen}>
				Add Question
			</Button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				disableEnforceFocus={true}
			>
				<div className={classes.paper}>
					<div className="questionCard">
						<div id="title">Question:</div>
						<input
							autoFocus
							ref={titleField}
							className="question"
							type="text"
							placeholder="Type Question Here"
						/>
						<select
							id="select"
							placeholder="Select"
							onChange={handleTypeChange}
						>
							<option className="selectOp" value="radio">
								Single Choice
							</option>
							<option className="selectOp" value="check">
								Multiple choices
							</option>
						</select>

						<div className="option-div">
							<div className="options" id="one-op">
								{optionsArray.map((option, ind) => (
									<div className="option" key={ind}>
										<input
											disabled={true}
											ref={editedOption === ind ? checkBoxRef : null}
											className="radio-in"
											type={optionType === "radio" ? "radio" : "checkbox"}
											name="option"
											checked={option.isCorrect}
										/>
										{editOpIndex === ind ? (
											<input
												value={editedOption}
												onChange={(e) => setEditedOption(e.target.value)}
											/>
										) : (
											<div className="add-op">{option.text}</div>
										)}
										{editOpIndex === ind ? (
											<Icon className="save-icon" onClick={() => saveEdited()}>
												<SaveRounded />
											</Icon>
										) : (
											<Icon
												className="edit-icon"
												onClick={() => handleEdit(ind)}
											>
												<EditRounded />
											</Icon>
										)}
										<Icon
											className="delete-icon"
											onClick={() => {
												deleteHandler(ind);
											}}
										>
											<DeleteRounded />
										</Icon>
									</div>
								))}
							</div>
						</div>

						<div className="add-op">
							<input
								ref={checkBoxRef}
								className="radio-in"
								type={optionType === "radio" ? "radio" : "checkbox"}
								name="option"
							/>
							<input
								ref={optionsRef}
								className="op-text"
								type="text"
								placeholder={`Option ${optionsArray.length + 1}`}
							/>
							<input
								type="submit"
								className="add-btn"
								value="+ Add"
								onClick={addOption}
							/>
						</div>
					</div>
					<div className={classes.buttons}>
						<Button
							className={classes.button}
							variant="contained"
							onClick={handleClose}
						>
							Close
						</Button>
						<Button
							disabled={!optionsArray.length}
							className={classes.button}
							color="secondary"
							variant="contained"
							onClick={addQuestionCallBack}
						>
							Add Question
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}
