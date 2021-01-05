import { Switch, Route, Link } from "react-router-dom"
import React, { useState, useEffect } from "react"
import firebase from "./firebase/firebase"
import { StyledFirebaseAuth } from "react-firebaseui"

// Stylesheet
import "./App.css"

// Components
import Home from "./screens/Home"
import OneTimeDashBoard from "./screens/OneTimeDashboard"
import CreateQuiz from "./screens/CreateQuiz"
import JoinQuiz from "./screens/JoinQuiz"
import UserDashboard from "./screens/UserDashboard"
import CreatedSuccesfully from "./screens/CreatedSuccesfully"

const App = () => {
	const [User, setUser] = useState({ name: "", id: "" })
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	var uiConfig = {
		signInflow: "popup",
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.FacebookAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID,
		],
		callbacks: {
			signInSuccessWithAuthResult: () => false,
		},
	}
	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			setIsLoggedIn(!!user)
			if (user) {
				setUser({
					id: firebase.auth().currentUser.uid,
					name: firebase.auth().currentUser.displayName,
				})
				console.log("Firebase User - ", user)
			}
		})
	}, [])

	return (
		<div className="App">
			{!firebase.auth().currentUser ? (
				<div className="Home">
					<StyledFirebaseAuth
						borderRadius="40px"
						uiConfig={uiConfig}
						firebaseAuth={firebase.auth()}
					/>
				</div>
			) : (
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
				</Switch>
			)}
		</div>
	)
}

export default App
