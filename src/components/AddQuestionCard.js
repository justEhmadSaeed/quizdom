import { Paper } from "@material-ui/core"
import React, { useState } from "react"
import "./AddQuestionCard.css"

const AddQuestionCard = () => {
	const [optionType, setOptionType] = useState("oneOp")
	const [optionsArray, setOptionsArray] = useState([""])

	const addOption = () => {
		let arr = [...optionsArray]
		arr.push("")
		setOptionsArray(arr)
	}
	console.log(optionsArray)
	const handleTypeChange = (e) => setOptionType(e.target.value)

	var fullForms = {
		oneOp: "Single Choice",
		mulOp: "Multiple choices",
	}
	return (
		<div className="questionCard">
			<div id="title">Question:</div>
			<input
				className="question"
				type="text"
				placeholder="Type Question Here"
			/>
			<select id="select" placeholder="Select" onChange={handleTypeChange}>
				<option className="selectOp" value="oneOp">
					{fullForms["oneOp"]}
				</option>
				<option className="selectOp" value="mulOp">
					{fullForms["mulOp"]}
				</option>
			</select>
			{
				// Render According to the choices
			}
			<div className="option-div">
				<div className="options" id="one-op">
					{optionsArray.map((option, key) => (
						<div className="option" key={key}>
							{optionType === "oneOp" ? (
								<input
									className="radio-in"
									type="radio"
									name="oneOp"
									value={option}
								/>
							) : (
								<input
									className="check-in"
									type="checkbox"
									name="mulOp"
									value={option}
								/>
							)}
							<input
								className="op"
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
	)
}

export default AddQuestionCard
