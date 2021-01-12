import React from "react"
import Sidebar from "./Sidebar"

const Appbar = ({ user }) => {
	return (
		<div className="appbar">
			<div className="hamburger-menu-sidebar">
				<Sidebar />
			</div>
		</div>
	)
}

export default Appbar
