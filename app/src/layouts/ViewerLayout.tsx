import * as React from 'react'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import { useSession } from 'next-auth/client'

import SideMenu from 'src/components/layouts/SideMenu'
import HeaderMenu from 'src/components/layouts/HeaderMenu'

import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'

const drawerWidth = 280
const useStyles = makeStyles((theme: Theme) => ({
	root: { display: 'flex' },
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	drawerPaper: {
		width: drawerWidth,
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	content: {
		// drawerのwidthだけoffset
		width: `calc(100% - ${drawerWidth}px)`,
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}))

interface Props {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window?: () => Window
}

const ViewerLayout: React.FC<Props> = (props) => {
	const [session, loading] = useSession()
	const { window, children } = props
	const classes = useStyles()
	const theme = useTheme()

	/** control mobile menu */
	const [mobileOpen, setMobileOpen] = React.useState(false)
	const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

	const container =
		window !== undefined ? () => window().document.body : undefined

	/** validate */
	if (loading) return <div>Loading...</div>

	return (
		<div className={classes.root}>
			<HeaderMenu handler={handleDrawerToggle} />
			{session && (
				<>
					<div className={classes.toolbar} />
					<nav
						className={classes.drawer}
						aria-label="mailbox folders">
						{/* smUp=600pxで非表示 */}
						<Hidden smUp implementation="css">
							<Drawer
								container={container}
								variant="temporary"
								anchor={
									theme.direction === 'rtl' ? 'right' : 'left'
								}
								open={mobileOpen}
								onClose={handleDrawerToggle}
								classes={{
									paper: classes.drawerPaper,
								}}
								ModalProps={{
									keepMounted: true,
								}}>
								<SideMenu />
							</Drawer>
						</Hidden>
						{/* xsDown=0px以上で表示 */}
						<Hidden xsDown implementation="css">
							<Drawer
								classes={{ paper: classes.drawerPaper }}
								variant="permanent"
								open>
								<SideMenu />
							</Drawer>
						</Hidden>
					</nav>
					<main className={classes.content}>
						<div className={classes.toolbar} />
						{children}
					</main>
				</>
			)}
			{!session && (
				<div
					style={{
						backgroundImage: 'url(/03.png)',
						backgroundSize: 'cover',
						width: '100%',
						height: '100vh',
						backgroundPosition: 'center',
					}}></div>
			)}
		</div>
	)
}
export default ViewerLayout
