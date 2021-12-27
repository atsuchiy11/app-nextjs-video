import * as React from 'react'
import useSWR from 'swr'
import { useSession } from 'next-auth/client'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { Thread } from 'src/interfaces/api'
import { getUsers } from 'src/data/fetcher'
import { getVideoCreated } from 'src/foundations/util'

import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Linkify from 'react-linkify'
import ActionButton from './ActionButton'

const useStyles = makeStyles((theme: Theme) => ({
	replyItem: {
		width: `calc(100% - ${theme.spacing(6)}px)`,
		marginLeft: theme.spacing(6),
		position: 'relative',
	},
	listText: {
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(1.5),
		minHeight: 80,
		'& a': {
			textDecoration: 'underline',
			color: theme.palette.primary.main,
		},
	},
	name: {
		display: 'block',
		fontWeight: 'bold',
		paddingBottom: '8px',
	},
	date: {
		fontSize: '0.8em',
		fontWeight: 'normal',
		color: theme.palette.text.secondary,
		marginLeft: theme.spacing(1),
	},
	text: {
		margin: 0,
		fontFamily: 'inherit',
	},
}))

interface Props {
	thread: Thread
	handler: (e: React.MouseEvent<HTMLButtonElement>) => void
}
/**
 * 難解なアーキテクチャなのでMEMO: 返信コメントのレイアウト。リストアイテム
 * @param {object} thread - スレッドオブジェクト
 * @param {function} handler - スレッドを編集モードに切り替えるためのイベントハンドラ。バケツリレー①
 * @returns {JSX.Element}
 */
const ReplyItem: React.FC<Props> = ({ thread, handler }) => {
	const classes = useStyles()
	const [session, _] = useSession()

	/** load cache */
	const { data: users, error: userError } = useSWR('/users', getUsers)

	/** validate */
	if (userError) return <div>failed to load users.</div>
	if (!users) return <div>loading...</div>

	/** session user */
	const user = users.find((user) => user.PK == thread.createdUser)
	if (!user) return <div>user not found.</div>

	return (
		<ListItem alignItems="flex-start" className={classes.replyItem}>
			<ListItemAvatar>
				<Avatar alt={thread.createdUser} src={user.image} />
			</ListItemAvatar>
			<ListItemText
				disableTypography
				className={classes.listText}
				primary={
					<Typography
						component="span"
						variant="body2"
						className={classes.name}>
						{user.name}{' '}
						<span className={classes.date}>
							{getVideoCreated(thread.createdAt)}
						</span>
					</Typography>
				}
				secondary={
					<Linkify>
						<Typography component="span" variant="body2">
							<pre className={classes.text}>{thread.body}</pre>
						</Typography>
					</Linkify>
				}
			/>
			{/* If session user is poster */}
			{thread.createdUser == session.user.email && (
				<ActionButton ariaLabel={thread.SK} handler={handler} />
			)}
		</ListItem>
	)
}
export default ReplyItem
