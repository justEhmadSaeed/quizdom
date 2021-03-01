import React, { useEffect, useState } from 'react'
import LoadingScreen from './LoadingScreen'
import firebase from '../firebase/firebase'

const Responses = ({ match }) => {
	const quizId = match.params.quizCode
	const uid = firebase.auth().currentUser.uid
	const [loading, setLoading] = useState(true)
	const [responses, setResponses] = useState([])

	useEffect(() => {
		const getResponses = async () => {
			const res = await fetch('/API/quizzes/responses', {
				method: 'POST',
				body: JSON.stringify({ quizCode: quizId, uid }),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const result = await res.json()
			console.log(result)
			setResponses(result.finalResponse)
			setLoading(false)
		}
		getResponses()
	}, [quizId, uid])
	console.log(responses)
	if (loading) return <LoadingScreen />
	else
		return (
			<div className="margin-top">
				<h2>Responses</h2>
				<table className="response-table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email Address</th>
							<th>Score</th>
						</tr>
					</thead>
					<tbody>
						{responses.map((resp, key) => (
							<tr key={key}>
								<td>{resp.name}</td>
								<td>{resp.email}</td>
								<td>{resp.score}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
}

export default Responses
