import * as React from 'react'
import Link from 'next/link'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import DashboardIcon from '@material-ui/icons/Dashboard'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay'
import FeaturedVideoIcon from '@material-ui/icons/FeaturedVideo'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	nested: {
		paddingLeft: theme.spacing(4),
	},
	copyright: {
		color: theme.palette.text.disabled,
		marginTop: 'auto',
		margin: theme.spacing(2),
	},
}))

const ManageMenu: React.FC = () => {
	const classes = useStyles()
	const [openPlaylist, setOpenPlaylist] = React.useState(false)
	const handlePlaylist = () => setOpenPlaylist(!openPlaylist)

	return (
		<Box className={classes.root}>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				<Link href="/admin">
					<ListItem button>
						<ListItemIcon>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText primary="ダッシュボード" />
					</ListItem>
				</Link>
				<Divider />
				<Link href="/admin/video">
					<ListItem button>
						<ListItemIcon>
							<VideoLibraryIcon />
						</ListItemIcon>
						<ListItemText primary="動画コンテンツ" />
					</ListItem>
				</Link>
				<Link href="/admin/tag">
					<ListItem button>
						<ListItemIcon>
							<LocalOfferIcon />
						</ListItemIcon>
						<ListItemText primary="タグ" />
					</ListItem>
				</Link>
				<Link href="/admin/category">
					<ListItem button>
						<ListItemIcon>
							<AccountTreeIcon />
						</ListItemIcon>
						<ListItemText primary="カテゴリ" />
					</ListItem>
				</Link>
				<Link href="/admin/playlist">
					<ListItem button onClick={handlePlaylist}>
						<ListItemIcon>
							<PlaylistPlayIcon />
						</ListItemIcon>
						<ListItemText primary="再生リスト" />
					</ListItem>
				</Link>
				<Link href="/admin/banner">
					<ListItem button>
						<ListItemIcon>
							<FeaturedVideoIcon />
						</ListItemIcon>
						<ListItemText primary="バナー" />
					</ListItem>
				</Link>
				<Divider />
				<Link href="/admin/user">
					<ListItem button>
						<ListItemIcon>
							<PeopleAltIcon />
						</ListItemIcon>
						<ListItemText primary="ユーザ" />
					</ListItem>
				</Link>
			</List>
			<Typography
				variant="caption"
				className={classes.copyright}
				gutterBottom>
				{`© 2006-${new Date().getFullYear()} PRIME X Co., Ltd.`}
			</Typography>
		</Box>
	)
}
export default ManageMenu
