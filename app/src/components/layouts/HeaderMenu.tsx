import * as React from 'react'
import _ from 'lodash'
import Image from 'next/image'
import { fade, makeStyles, Theme } from '@material-ui/core/styles'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

import UserConfig from 'src/atoms/UserConfig'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import { useAppContext } from 'src/foundations/AppProvider'
import { Box } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
	appBar: {
		[theme.breakpoints.up('sm')]: {
			// width: `calc(100% - ${drawerWidth}px)`,
			// marginLeft: drawerWidth,
			width: '100%',
			'& .MuiToolbar-gutters': {
				paddingLeft: 0,
				paddingRight: 0,
			},
			paddingLeft: theme.spacing(1),
			paddingRight: theme.spacing(1),
		},
		backgroundColor: theme.palette.primary.dark,
		// appbarがdrawerより上
		zIndex: theme.zIndex.drawer + 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	title: {
		[theme.breakpoints.up('sm')]: {
			display: 'flex',
			alignItems: 'center',
		},
		display: 'none',
		'& .MuiButton-root:hover': {
			textDecoration: 'none',
			backgroundColor: 'rgba(255, 255, 255, 0)',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '20ch',
		},
	},
	grow: { flexGrow: 1 },
	sectionDesktop: {
		display: 'flex',
		// display: 'none',
		// [theme.breakpoints.up('sm')]: {
		// 	display: 'flex',
		// },
	},
}))

interface Header {
	// handle side menu
	handler: () => void
}

const HeaderMenu: React.FC<Header> = ({ handler }) => {
	const [session, loading] = useSession()
	const { dispatch } = useAppContext()
	const classes = useStyles()
	const router = useRouter()

	/** reload */
	const handleClick = () => router.push(router.asPath)

	/** handle search box */
	const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.keyCode == 13) {
			const input = event.target as HTMLInputElement
			dispatch({
				searchWord: { payload: input.value },
				prevAction: { payload: 'searchWord' },
			})
			if (router.pathname == '/player/[id]')
				router.push({ pathname: '/', query: { from: 'player' } })
		}
	}

	/** validate */
	if (loading) return <div>Loading...</div>

	return (
		<AppBar position="fixed" className={classes.appBar}>
			<Toolbar>
				{session && (
					<>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handler}
							className={classes.menuButton}>
							<MenuIcon />
						</IconButton>
						<Box className={classes.title}>
							<Button onClick={handleClick}>
								<Image
									src={
										router.asPath.startsWith('/admin')
											? '/02-flat-red.png'
											: '/02-flat-blue.png'
									}
									width={162}
									height={26}
								/>
							</Button>
						</Box>
					</>
				)}
				{session && (
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search..."
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
							onKeyDown={handleEnter}
						/>
					</div>
				)}
				<div className={classes.grow} />
				{!session && (
					<Button
						variant="outlined"
						color="primary"
						startIcon={<AccountCircleIcon />}
						onClick={() => signIn()}>
						ログイン
					</Button>
				)}
				{session && <UserConfig signOut={signOut} session={session} />}
			</Toolbar>
		</AppBar>
	)
}
export default HeaderMenu
