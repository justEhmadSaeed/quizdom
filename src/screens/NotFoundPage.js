import { Link } from "react-router-dom"
import React from "react"

const NotFoundPage = () => {
	return (
		<div className="loading">
			<h1>404 Page Not Found!</h1>
			<div id="logo-name">
				<b>Quiz</b>dom
			</div>
			<h3>
				Who told you to mess up with the URL? <Link to="/">Click here</Link> and
				Go back to the Dashboard.
			</h3>
		</div>
	)
}

export default NotFoundPage
