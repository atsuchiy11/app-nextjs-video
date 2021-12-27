import * as React from 'react'

export const Garbage = () => {
	return <div>ボツ</div>
}
// import * as React from 'react'
// import useSWR, { mutate } from 'swr'
// import { useRouter } from 'next/router'
// import { Theme, makeStyles } from '@material-ui/core/styles'
// import axios from 'src/foundations/axios'

// import Typography from '@material-ui/core/Typography'
// import List from '@material-ui/core/List'
// import ListItem from '@material-ui/core/ListItem'
// import ListItemText from '@material-ui/core/ListItemText'
// import ListItemAvatar from '@material-ui/core/ListItemAvatar'
// import Avatar from '@material-ui/core/Avatar'
// import Collapse from '@material-ui/core/Collapse'
// import TextField from '@material-ui/core/TextField'
// import Button from '@material-ui/core/Button'

// import { Session } from 'next-auth'
// import { getThreads, getUsers } from 'src/data/fetcher'
// import { Thread } from 'src/interfaces/api'
// import { getVideoCreated } from 'src/foundations/util'
// import Linkify from 'react-linkify'

// import { Box, IconButton, ListItemSecondaryAction } from '@material-ui/core'
// import DeleteIcon from '@material-ui/icons/Delete'
// import EditIcon from '@material-ui/icons/Edit'
// import LightTooltip from 'src/atoms/LightTooltip'

// const useStyles = makeStyles((theme: Theme) => ({
// 	root: {
// 		flexGrow: 1,
// 	},
// 	divider: {
// 		marginTop: theme.spacing(1),
// 		marginBottom: theme.spacing(1),
// 	},
// 	thread: {
// 		'& .MuiListItem-gutters': {
// 			paddingLeft: '0px',
// 			paddingRight: '0px',
// 		},
// 	},
// 	listWraper: {
// 		position: 'relative',
// 		marginBottom: theme.spacing(4),
// 	},
// 	reply: {
// 		width: `calc(100% - ${theme.spacing(6)}px)`,
// 		marginLeft: theme.spacing(6),
// 		position: 'relative',
// 	},
// 	text: {
// 		color: theme.palette.text.primary,
// 		backgroundColor: theme.palette.background.paper,
// 		padding: theme.spacing(1.5),
// 		minHeight: 80,
// 		'& a': {
// 			textDecoration: 'underline',
// 			color: theme.palette.primary.main,
// 		},
// 	},
// 	name: {
// 		display: 'block',
// 		fontWeight: 'bold',
// 		paddingBottom: '8px',
// 	},
// 	date: {
// 		fontSize: '0.8em',
// 		fontWeight: 'normal',
// 		color: theme.palette.text.secondary,
// 		marginLeft: theme.spacing(1),
// 	},
// 	editor: {
// 		width: '100%',
// 	},
// 	addButton: {
// 		position: 'absolute',
// 		top: '178px',
// 		left: theme.spacing(7),
// 		'& > *': {
// 			marginRight: theme.spacing(1),
// 		},
// 	},
// 	replayButton: {
// 		position: 'absolute',
// 		right: 0,
// 	},
// 	removeButton: {
// 		position: 'absolute',
// 		top: theme.spacing(4),
// 		right: theme.spacing(1),
// 	},
// 	// ここから改修版
// 	listItem: {
// 		display: "flex",
// 		flexDirection: "column",
// 	},
// 	okCancel: {
// 		marginLeft: "56px",
// 		'& > *': {
// 			marginRight: theme.spacing(1),
// 		},
// 	}
// }))

// interface Props {
// 	session: Session
// }
// interface IThread {
// 	thread: Thread
// }
// interface IInput {
// 	label: string
// 	className?: string
// }

// const Comments: React.FC<Props> = ({ session }) => {
// 	const classes = useStyles()
// 	const router = useRouter()

// 	/** load cache */
// 	const { data: threads, error: threadError } = useSWR(
// 		`/thread/${router.query.id}`,
// 		getThreads
// 	)
// 	const { data: users, error: userError } = useSWR('/users', getUsers)

// 	/** open or close editor & reply */
// 	const [openReply, setOpenReply] = React.useState({})
// 	const handleReply = (e: React.MouseEvent<HTMLButtonElement>) => {
// 		const label = e.currentTarget.getAttribute('aria-label')
// 		const newState = { ...openReply, [label]: !openReply[label] }
// 		setOpenReply(newState)
// 	}

