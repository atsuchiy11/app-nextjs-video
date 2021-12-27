import * as React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import { animateScroll as scroll } from 'react-scroll'
import { useAppContext } from 'src/foundations/AppProvider'
import { useTags } from 'src/foundations/hooks'

const useStyles = makeStyles((theme: Theme) => ({
	wraper: {
		'& .MuiBox-root::-webkit-scrollbar': {
			display: 'none',
		},
		display: 'flex',
	},
	root: {
		display: 'flex',
		overflowX: 'auto',
	},
	tag: {
		margin: theme.spacing(0.5),
		backgroundColor: theme.palette.background.paper,
	},
	divider: {
		margin: theme.spacing(1),
	},
}))

const TagGridList: React.FC = () => {
	const classes = useStyles()
	const { dispatch } = useAppContext()

	/** load cache */
	const { data: tags, loading: tagLoading, error: tagError } = useTags()

	if (tagLoading) return <div>loading...</div>
	if (tagError) return <div>failed to load tags.</div>

	/** global state selected tag */
	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const currentTag = event.currentTarget.getAttribute('aria-label')
		dispatch({
			searchTag: { payload: currentTag },
			prevAction: { payload: 'searchTag' },
		})
	}

	/** scroll control */
	const handleScroll = (positive: boolean) => {
		const scrollAmount = 800
		let toX: number
		if (positive) toX = scrollAmount
		else toX = -1 * scrollAmount

		scroll.scrollMore(toX, {
			horizontal: true,
			containerId: 'chips-wraper',
			smooth: true,
			duration: 400,
		})
	}

	return (
		<>
			<Box className={classes.wraper}>
				<IconButton
					size="small"
					onClick={() => handleScroll(false)}
					data-testid="arrow-icon">
					<ArrowBackIosIcon fontSize="small" />
				</IconButton>
				<Box className={classes.root} id="chips-wraper">
					<Chip
						label="すべて"
						data-testid="chip"
						aria-label="ALL"
						color="primary"
						className={classes.tag}
						onClick={handleClick}
					/>
					{tags.map((tag) => {
						if (!tag.invalid) {
							return (
								<Chip
									key={tag.PK}
									label={tag.name}
									data-testid="chip"
									aria-label={tag.PK}
									color="primary"
									className={classes.tag}
									onClick={handleClick}
								/>
							)
						}
					})}
				</Box>
				<IconButton
					size="small"
					onClick={() => handleScroll(true)}
					data-testid="arrow-icon">
					<ArrowForwardIosIcon fontSize="small" />
				</IconButton>
			</Box>
			<Divider className={classes.divider} />
		</>
	)
}
export default TagGridList
