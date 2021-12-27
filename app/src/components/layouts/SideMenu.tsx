import * as React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Link from 'next/link'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import HomeIcon from '@material-ui/icons/Home'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import FolderIcon from '@material-ui/icons/Folder'
import FolderOpenIcon from '@material-ui/icons/FolderOpen'
import DescriptionIcon from '@material-ui/icons/Description'
import ViewStreamIcon from '@material-ui/icons/ViewStream'
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay'
import FavoriteIcon from '@material-ui/icons/Favorite'
import HistoryIcon from '@material-ui/icons/History'
import LightTooltip from 'src/atoms/LightTooltip'

import { getCategories, getPaths } from 'src/data/fetcher'
import { Category } from 'src/interfaces/api'
import { useAppContext } from 'src/foundations/AppProvider'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	primary: {
		paddingLeft: theme.spacing(2),
		'& .MuiTypography-root': {
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			overflowX: 'hidden',
		},
	},
	secondary: {
		paddingLeft: theme.spacing(4),
		'& .MuiTypography-root': {
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			overflowX: 'hidden',
		},
	},
	contact: {
		marginTop: 'auto',
		margin: theme.spacing(2),
	},
	copyright: {
		color: theme.palette.text.disabled,
		marginTop: 'auto',
		margin: theme.spacing(2),
	},
}))

interface Props {
	primary: Category
	index: number
	categories: Category[]
}

const NestedList: React.FC<Props> = (props) => {
	const classes = useStyles()
	const router = useRouter()
	const { dispatch } = useAppContext()
	const { primary, index, categories } = props

	/** expand nested category */
	const [openNestCategory, setOpenNestCategory] = React.useState([
		true,
		false,
		false,
		false,
		false,
	])
	const handleNestCategory = (index: number) => {
		const newState = openNestCategory.map((bool, i) => {
			if (i == index) bool = !bool
			return bool
		})
		setOpenNestCategory(newState)
	}

	/** filter videos by nested category */
	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const currentCategory = event.currentTarget.getAttribute('aria-label')
		dispatch({
			searchCategory: { payload: currentCategory },
			prevAction: { payload: 'searchCategory' },
		})
		if (router.pathname == '/player/[id]')
			router.push({ pathname: '/', query: { from: 'player' } })
	}

	return (
		<Box key={primary.SK} className={classes.primary}>
			<ListItem button onClick={() => handleNestCategory(index)}>
				<ListItemIcon>
					{openNestCategory[index] ? (
						<FolderOpenIcon />
					) : (
						<FolderIcon />
					)}
				</ListItemIcon>
				<ListItemText primary={primary.name} />
			</ListItem>
			<Collapse in={openNestCategory[index]} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{categories.map((secondary) => {
						if (primary.SK == secondary.parentId) {
							return (
								<LightTooltip
									title={secondary.name}
									placement="right"
									key={secondary.SK}>
									<ListItem
										button
										className={classes.secondary}
										aria-label={secondary.PK}
										onClick={handleClick}>
										<ListItemIcon>
											<DescriptionIcon />
										</ListItemIcon>
										<ListItemText
											primary={secondary.name}
										/>
									</ListItem>
								</LightTooltip>
							)
						}
					})}
				</List>
			</Collapse>
		</Box>
	)
}