// 	/** edit comment */
// 	const [editor, setEditor] = React.useState(false)
// 	const handleEdit = () => setEditor(!editor)

// 	/** delete comment */
// 	const handleDelete = (
// 		e: React.MouseEvent<HTMLButtonElement>,
// 		thread: Thread
// 	) => {
// 		const label = e.currentTarget.getAttribute('aria-label')
// 		const updateData = async () => {
// 			const params = {
// 				video: `/videos/${router.query.id}`,
// 				id: thread.SK,
// 			}
// 			if(label == "remove-thread") {
// 				params["body"] = 'このスレッドは削除されました...org'
// 			} else {
// 				params["invalid"] = true
// 			}
// 			try {
// 				const res = await axios.put('/thread', params)
// 				if (res.status == 200) {
// 					console.info('success to update thread')
// 					mutate(`/thread/${router.query.id}`)
// 				} else {
// 					console.warn('failed to update thread')
// 				}
// 			} catch (err) {
// 				console.error(err)
// 			}
// 		}
// 		updateData()
// 	}

// 	/** initialize local state */
// 	React.useEffect(() => {
// 		if (!threads) return
// 		const newState = {}
// 		threads.map((thread) => {
// 			const [post, reply] = thread.SK.split('_')
// 			if (post == reply) {
// 				if (!(thread.SK in newState)) newState[thread.SK] = false
// 			}
// 		})
// 		setOpenReply(newState)
// 	}, [threads])

// 	if (threadError) return <div>failed to load threads.</div>
// 	if (userError) return <div>faield to load users.</div>
// 	if (!threads || !users) return <div>loading...</div>

// 	/** thread list item */
// 	const ThreadItem: React.FC<IThread> = ({ thread }) => {
// 		// まとめる？
// 		const user = users.find((user) => user.PK == thread.createdUser)
// 		if (!user) return <div>user not found.</div>

// 		return (
// 			<ListItem alignItems="flex-start" key={thread.SK}>
// 				<ListItemAvatar>
// 					<Avatar alt={thread.createdUser} src={user.image} />
// 				</ListItemAvatar>
// 				<ListItemText
// 					className={classes.text}
// 					primary={
// 						<Typography
// 							component="span"
// 							variant="body2"
// 							className={classes.name}>
// 							{user.name}{' '}
// 							<span className={classes.date}>
// 								{getVideoCreated(thread.createdAt)}
// 							</span>
// 						</Typography>
// 					}
// 					secondary={
// 						<Linkify>
// 							<Typography component="span" variant="body2">
// 								{thread.body}
// 							</Typography>
// 						</Linkify>
// 					}
// 				/>
// 				{thread.createdUser == session.user.email && (
// 					<ListItemSecondaryAction className={classes.removeButton}>
// 						<IconButton
// 							edge="end"
// 							aria-label="edit-thread"
// 							onClick={handleEdit}>
// 							<EditIcon fontSize="small" />
// 						</IconButton>
// 						<LightTooltip title="削除すると戻せません">
// 							<IconButton
// 								edge="end"
// 								aria-label="remove-thread"
// 								onClick={(e) => handleDelete(e, thread)}>
// 								<DeleteIcon fontSize="small" />
// 							</IconButton>
// 						</LightTooltip>
// 					</ListItemSecondaryAction>
// 				)}
// 			</ListItem>
// 		)
// 	}

// 	/** reply list item */
// 	const ReplyItem: React.FC<IThread> = ({ thread }) => {
// 		const user = users.find((user) => user.PK == thread.createdUser)
// 		if (!user) return <div>user not found.</div>

// 		return (
// 			<ListItem alignItems="flex-start" className={classes.reply}>
// 				<ListItemAvatar>
// 					<Avatar alt={thread.createdUser} src={user.image} />
// 				</ListItemAvatar>
// 				<ListItemText
// 					disableTypography
// 					className={classes.text}
// 					primary={
// 						<Typography
// 							component="span"
// 							variant="body2"
// 							className={classes.name}>
// 							{user.name}{' '}
// 							<span className={classes.date}>
// 								{getVideoCreated(thread.createdAt)}
// 							</span>
// 						</Typography>
// 					}
// 					secondary={
// 						<Linkify>
// 							<Typography component="span" variant="body2">
// 								{/* https://www.yahoo.co.jp is Yahoo!JAPAN */}
// 								{thread.body}
// 							</Typography>
// 						</Linkify>
// 					}
// 				/>
// 				{thread.createdUser == session.user.email && (
// 					<ListItemSecondaryAction className={classes.removeButton}>
// 						<LightTooltip title="削除すると戻せません">
// 							<IconButton
// 								edge="end"
// 								aria-label="remove-reply"
// 								onClick={(e) => handleDelete(e, thread)}>
// 								<DeleteIcon fontSize="small" />
// 							</IconButton>
// 						</LightTooltip>
// 					</ListItemSecondaryAction>
// 				)}
// 			</ListItem>
// 		)
// 	}

