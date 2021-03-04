import { IconButton } from '@material-ui/core'
import { EditRounded } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import './QuizCard.css'

const CreatedQuizCard = ({
	title,
	responses,
	code,
	questions,
	isOpen,
	index,
	setEditQuiz,
}) => {
	return (
		<div className='quiz-card'>
			<div>
				<h1 id='created-quiz-title'>{title}</h1>
				<p className='card-code'>Code: {code}</p>
			</div>
			<div id='horizontal-line'></div>
			<div id='row'>
				<div id='responses'>
					<Link to={`/responses/${code}`} style={{ fontWeight: 'bold' }}>
						Responses : {responses}
					</Link>
				</div>
				<div id='questions'>Questions : {questions}</div>
			</div>
			<div className='bottom-bar'>
				{isOpen ? <div id='open'>open</div> : <div id='closed'>closed</div>}
				<IconButton onClick={() => setEditQuiz([index])}>
					<EditRounded />
				</IconButton>
			</div>
		</div>
	)
}

export default CreatedQuizCard
