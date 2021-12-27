import * as React from 'react'
import Chip from '@material-ui/core/Chip'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

import { GridRowData } from '@material-ui/data-grid'

interface Props {
	row: GridRowData
}

const BannerReleaseChip: React.FC<Props> = ({ row }) => {
	const [open, setOpen] = React.useState(false)

	const handleClickOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const [value, setValue] = React.useState(row.invalid as boolean)
	const handleChange = (_: React.ChangeEvent<HTMLInputElement>) => {
		// setValue((event.target as HTMLInputElement).value)
		setValue(!value)
	}

	return (
		<>
			<Chip
				label={!row.invalid ? '公開中' : '非公開'}
				color={!row.invalid ? 'primary' : 'default'}
				onClick={handleClickOpen}
			/>
			<Dialog open={open} onClose={handleClose}>
				<DialogContent>
					<DialogTitle id="change-release">公開設定</DialogTitle>
					<DialogContentText>
						バナーの公開/非公開を切り替えます
					</DialogContentText>
					<FormControl component="fieldset">
						<RadioGroup
							name="invalid"
							value={value ? '公開中' : '非公開'}
							onChange={handleChange}>
							<FormControlLabel
								value="公開中"
								control={<Radio />}
								label="公開中"
							/>
							<FormControlLabel
								value="非公開"
								control={<Radio />}
								label="非公開"
							/>
						</RadioGroup>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						キャンセル
					</Button>
					<Button onClick={handleClose} color="primary">
						OK
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
export default BannerReleaseChip