// 	/** comment editor */
// 	const InputComment: React.FC<IInput> = (props) => {
// 		const { label } = props
// 		const [value, setValue] = React.useState('')

// 		/** input state */
// 		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 			setValue(e.target.value)
// 		}
// 		/** post thread */
// 		const handleThread = (e: React.MouseEvent<HTMLButtonElement>) => {
// 			const label = e.currentTarget.getAttribute('aria-label')
// 			const postData = async () => {
// 				const params = {
// 					video: `/videos/${router.query.id}`,
// 					user: session.user.email,
// 					body: value,
// 				}

// 				if (label != 'new-thread') {
// 					const post = label.split('_')[0]
// 					params['thread'] = post
// 				}
// 				try {
// 					const res = await axios.post('/thread', params)
// 					if (res.status == 200) {
// 						console.info('success to update comment')
// 						mutate(`/thread/${router.query.id}`)
// 						setValue('')
// 					} else {
// 						console.warn('faield to update comment')
// 					}
// 				} catch (err) {
// 					console.error(err)
// 				}
// 			}
// 			postData()
// 		}

// 		return (
// 			<>
// 				<ListItem alignItems="flex-start" className={classes.listItem}>
// 					<Box display="flex" width="inherit">
// 					<ListItemAvatar>
// 						<Avatar
// 							alt={session.user.name}
// 							src={session.user.image}
// 						/>
// 					</ListItemAvatar>
// 					<ListItemText
// 						disableTypography
// 						primary={
// 							<Typography
// 								component="span"
// 								variant="body2"
// 								className={classes.name}>
// 								{session.user.name}
// 							</Typography>
// 						}
// 						secondary={
// 							<TextField
// 								className={classes.editor}
// 								variant="outlined"
// 								placeholder="コメントを入力..."
// 								multiline
// 								value={value}
// 								onChange={handleChange}
// 								rows={4}
// 							/>
// 						}
// 					/>
// 					</Box>
// 					<Box className={classes.okCancel}>
// 					{/* <ListItemSecondaryAction className={classes.addButton}> */}
// 						<Button
// 							variant="outlined"
// 							color="primary"
// 							size="small"
// 							onClick={handleThread}
// 							aria-label={label}>
// 							コメントの追加
// 						</Button>
// 						{label != 'new-thread' && (
// 							<Button
// 								variant="outlined"
// 								size="small"
// 								onClick={handleReply}
// 								aria-label={label}>
// 								キャンセル
// 							</Button>
// 						)}
// 					{/* </ListItemSecondaryAction> */}
// 					</Box>
// 				</ListItem>
// 			</>
// 		)
// 	}

// 	return (
// 		<div className={classes.root}>
// 			<List className={classes.thread}>
// 				{threads.map((thread) => {
// 					const [post, reply] = thread.SK.split('_')
// 					if (post == reply) {
// 						return (
// 							<div key={thread.SK} className={classes.listWraper}>
// 								{!editor && <ThreadItem thread={thread} />}
// 								{editor && <InputComment label="edit-thread" />}
// 								<Collapse in={true}>
// 									<List disablePadding>
// 										{threads.map((thread) => {
// 											const [_post, _reply] =
// 												thread.SK.split('_')
// 											if (
// 												post == _post &&
// 												_post != _reply
// 											) {
// 												return (
// 													<div key={thread.SK}>
// 														<ReplyItem
// 															thread={thread}
// 														/>
// 													</div>
// 												)
// 											}
// 										})}
// 									</List>
// 								</Collapse>
// 								{openReply[thread.SK] && (
// 									<InputComment label={thread.SK} />
// 								)}
// 								{!openReply[thread.SK] && (
// 									<Button
// 										aria-label={thread.SK}
// 										variant="outlined"
// 										size="small"
// 										className={classes.replayButton}
// 										onClick={handleReply}>
// 										返信
// 									</Button>
// 								)}
// 							</div>
// 						)
// 					}
// 				})}
// 				<InputComment label="new-thread" />
// 			</List>
// 		</div>
// 	)
// }
// export default Comments
