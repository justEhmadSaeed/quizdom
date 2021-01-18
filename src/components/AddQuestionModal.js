import React, { useState, useRef, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import { Button } from "@material-ui/core"
// import AddQuestionCard from "./AddQuestionCard"
import "./AddQuestionCard.css"

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
}))

export default function AddQuestionModal({
	titleRef = "",
	opType = "radio",
	opArray = [""],
	addQuestionHandle,
}) {
	const classes = useStyles()
	const [open, setOpen] = React.useState(false)

	const [optionType, setOptionType] = useState(opType)
	const [optionsArray, setOptionsArray] = useState(opArray)
	const titleField = useRef(titleRef)
	const optionsRef = useRef(null)

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}
	const addQuestionCallBack = () => {
		const tempArr = [...optionsArray]
		tempArr[optionsArray.length - 1] = optionsRef.current.value
		addQuestionHandle(titleField.current.value, optionType, tempArr)
		setOpen(false)
	}

	const addOption = () => {
		const arr = [...optionsArray]
		arr[optionsArray.length - 1] = optionsRef.current.value
		arr.push("")
		setOptionsArray(arr)
	}
	const handleTypeChange = (e) => setOptionType(e.target.value)

	useEffect(() => {
		if (!open) {
			setOptionsArray([""])
			setOptionType("radio")
		}
	}, [open])
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
								{optionsArray.map((option, key) => (
									<div className="option" key={key}>
										{optionType === "radio" ? (
											<input
												className="radio-in"
												type="radio"
												name="radio"
												value={option}
											/>
										) : (
											<input
												className="check-in"
												type="checkbox"
												name="check"
												value={option}
											/>
										)}
										<input
											disabled={optionsArray.length !== key + 1}
											ref={optionsRef}
											className="op-text"
											type="text"
											placeholder={`Option ${key + 1}`}
										/>
									</div>
								))}
							</div>
						</div>

						<div className="add-op">
							<input
								type="submit"
								className="add-btn"
								value="+"
								onClick={addOption}
							/>
							<label className="op-label"> Add Option</label>
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
	)
}
