import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import { Button } from "@material-ui/core"
import AddQuestionCard from "../components/AddQuestionCard"

const useStyles = makeStyles((theme) => ({
	root: {
		margin: "10px",
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		// border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	buttons: {
		display: "flex",
		justifyContent: "flex-end",
	},
	button: {
		margin: "5px",
	},
}))

export default function AddQuestionModal() {
	const classes = useStyles()
	const [open, setOpen] = React.useState(false)

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<div className={classes.root}>
			<Button color="secondary" variant="contained" onClick={handleOpen}>
				Add Question
			</Button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				// closeAfterTransition
				disableEnforceFocus={true}
				// BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<div className={classes.paper}>
					<AddQuestionCard />
					<div className={classes.buttons}>
						<Button
							className={classes.button}
							variant="contained"
							onClick={handleClose}
						>
							Close
						</Button>
						<Button
							className={classes.button}
							color="secondary"
							variant="contained"
							onClick={handleClose}
						>
							Add Question
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	)
}
