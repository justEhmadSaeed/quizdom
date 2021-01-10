import React, { useEffect } from "react"
import "./Home.css"
import { StyledFirebaseAuth } from "react-firebaseui"
import firebase from "../firebase/firebase"

const Home = ({ setUser }) => {
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
			// setIsLoggedIn(!!user)
			if (user) {
				setUser({
					id: firebase.auth().currentUser.uid,
					name: firebase.auth().currentUser.displayName,
				})
				console.log("User Logged In")
			} else {
				console.log("User Signed Out")
				setUser({})
			}
		})
	}, [setUser])
	return (
		<div id="Home">
			<div id="logo">
				<div id="logo-name">
					<b>Quiz</b>dom
				</div>
				<div id="description">
					Now create and join quiz at a single platform.You can create trivia
					quizzes, personality test, polls and survays. Share out your quiz with
					your students with a unique code.
				</div>
			</div>

			<span id="login-card">
				<label>
					<b>Q</b>
				</label>
				<div className="Home">
					<StyledFirebaseAuth
						borderRadius="40px"
						uiConfig={uiConfig}
						firebaseAuth={firebase.auth()}
					/>
				</div>
			</span>
		</div>
	)
}

export default Home
