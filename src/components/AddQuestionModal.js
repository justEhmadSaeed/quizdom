import React, { useState, useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Icon, IconButton } from '@material-ui/core'
import './AddQuestionModal.css'
import { DeleteRounded, EditRounded, SaveRounded } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
	root: {
		// margin: "10px",
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		outline: 0,
		width: '90%',
		borderRadius: '10px',
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
}))

export default function AddQuestionModal({
	type = 'add',
	title = '',
	opType = 'radio',
	opArray,
	index = -1,
	addQuestionHandle,
}) {
	const classes = useStyles()
	const [open, setOpen] = React.useState(false)
	const [optionType, setOptionType] = useState('radio')
	const [optionsArray, setOptionsArray] = useState([])
	const [editedOption, setEditedOption] = useState(null)
	const [editOpIndex, setEditOpIndex] = useState(-1)
	const [titleField, setTitleField] = useState('')
	const optionsRef = useRef(null)
	const checkBoxRef = useRef(null)

	useEffect(() => {
		if (open) {
			setTitleField(title)
			setOptionType(opType)
			if (opArray) setOptionsArray(opArray)
		} else {
			setTitleField('')
			setOptionsArray([])
			setOptionType('radio')
		}
	}, [open, title, opType, opArray])
	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}
	const addQuestionCallBack = () => {
		const tempArr = [...optionsArray]
		if (optionsRef.current.value.length !== 0) {
			// For radio options, set all other options incorrect
			if (optionType === 'radio' && checkBoxRef.current.checked)
				tempArr.forEach((op) => (op.isCorrect = false))

			tempArr.push({
				text: optionsRef.current.value,
				isCorrect: checkBoxRef.current.checked,
			})
		}
		// Error Handling
		if (!titleField.length && optionsArray.length < 2) {
			alert('Please add Question and atleast 2 options.')
			return
		} else if (!titleField.length) {
			alert('Please add Question.')
			return
		} else if (optionsArray.length < 2) {
			alert('Number of Options must be greater than 1.')
			return
		}
		const correctOp = optionsArray.filter((op) => op.isCorrect)
		if (correctOp.length < 1) {
			alert('No correct option was selected.')
			return
		}
		if (index !== -1) addQuestionHandle(titleField, optionType, tempArr, index)
		else addQuestionHandle(titleField, optionType, tempArr)

		setOpen(false)
	}

	const addOption = () => {
		if (optionsRef.current.value.length === 0) return

		const arr = [...optionsArray]
		if (
			optionsArray.findIndex((op) => op.text === optionsRef.current.value) !==
			-1
		) {
			alert('Option already exists.')
			return
		}
		if (optionType === 'radio' && checkBoxRef.current.checked)
			// For radio options, set all other options incorrect
			arr.forEach((op) => (op.isCorrect = false))

		arr.push({
			text: optionsRef.current.value,
			isCorrect: checkBoxRef.current.checked,
		})
		optionsRef.current.value = ''
		checkBoxRef.current.checked = false
		setOptionsArray(arr)
	}
	const handleTypeChange = (e) => setOptionType(e.target.value)

	const deleteHandler = (ind) => {
		const temp = [...optionsArray]
		temp.splice(ind, 1)
		setOptionsArray(temp)
		setEditOpIndex(-1)
	}

	const handleEdit = (ind) => {
		if (editOpIndex === -1) {
			setEditOpIndex(ind)
			setEditedOption(optionsArray[ind].text)
		}
	}

	const saveEdited = () => {
		const temp = [...optionsArray]
		temp[editOpIndex].text = editedOption
		setOptionsArray(temp)
		setEditOpIndex(-1)
	}

	return (
		<div className={classes.root}>
			{type === 'add' ? (
				<button className='button' onClick={handleOpen}>
					Add Question
				</button>
			) : (
				<IconButton onClick={handleOpen}>
					<EditRounded />
				</IconButton>
			)}
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				disableEnforceFocus={true}
			>
				<div className={classes.paper}>
					<div className='questionCard'>
						<div id='title'>Question:</div>
						<input
							type='text'
							autoFocus
							value={titleField}
							onChange={(e) => setTitleField(e.target.value)}
							className='input-text question'
							placeholder='Type Question Here'
						/>
						<select
							id='select'
							placeholder='Select'
							onChange={handleTypeChange}
						>
							<option className='selectOp' value='radio'>
								Single Answer
							</option>
							<option className='selectOp' value='check'>
								Multiple Answers
							</option>
						</select>

						<div className='option-div'>
							<div className='options' id='one-op'>
								{optionsArray.map((option, ind) => (
									<div className='option' key={ind}>
										<input
											type={optionType === 'radio' ? 'radio' : 'checkbox'}
											disabled={true}
											className='radio-in'
											name='option'
											checked={option.isCorrect}
										/>
										{editOpIndex === ind ? (
											<input
												value={editedOption}
												onChange={(e) => setEditedOption(e.target.value)}
											/>
										) : (
											<div className='add-op'>{option.text}</div>
										)}
										{editOpIndex === ind ? (
											<Icon className='save-icon' onClick={() => saveEdited()}>
												<SaveRounded />
											</Icon>
										) : (
											<Icon
												className='edit-icon'
												onClick={() => handleEdit(ind)}
											>
												<EditRounded />
											</Icon>
										)}
										<Icon
											className='delete-icon'
											onClick={() => {
												deleteHandler(ind)
											}}
										>
											<DeleteRounded />
										</Icon>
									</div>
								))}
							</div>
						</div>

						<div className='add-op'>
							<div>
								<input
									type={optionType === 'radio' ? 'radio' : 'checkbox'}
									ref={checkBoxRef}
									className='radio-in'
									name='option'
								/>
								<input
									type='text'
									ref={optionsRef}
									className='input-text op-text'
									placeholder={`Option ${optionsArray.length + 1}`}
								/>
							</div>
							<input
								type='submit'
								className='add-btn'
								value='+ Add'
								onClick={addOption}
							/>
						</div>
					</div>
					<div className={classes.buttons}>
						<button className='add-btn' onClick={handleClose}>
							Close
						</button>
						<button
							// disabled={!(optionsArray.length && titleField.length)}
							className='button'
							color='secondary'
							variant='contained'
							onClick={addQuestionCallBack}
						>
							{type === 'add' ? 'Add ' : 'Edit '}
							Question
						</button>
					</div>
				</div>
			</Modal>
		</div>
	)
}
