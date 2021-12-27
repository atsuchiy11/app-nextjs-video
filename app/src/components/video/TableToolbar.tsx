import * as React from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import {
	GridToolbarColumnsButton,
	GridToolbarFilterButton,
} from '@material-ui/data-grid'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import FilterListIcon from '@material-ui/icons/FilterList'
import ViewColumnIcon from '@material-ui/icons/ViewColumn'

const useStyles = makeStyles((theme: Theme) => ({
	toolbar: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	textField: {
		[theme.breakpoints.down('xs')]: {
			width: '100%',
		},
		margin: theme.spacing(1, 0.5, 1.5),
		'& .MuiSvgIcon-root': {
			marginRight: theme.spacing(0.5),
		},
		'& .MuiInput-underline:before': {
			borderBottom: `1px solid ${theme.palette.divider}`,
		},
	},
}))

interface Props {
	clearSearch: () => void
	onChange: () => void
	value: string
}

export const FilterIcon = () => (
	<FilterListIcon color="action" fontSize="small" />
)
export const ColumnIcon = () => <ViewColumnIcon color="action" />

const TableToolbar: React.FC<Props> = (props) => {
	const classes = useStyles()
	return (
		<Box
			display="flex"
			justifyContent="flex-end"
			alignItems="center"
			className={classes.toolbar}>
			<GridToolbarColumnsButton />
			<GridToolbarFilterButton />
			<TextField
				variant="outlined"
				value={props.value}
				onChange={props.onChange}
				placeholder="Search..."
				className={classes.textField}
				InputProps={{
					startAdornment: <SearchIcon fontSize="small" />,
					endAdornment: (
						<IconButton
							title="clear"
							aria-label="clear"
							size="small"
							style={{
								visibility: props.value ? 'visible' : 'hidden',
							}}
							onClick={props.clearSearch}>
							<ClearIcon fontSize="small" />
						</IconButton>
					),
				}}
			/>
		</Box>
	)
}
export default TableToolbar
