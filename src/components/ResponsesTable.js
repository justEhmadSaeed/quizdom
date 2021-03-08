import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: '#d81e5b',
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow)

function createData({ name, email, score }) {
	return { name, email, score }
}

const useStyles = makeStyles({
	table: {
		minWidth: 500,
	},
	paper: {
		borderRadius: 15,
	},
})

export default function ResponsesTable({ responses }) {
	const classes = useStyles()
	const rows = responses.map((resp) => createData(resp))
	return (
		<TableContainer className={classes.paper} component={Paper}>
			<Table className={classes.table} aria-label='customized table'>
				<TableHead>
					<TableRow>
						<StyledTableCell>Name</StyledTableCell>
						<StyledTableCell align='center'>Email Address</StyledTableCell>
						<StyledTableCell align='right'>Score</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<StyledTableRow key={row.name}>
							<StyledTableCell component='th' scope='row'>
								{row.name}
							</StyledTableCell>
							<StyledTableCell align='center'>{row.email}</StyledTableCell>
							<StyledTableCell align='right'>{row.score}</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
