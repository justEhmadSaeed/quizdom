import { Switch, Route } from "react-router-dom"
import React, { useState, useEffect } from "react"
import firebase from "./firebase/firebase"

// Stylesheet
import "./App.css"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
// Components
import Home from "./screens/Home"
import OneTimeDashBoard from "./screens/OneTimeDashboard"
import CreateQuiz from "./screens/CreateQuiz"
import JoinQuiz from "./screens/JoinQuiz"
import UserDashboard from "./screens/UserDashboard"
import CreatedSuccesfully from "./screens/CreatedSuccesfully"
import NotFoundPage from "./screens/NotFoundPage"
import AttemptQuiz from "./screens/AttemptQuiz"
import Attempted from "./screens/Attempted"
import Appbar from "./components/Appbar"
const data = require("./Data.json")

const App = () => {
	const [User, setUser] = useState({})
	useEffect(() => {
		const createUserInDB = async () => {
			if (User.uid)
				if (
					firebase.auth().currentUser.metadata.lastSignInTime ===
					firebase.auth().currentUser.metadata.creationTime
				) {
					try {
						const result = await fetch("/API/users/create", {
							method: "POST",
							body: JSON.stringify({ uid: User.uid, name: User.name }),
							headers: {
								"Content-Type": "application/json",
							},
						})
						console.log("posted");
						const body = await result.json()
					} catch (error) {
						console.log("User Creation Error: ", error)
					}
				}
		}
		createUserInDB()
	}, [User])

	return (
		<div className="App">
			{!firebase.auth().currentUser ? (
				<Home setUser={setUser} />
			) : (
				<>
					<div>
						<Appbar user={User} setUser={setUser} />
					</div>
					<Switch>
						<Route exact path="/">
							<OneTimeDashBoard user={User} />
						</Route>
						<Route path="/dashboard">
							<UserDashboard user={User} />
						</Route>
						<Route path="/create-quiz">
							<CreateQuiz user={User} />
						</Route>
						<Route path="/created-succesfully">
							<CreatedSuccesfully user={User} />
						</Route>
						<Route path="/join-quiz">
							<JoinQuiz user={User} />
						</Route>
						<Route path="/attempt-quiz">
							<AttemptQuiz
								questions={data.questions}
								user={User}
								quizTitle={data.title}
							/>
						</Route>
						<Route path="/quiz-attempted">
							<Attempted user={User} />
						</Route>
						<Route component={NotFoundPage} />
					</Switch>
				</>
			)}
		</div>
	)
}

export default App
