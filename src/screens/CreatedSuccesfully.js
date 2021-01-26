import React, { useState } from "react"
import { Link } from "react-router-dom"
import "./CreatedSuccesfully.css"
import { CopyToClipboard } from "react-copy-to-clipboard"

const CreatedSuccesfully = ({ user }) => {
	const [Code, setCode] = useState("AsdqweRfgZ")
	const [Copy, setCopy] = useState("copy")
	return (
		<div id="created-quiz">
			<div id="created-quiz-div">
				<div id="message">
					<h2 className="b">Quiz Created Successfully!</h2>
					<p>Share the follwong code with your students</p>
				</div>
				<input
					id={Copy}
					type="text"
					value={Code}
					disabled={true}
					onChange={(e) => setCode(e.target.value)}
				/>
				<CopyToClipboard
					text={Code}
					onCopy={() => {
						setCopy("copied")
					}}
				>
					<button className="button wd-200">
						{Copy === "copy" ? "Copy Code" : "Code Copied!"}
					</button>
				</CopyToClipboard>
				<Link to={"/dashboard"}>
					<button className="button wd-200">Dashboard</button>
				</Link>
			</div>
		</div>
	)
}
export default CreatedSuccesfully
