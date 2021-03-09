import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../firebase/firebase'
import LoadingScreen from './LoadingScreen'
import AttemptedModal from './AttemptedModal'
// Speech Recognition Imports
import SpeechRecognition, {
	useSpeechRecognition
} from 'react-speech-recognition'

const AttemptBlindQuiz = ({ match }) => {
	const [commands, setCommands] = useState([])
	const speak = (string) =>
		synthRef.current.speak(new SpeechSynthesisUtterance(string))
	// Quiz Data Model
	const [currentIndex, setCurrentIndex] = useState(0)
	const quizCode = match.params.quizCode
	const [questions, setQuestions] = useState([])
	const [attemptedQuestions, setAttemptedQuestions] = useState([])
	const [quizTitle, setQuizTitle] = useState('')
	const [loading, setLoading] = useState(true)
	const [result, setResult] = useState({})
	const [showModal, setShowModal] = useState(false)
	const uid = firebase.auth().currentUser.uid

	// Using Speech Recognition Transcript
	const { transcript, resetTranscript } = useSpeechRecognition({
		commands
	})
	const synthRef = React.useRef(window.speechSynthesis)
	console.log('transcript:' + transcript)
	const spaceFunction = React.useCallback(
		(event) => {
			if (event.keyCode === 32) {
				if (quizTitle === 'ERR:QUIZ_NOT_FOUND')
					speak('The quiz you requested was not found.')
				// For Quiz not accessible
				else if (quizTitle === 'ERR:QUIZ_ACCESS_DENIED')
					speak('Access is not granted by the creator.')
				else if (quizTitle === 'ERR:QUIZ_ALREADY_ATTEMPTED')
					speak('You have already attempted this quiz.')
				else {
					SpeechRecognition.startListening({ continuous: true })
					console.log('start listening...')
					speak('Listening Started.')
					resetTranscript()
				}
			}
		},
		[resetTranscript, quizTitle]
	)

	// Speech Recognition useEffect
	useEffect(() => {
		if (!SpeechRecognition.browserSupportsSpeechRecognition())
			alert('Oops, your browser is not supported!')
		else {
			document.addEventListener('keydown', spaceFunction)
		}
		return () => {
			document.removeEventListener('keydown', spaceFunction)
			SpeechRecognition.abortListening()
		}
	}, [spaceFunction])

	// Fetch Quiz Data useEffect
	useEffect(() => {
		const fetchQuiz = async () => {
			const res = await fetch('/API/quizzes/join', {
				method: 'POST',
				body: JSON.stringify({ quizId: quizCode, uid }),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const quizData = await res.json()
			setLoading(false)
			if (quizData.error) {
				// SpeechRecognition.stopListening()
				setQuizTitle(quizData.error)
				if (quizData.error === 'ERR:QUIZ_NOT_FOUND')
					speak('The quiz you requested was not found.')
				// For Quiz not accessible
				else if (quizData.error === 'ERR:QUIZ_ACCESS_DENIED')
					speak('Access is not granted by the creator.')
				else if (quizData.error === 'ERR:QUIZ_ALREADY_ATTEMPTED')
					speak('You have already attempted this quiz.')
			} else {
				setQuizTitle(quizData.title)
				setQuestions(quizData.questions)

				const temp = quizData.questions.map((question) => {
					return {
						id: question.id,
						title: question.title,
						optionType: question.optionType,
						selectedOptions: []
					}
				})
				setAttemptedQuestions(temp)
			}
		}
		fetchQuiz()
	}, [quizCode, uid])
	const submitQuiz = React.useCallback(async () => {
		// send attemped Questions to backend
		try {
			const res = await fetch('/API/quizzes/submit', {
				method: 'POST',
				body: JSON.stringify({
					uid,
					quizId: quizCode,
					questions: attemptedQuestions
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const body = await res.json()
			setResult(body)
			setShowModal(true)
			if (body.error === 'ERR:QUIZ_ALREADY_ATTEMPTED')
				speak('The Quiz has already been submitted.')
			else
				speak(`Your score is ${body.score} out of ${attemptedQuestions.length}`)
			SpeechRecognition.abortListening()
			console.log('res body : ', body)
		} catch (e) {
			console.log('Error Submitting quiz', e)
		}
	}, [quizCode, attemptedQuestions, uid])

	// Commands UseEffect
	useEffect(() => {
		const selectOption = (option) => {
			const temp = [...attemptedQuestions]
			const options = temp[currentIndex].selectedOptions
			if (!options.includes(option)) {
				if (attemptedQuestions[currentIndex].optionType === 'radio')
					options[0] = option
				else options.push(option)
				temp[currentIndex].selectedOptions = options
				setAttemptedQuestions(temp)
			}
		}
		const speakQuestion = (index) => {
			speak(`Question number ${index + 1}:`)
			speak(questions[index].title)
			let choice =
				questions[index].optionType === 'radio'
					? ' only 1 option.'
					: ' multiple options.'

			speak('You can choose ' + choice)
			questions[index].options.forEach((op, i) => {
				speak(`Option ${i + 1} : ${op.text}`)
			})
		}
		const temp = [
			{
				command: ['reset', 'cancel'],
				callback: () => {
					synthRef.current.cancel()
					resetTranscript()
				}
			},
			{
				command: 'Instructions',
				callback: () => {
					speak(
						'Use the following voice commands to interact with the application. Start Quiz to initialize the quiz. Repeat the current question command to repeat the focused question. Select or choose option number command for choosing the correct option. Next question to move to the next consecutive question and Previous Question to move to the previous consecutive question.'
					)
					resetTranscript()
				}
			},
			{
				command: ['(*) title', '(*) start (*)'],
				callback: () => {
					synthRef.current.cancel()
					speak(`The Quiz title is: ${quizTitle}`)
					speakQuestion(currentIndex)
					resetTranscript()
				},
				matchInterim: true
			},
			{
				command: ['select option :option', 'choose option :option'],
				callback: (option) => {
					synthRef.current.cancel()
					if (
						(option > 0 && option <= questions[currentIndex].options.length) ||
						['for', 'to'].some((op) => op === option)
					) {
						if (option === 'for') option = 4
						else if (option === 'to') option = 2
						console.log('option :' + option)
						speak(
							`You chose option ${option} : ${
								questions[currentIndex].options[option - 1].text
							}`
						)
						selectOption(questions[currentIndex].options[option - 1].text)
					} else if (Number.isInteger(option))
						speak('No such option as ' + option)
					resetTranscript()
				},
				matchInterim: true
			},
			{
				command: '(*) next question',
				callback: () => {
					synthRef.current.cancel()
					if (currentIndex < questions.length - 1) {
						setCurrentIndex(currentIndex + 1)
						speakQuestion(currentIndex + 1)
					} else {
						speak('That was the last Question of the Quiz.')
					}
					resetTranscript()
				},
				matchInterim: true
			},
			{
				command: '(*) previous question',
				callback: () => {
					synthRef.current.cancel()
					if (currentIndex > 0) {
						setCurrentIndex(currentIndex - 1)
						speakQuestion(currentIndex - 1)
					} else {
						speak('That was the first Question of the Quiz.')
					}
					resetTranscript()
				},
				matchInterim: true
			},
			{
				command: 'submit quiz',
				callback: () => {
					if (Object.keys(result).length <= 0) submitQuiz()
					resetTranscript()
				},
				matchInterim: true
			},
			{
				command: ['(*) repeat question :number'],
				callback: (dummy, number) => {
					synthRef.current.cancel()
					if (
						(number > 0 && number <= questions.length) ||
						['for', 'to'].some((op) => op === number)
					) {
						if (number === 'for') number = 4
						else if (number === 'to') number = 2

						setCurrentIndex(number - 1)
						speakQuestion(number - 1)
					} else speak('Question Number not recognized. Kindly repeat it')
					resetTranscript()
				},
				matchInterim: true
			},
			{
				command: [
					'repeat the current question',
					'repeat the question',
					'repeat question'
				],
				callback: () => {
					synthRef.current.cancel()
					speakQuestion(currentIndex)
					resetTranscript()
				},
				matchInterim: true
			}
		]
		setCommands(temp)
	}, [
		quizTitle,
		resetTranscript,
		questions,
		currentIndex,
		attemptedQuestions,
		submitQuiz,
		result
	])

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

	if (loading) return <LoadingScreen />

	// For Quiz not Found
	if (quizTitle === 'ERR:QUIZ_NOT_FOUND') {
		// synthRef.current.cancel()
		// speak('The quiz you requested was not found.')
		// resetTranscript()
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
	}
	// For Quiz not accessible
	else if (quizTitle === 'ERR:QUIZ_ACCESS_DENIED') {
		// speak('Access is not granted by the creator.')
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
	} else if (quizTitle === 'ERR:QUIZ_ALREADY_ATTEMPTED') {
		// speak('You have already attempted this quiz.')
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
	} else
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
												checked={
													attemptedQuestions.length
														? attemptedQuestions[
																index
														  ].selectedOptions.includes(option.text)
														: false
												}
												onChange={(e) =>
													handleOptionSelect(e, option.text, index)
												}
											/>
										) : (
											<input
												type='checkbox'
												name='option'
												checked={
													attemptedQuestions.length
														? attemptedQuestions[
																index
														  ].selectedOptions.includes(option.text)
														: false
												}
												onChange={(e) =>
													handleOptionSelect(e, option.text, index)
												}
											/>
										)}
										<label style={{ padding: '0px 5px' }}>{option.text}</label>
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

export default AttemptBlindQuiz
