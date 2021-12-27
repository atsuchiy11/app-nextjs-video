import React, { useEffect } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import useCategoryCreate from 'src/components/category/useCategoryCreate'
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
	open: boolean
	handler: (value: React.SetStateAction<boolean>) => void
}

const CategoryCreateDialog: React.FC<Props> = (props) => {
	const classes = useStyles()
	const { open, handler } = props

	/** load state */
	const [categoryProps, error] = useCategoryCreate(handler)

	/** load cache */
	const { data: categories, error: categoryError } = useCategories()

	/** dialog state */
	const [openDialog, setOpenDialog] = React.useState(open)

	/** Parent state wather */
	useEffect(() => setOpenDialog(open), [open])

	/** validate */
	if (categoryProps.error || categoryError)
		return <div>failed to load categories.</div>
	if (!categoryProps.state || !categories) return <div>loading...</div>

	return (
		<Dialog
			fullWidth
			maxWidth="sm"
			open={openDialog}
			onClose={() => handler((value) => !value)}>
			<DialogTitle id="category-create-dialog">
				カテゴリの登録
			</DialogTitle>
			<DialogContent>
				<Grid
					container
					justify="center"
					alignItems="center"
					direction="column">
					<Grid container justify="center" alignItems="center">
						<TextField
							id="category-create-name"
							label="カテゴリ名"
							color="primary"
							variant="outlined"
							value={
								categoryProps.state.name
									? categoryProps.state.name
									: ''
							}
							onChange={categoryProps.handleInput}
							error={error.title}
							style={{ width: '50%' }}
							className={classes.margin}
							required
						/>
						<TextField
							id="category-create-parent"
							select
							label="親カテゴリ"
							color="primary"
							variant="outlined"
							value={
								categoryProps.state.parent
									? categoryProps.state.parent
									: ''
							}
							onChange={categoryProps.handleParent}
							error={error.parent}
							style={{ width: '50%' }}
							required>
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
						id="category-create-description"
						label="概要"
						variant="outlined"
						fullWidth
						value={
							categoryProps.state.description
								? categoryProps.state.description
								: ''
						}
						onChange={categoryProps.handleInput}
						error={error.description}
						multiline
						rows={2}
						className={classes.margin}
						required
					/>
					<TextField
						id="category-create-note"
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
export default CategoryCreateDialog
