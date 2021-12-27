import * as React from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { useAppContext } from 'src/foundations/AppProvider'

import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import Collapse from '@material-ui/core/Collapse'
import Button from '@material-ui/core/Button'
import ThreadEditor from './ThreadEditor'
import ThreadItem from './ThreadItem'
import ReplyList from './ReplyList'

import useThreads from 'src/components/player/useThreads'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
	},
	divider: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	thread: {
		'& .MuiListItem-gutters': {
			paddingLeft: '0px',
			paddingRight: '0px',
		},
	},
	listWraper: {
		position: 'relative',
		marginBottom: theme.spacing(4),
	},
	replayButton: {
		position: 'absolute',
		right: 0,
	},
}))

const Threads: React.FC = () => {
	const classes = useStyles()
	const { state } = useAppContext()

	/** load cache */
	const {
		threads,
		threadError,
		openEditor,
		handleEditor,
		editMode,
		handleEditMode,
	} = useThreads()

	/** validate */
	if (threadError) return <div>failed to load threads.</div>
	if (!threads) return <div>loading...</div>

	return (
		<List className={classes.thread}>
			{/* new thread editor */}
			<ThreadEditor ariaLabel="new-thread" />
			<Divider className={classes.divider} />
			{state.openThread &&
				threads.map((thread) => {
					const [post, reply] = thread.SK.split('_')
					if (post == reply) {
						return (
							<div key={thread.SK} className={classes.listWraper}>
								{/* switch read/write mode */}
								{!editMode[thread.SK] && (
									<ThreadItem
										thread={thread}
										handler={handleEditMode}
									/>
								)}
								{editMode[thread.SK] && (
									<ThreadEditor
										ariaLabel={thread.SK}
										handler={handleEditMode}
										body={thread.body}
									/>
								)}
								{/* nested reply list */}
								<Collapse in={true}>
									<ReplyList
										post={post}
										handler={handleEditMode}
										editMode={editMode}
									/>
								</Collapse>
								{/* switch open/close reply editor */}
								{openEditor[thread.SK] && (
									<ThreadEditor
										ariaLabel={thread.SK}
										handler={handleEditor}
									/>
								)}
								{!openEditor[thread.SK] && (
									<Button
										aria-label={thread.SK}
										variant="outlined"
										size="small"
										className={classes.replayButton}
										onClick={handleEditor}>
										返信
									</Button>
								)}
							</div>
						)
					}
				})}
		</List>
	)
}
export default Threads
