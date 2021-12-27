import * as React from 'react'

import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import HomeIcon from '@material-ui/icons/Home'
import HelpIcon from '@material-ui/icons/Help'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { Session } from 'next-auth'

interface Props {
	signOut: () => void
	session: Session
}

const UserConfig: React.FC<Props> = ({ signOut, session }) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) =>
		setAnchorEl(event.currentTarget)
	const handleCloseMenu = () => setAnchorEl(null)

	return (
		<>
			<IconButton aria-label="user avatar" onClick={handleOpenMenu}>
				<Avatar
					alt="Google Avatar"
					src={session.user?.image as string}
				/>
			</IconButton>
			<Menu
				id="config-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleCloseMenu}
				getContentAnchorEl={null}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}>
				<MenuItem>
					<ListItemIcon>
						<Avatar
							alt="Google Avatar"
							src={session.user?.image as string}
						/>
					</ListItemIcon>
					<ListItemText primary={session.user?.name} />
				</MenuItem>
				<Divider />
				<MenuItem>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="ホーム" />
				</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<HelpIcon />
					</ListItemIcon>
					<ListItemText primary="ヘルプ" />
				</MenuItem>
				<MenuItem onClick={() => signOut()}>
					<ListItemIcon>
						<ExitToAppIcon />
					</ListItemIcon>
					<ListItemText primary="ログアウト" />
				</MenuItem>
			</Menu>
		</>
	)
}
export default UserConfig