const SideMenu: React.FC = () => {
	const classes = useStyles()
	const router = useRouter()
	const { dispatch } = useAppContext()
	let parent_index = -1

	/** load cache */
	const { data: paths, error: pathError } = useSWR('/paths', getPaths)
	const { data: categories, error: categoryError } = useSWR(
		'/categories',
		getCategories
	)

	/** route home */
	const handleHome = () => {
		/** reset filter */
		dispatch({
			searchTag: { payload: 'ALL' },
			searchCategory: { payload: 'ALL' },
			prevAction: { payload: '' },
		})
		if (router.pathname == '/player/[id]')
			router.push({ pathname: '/', query: { from: 'player' } })
	}

	/** expand list */
	const [openCategory, setOpenCategory] = React.useState(true)
	const [openLearningPath, setOpenLearningPath] = React.useState(true)
	const handleCategory = () => setOpenCategory(!openCategory)
	const handleLearningPath = () => setOpenLearningPath(!openLearningPath)

	/** filter videos by history */
	const handleHistory = () => {
		dispatch({ prevAction: { payload: 'history' } })
		if (router.pathname == '/player/[id]')
			router.push({ pathname: '/', query: { from: 'player' } })
	}

	/** filter videos by favorite */
	const handleFavorite = () => {
		dispatch({ prevAction: { payload: 'favorite' } })
		if (router.pathname == '/player/[id]')
			router.push({ pathname: '/', query: { from: 'player' } })
	}

	/** open show more */
	const defaultExpandNum = 3
	const [expandNum, setExpandNum] = React.useState(defaultExpandNum)
	const handleShowMore = () => {
		if (expandNum > defaultExpandNum) setExpandNum(defaultExpandNum)
		else setExpandNum(paths.length)
	}

	/** validate */
	if (pathError) return <div>failed to load paths.</div>
	if (categoryError) return <div>failed to load categories.</div>
	if (!paths || !categories) return <div>loading...</div>

	return (
		<Box className={classes.root}>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				<ListItem button onClick={handleHome}>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="ホーム" />
				</ListItem>
				<List>
					<ListItem button onClick={handleFavorite}>
						<ListItemIcon>
							<FavoriteIcon />
						</ListItemIcon>
						<ListItemText primary="お気に入り" />
					</ListItem>
					<ListItem button onClick={handleHistory}>
						<ListItemIcon>
							<HistoryIcon />
						</ListItemIcon>
						<ListItemText primary="閲覧履歴" />
					</ListItem>
				</List>
			</List>
			<Divider />
			<List>
				<ListItem button onClick={handleCategory}>
					<ListItemIcon>
						<AccountTreeIcon />
					</ListItemIcon>
					<ListItemText primary="カテゴリ" />
					{openCategory ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={openCategory} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{categories.map((primary) => {
							if (primary.parentId == 'C999') {
								parent_index++
								return (
									<NestedList
										key={primary.SK}
										primary={primary}
										index={parent_index}
										categories={categories}
									/>
								)
							}
						})}
					</List>
				</Collapse>
				<Divider />
				<List>
					<ListItem button onClick={handleLearningPath}>
						<ListItemIcon>
							<PlaylistPlayIcon />
						</ListItemIcon>
						<ListItemText primary="再生リスト" />
						{openLearningPath ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse
						in={openLearningPath}
						timeout="auto"
						unmountOnExit>
						<List component="div" disablePadding>
							{paths.slice(0, expandNum).map((item, index) => {
								/** if playlist is empty, skip */
								if (item.videos.length > 0 && !item.invalid) {
									const leadVideoId =
										item.videos[0].uri.split('/')[2]
									return (
										<Box
											key={index}
											className={classes.primary}>
											<Link
												href={`/player/${leadVideoId}?list=${item.SK}`}>
												<LightTooltip
													title={item.name}
													placement="right">
													<ListItem button>
														<ListItemIcon>
															<ViewStreamIcon />
														</ListItemIcon>
														<ListItemText
															primary={item.name}
														/>
													</ListItem>
												</LightTooltip>
											</Link>
										</Box>
									)
								}
							})}
							<Box className={classes.primary}>
								<ListItem
									button
									key={paths.length + 1}
									onClick={handleShowMore}>
									<ListItemIcon>
										{expandNum > defaultExpandNum ? (
											<ExpandLess />
										) : (
											<ExpandMore />
										)}
									</ListItemIcon>
									<ListItemText
										primary={
											expandNum > defaultExpandNum
												? '折りたたむ'
												: 'もっと見る'
										}
									/>
								</ListItem>
							</Box>
						</List>
					</Collapse>
				</List>
			</List>
			<Typography variant="caption" className={classes.contact}>
				{/* {`【こちらは開発環境です】`} */}
				{`【お問い合わせは＋DM室チャットまで】`}
			</Typography>
			<Typography
				variant="caption"
				className={classes.copyright}
				gutterBottom>
				{`© 2006-${new Date().getFullYear()} PRIME X Co., Ltd.`}
			</Typography>
		</Box>
	)
}
export default SideMenu
