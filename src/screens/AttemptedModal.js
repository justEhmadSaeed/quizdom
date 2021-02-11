import React, { useState, useEffect } from "react"
import { Modal } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
	root: {
		// margin: "10px",
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(10, 10),
		borderRadius: "20px",
		// display:"flex",
		// alignItems:"center",
	},
	buttons: {
		display: "flex",
		justifyContent: "flex-end",
	},
}))

const AttemptedModal = ({ result, totalScore, showModal }) => {
	const classes = useStyles()
	const [open, setOpen] = useState(showModal)

	useEffect(() => {
		setOpen(showModal)
	}, [showModal])

	return (
		<div className={classes.root}>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				disableEnforceFocus={true}
			>
				<div className={classes.paper}>
					<h2>Quiz Attempted Successfully.</h2>
					<h1 className="score_h2">
						{result.error
							? "Not Submitted ! "
							: `Score: ${result.score}/${totalScore}`}
					</h1>
					<Link to={"/dashboard"}>
						<button className="button wd-200">Dashboard</button>
					</Link>
				</div>
			</Modal>
		</div>
	)
}

export default AttemptedModal
