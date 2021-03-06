import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../firebase/firebase'
import LoadingScreen from './LoadingScreen'
import AttemptedModal from './AttemptedModal'

const AttemptQuiz = ({ match }) => {
	const quizCode = match.params.quizCode
	const [questions, setQuestions] = useState([])
	const [attemptedQuestions, setAttemptedQuestions] = useState([])
	const [quizTitle, setQuizTitle] = useState('')
	const [loading, setLoading] = useState(true)
	const [result, setResult] = useState({})
	const [showModal, setShowModal] = useState(false)
	const uid = firebase.auth().currentUser.uid
	useEffect(() => {
		const fetchQuiz = async () => {
			const res = await fetch('/API/quizzes/join', {
				method: 'POST',
				body: JSON.stringify({ quizId: quizCode, uid }),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const quizData = await res.json()
			setLoading(false)
			if (quizData.error) setQuizTitle(quizData.error)
			else {
				setQuizTitle(quizData.title)
				setQuestions(quizData.questions)
				const temp = quizData.questions.map((question) => {
					return {
						id: question.id,
						title: question.title,
						optionType: question.optionType,
						selectedOptions: [],
					}
				})
				setAttemptedQuestions(temp)
			}
		}
		fetchQuiz()
	}, [quizCode, uid])

	const handleOptionSelect = (e, option, index) => {
		const temp = [...attemptedQuestions]
		const options = temp[index].selectedOptions
		console.log('index:' + index)
		if (!options.includes(option) && e.target.checked) {
			if (attemptedQuestions[index].optionType === 'radio') options[0] = option
			else options.push(option)
		}
		if (options.includes(option) && !e.target.checked) {
			const i = options.indexOf(option)
			options.splice(i, 1)
		}
		temp[index].selectedOptions = options
		setAttemptedQuestions(temp)
	}

	const submitQuiz = async () => {
		// send attemped Questions to backend
		try {
			const res = await fetch('/API/quizzes/submit', {
				method: 'POST',
				body: JSON.stringify({
					uid,
					quizId: quizCode,
					questions: attemptedQuestions,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const body = await res.json()
			setResult(body)
			setShowModal(true)
			console.log('res body : ', body)
		} catch (e) {
			console.log('Error Submitting quiz', e)
		}
	}

	if (loading) return <LoadingScreen />
	// For Quiz not Found
	if (quizTitle === 'ERR:QUIZ_NOT_FOUND')
		return (
			<div className='loading'>
				<h1>404 Quiz Not Found!</h1>
				<div id='logo-name'>
					<b>Quiz</b>dom
				</div>
				<h3>
					Go back to <Link to='/join-quiz'>Join Quiz </Link>Page.
				</h3>
			</div>
		)
	// For Quiz not accessible
	else if (quizTitle === 'ERR:QUIZ_ACCESS_DENIED')
		return (
			<div className='loading'>
				<h2>
					Quiz Access is Not Granted by the Creator. Please contact Quiz
					Creator.
				</h2>
				<div id='logo-name'>
					<b>Quiz</b>dom
				</div>
				<h3>
					Go back to <Link to='/join-quiz'>Join Quiz </Link>Page.
				</h3>
			</div>
		)
	else if (quizTitle === 'ERR:QUIZ_ALREADY_ATTEMPTED')
		return (
			<div className='loading'>
				<h2>You have already taken the Quiz.</h2>
				<div id='logo-name'>
					<b>Quiz</b>dom
				</div>
				<h3>
					Go back to <Link to='/join-quiz'>Join Quiz </Link>Page.
				</h3>
			</div>
		)
	else
		return (
			<div id='main-body'>
				<div id='create-quiz-body'>
					<div className='quiz-header'>
						<h2>{quizTitle}</h2>
					</div>
					{questions.map((question, index) => (
						<div className='attempQuestionCard' key={index}>
							<div id='title'>{question.title}</div>
							<div className='option-div'>
								{question.options.map((option, ind) => (
									<div className='option' key={ind}>
										{question.optionType === 'radio' ? (
											<input
												type='radio'
												name={`option${index}`}
												onChange={(e) =>
													handleOptionSelect(e, option.text, index)
												}
											/>
										) : (
											<input
												type='checkbox'
												name='option'
												onChange={(e) =>
													handleOptionSelect(e, option.text, index)
												}
											/>
										)}
										<label className='label' style={{ padding: '0px 5px' }}>
											{option.text}
										</label>
									</div>
								))}
							</div>
						</div>
					))}
					<button className='button wd-200' onClick={submitQuiz}>
						Submit
					</button>
					<AttemptedModal
						result={result}
						showModal={showModal}
						totalScore={questions.length}
					/>
				</div>
			</div>
		)
}

export default AttemptQuiz
