import * as React from 'react'
import { useSession } from 'next-auth/client'
import { Theme, makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import useEditor from 'src/components/player/useEditor'

const useStyles = makeStyles((theme: Theme) => ({
	editor: {
		display: 'flex',
		flexDirection: 'column',
	},
	offset: {
		marginLeft: theme.spacing(6),
	},
	okCancel: {
		marginLeft: '56px',
		'& > *': {
			marginRight: theme.spacing(1),
		},
	},
	name: {
		display: 'block',
		fontWeight: 'bold',
		paddingBottom: '8px',
	},
}))

interface Props {
	ariaLabel: string
	handler?: (e: React.MouseEvent<HTMLButtonElement>, _label?: string) => void
	body?: string
}
/**
 * 難解なアーキテクチャなのでMEMO: エディタ。新規と編集時で挙動が変わるのでカオス
 * @param {string} ariaLabel - aria-label属性に入ったスレッドのソートキー
 * @param {function} handler - エディタの開閉を切り替えるイベントハンドラ
 * @param {string} body - 編集前のテキスト。編集モードに切り替えた時のみ値を持つ
 * @returns
 */
const ThreadEditor: React.VFC<Props> = (props) => {
	const classes = useStyles()
	const { ariaLabel, handler, body } = props

	const [session] = useSession()
	const { editorProps, handleThread } = useEditor(body ? body : '', handler)

	return (
		<div className={ariaLabel != 'new-thread' ? classes.offset : ''}>
			<ListItem alignItems="flex-start" className={classes.editor}>
				<Box display="flex" width="inherit">
					<ListItemAvatar>
						<Avatar
							alt={session.user.name}
							src={session.user.image}
						/>
					</ListItemAvatar>
					<ListItemText
						disableTypography
						primary={
							<Typography
								component="span"
								variant="body2"
								className={classes.name}>
								{session.user.name}
							</Typography>
						}
						secondary={
							<TextField
								className={classes.editor}
								variant="outlined"
								placeholder="コメントを入力...URLは自動でリンクになりますw"
								multiline
								value={editorProps.value}
								onChange={editorProps.onChange}
								rows={4}
							/>
						}
					/>
				</Box>
				<Box className={classes.okCancel}>
					<Button
						variant="outlined"
						color="primary"
						size="small"
						onClick={handleThread}
						aria-label={ariaLabel}>
						{body ? 'コメントの変更' : 'コメントの追加'}
					</Button>
					{/* 新規エディタは常時表示されるのでキャンセルはない */}
					{ariaLabel != 'new-thread' && (
						<Button
							variant="outlined"
							size="small"
							onClick={handler}
							aria-label={ariaLabel}>
							キャンセル
						</Button>
					)}
				</Box>
			</ListItem>
		</div>
	)
}
export default ThreadEditor
