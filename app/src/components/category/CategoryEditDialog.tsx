import React, { useState, useEffect } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { Category } from 'src/interfaces/api'
import useCategoryEdit from 'src/components/category/useCategoryEdit'
import { useCategories } from 'src/foundations/hooks'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme: Theme) => ({
	margin: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}))

interface Props {
	selectedRow: Category
	open: boolean
	handler: (value: React.SetStateAction<boolean>) => void
}

const CategoryEditDialog: React.FC<Props> = (props) => {
	const classes = useStyles()
	const { selectedRow, open, handler } = props

	const [categoryProps] = useCategoryEdit(selectedRow, handler)

	/** load cache */
	const { data: categories, error: categoryError } = useCategories()

	/** dialog state */
	const [openDialog, setOpenDialog] = useState(open)

	/** Parent state wather */
	useEffect(() => setOpenDialog(open), [open])

	if (categoryProps.error || categoryError)
		return <div>failed to load categories.</div>
	if (!categories) return <div>loading...</div>

	return (
		<Dialog
			fullWidth
			maxWidth="sm"
			open={openDialog}
			onClose={() => handler((value) => !value)}>
			<DialogTitle id="category-edit-dialog">
				<Grid
					container
					className={classes.margin}
					justify="space-between"
					alignItems="center">
					カテゴリの編集
					<Button
						id="category-edit-invalid"
						variant="contained"
						color={
							categoryProps.state.invalid ? 'default' : 'primary'
						}
						onClick={categoryProps.handleInvalid}>
						{categoryProps.state.invalid ? '非公開' : '公開中'}
					</Button>
				</Grid>
			</DialogTitle>
			{/* <div>{JSON.stringify(category)}</div> */}
			<DialogContent>
				<Grid
					container
					justify="center"
					alignItems="center"
					direction="column">
					<Grid container justify="center" alignItems="center">
						<TextField
							id="category-edit-name"
							label="カテゴリ名"
							color="primary"
							variant="outlined"
							value={
								categoryProps.state.name
									? categoryProps.state.name
									: ''
							}
							onChange={categoryProps.handleInput}
							style={{ width: '50%' }}
							className={classes.margin}
						/>
						<TextField
							id="category-edit-parent"
							select
							label="親カテゴリ"
							color="primary"
							variant="outlined"
							value={
								categoryProps.state.parent
									? categoryProps.state.parent
									: ''
							}
							onChange={categoryProps.handlePrimary}
							style={{ width: '50%' }}>
							{categories.map((item) => {
								if (!item.parent) {
									return (
										<MenuItem
											key={item.id}
											value={item.name}>
											{item.name}
										</MenuItem>
									)
								}
							})}
						</TextField>
					</Grid>
					<TextField
						id="category-edit-description"
						label="概要"
						variant="outlined"
						fullWidth
						value={
							categoryProps.state.description
								? categoryProps.state.description
								: ''
						}
						onChange={categoryProps.handleInput}
						multiline
						rows={2}
						className={classes.margin}
					/>
					<TextField
						id="category-edit-note"
						label="備考"
						variant="outlined"
						fullWidth
						value={
							categoryProps.state.note
								? categoryProps.state.note
								: ''
						}
						onChange={categoryProps.handleInput}
						className={classes.margin}
					/>
				</Grid>
			</DialogContent>
			<DialogActions className={classes.margin}>
				<Button
					onClick={() => categoryProps.handleSubmit(false)}
					color="primary">
					キャンセル
				</Button>
				<Button
					onClick={() => categoryProps.handleSubmit(true)}
					color="primary">
					OK
				</Button>
			</DialogActions>
		</Dialog>
	)
}
export default CategoryEditDialog
