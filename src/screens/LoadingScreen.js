import React from "react"
import Loader from "react-loader-spinner"
import "./LoadingScreen.css"
const LoadingScreen = () => {
	return (
		<div className="loading">
			<div id="logo-name">
				<b>Quiz</b>dom
			</div>
			{/* <Loader color="#29455a" width={130} height={130}  type="audio" /> */}
			<Loader color="#29455a" width={130} height={130}  type="BallTriangle" />
			{/* <Loader color="#29455a" width={130} height={130}  type="Puff" /> */}
			{/* <Loader color="#29455a" width={130} height={130} type="Bars" /> */}
			{/* <Loader color="#29455a" width={130} height={130}  type="Circles" /> */}
		</div>
	)
}
export default LoadingScreen
