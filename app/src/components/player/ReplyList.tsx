import * as React from 'react'
import useThreads from 'src/components/player/useThreads'

import List from '@material-ui/core/List'
import ThreadEditor from 'src/components/player/ThreadEditor'
import ReplyItem from 'src/components/player/ReplyItem'

interface Props {
	post: string
	handler: (e: React.MouseEvent<HTMLButtonElement>) => void
	editMode: { [key: string]: string }
}
/**
 * 難解なアーキテクチャなのでMEMO: 返信コメントのリスト。スレッド配下にネストする
 * @param {string} post - スレッドのキー（作成日時yyyymmdd hh:mm:ss）
 * @param {function} handler - 返信コメントを編集モードに切り替えるためのイベントハンドラ
 * @param {object} editMode - 編集/読取モードを状態管理するローカルステート。key/valueのオブジェクト
 * @returns {JSX.Element}
 */
const ReplyList: React.FC<Props> = (props) => {
	const { post, handler, editMode } = props

	/** load cache */
	const { threads, threadError } = useThreads()

	/** validate */
	if (threadError) return <div>failed to load threads.</div>
	if (!threads) return <div>loading...</div>

	return (
		<List disablePadding>
			{threads.map((thread) => {
				const [_post, _reply] = thread.SK.split('_')
				if (post == _post && _post != _reply) {
					return (
						<div key={thread.SK}>
							{/* switch read/write mode */}
							{!editMode[thread.SK] && (
								<ReplyItem thread={thread} handler={handler} />
							)}
							{editMode[thread.SK] && (
								<ThreadEditor
									ariaLabel={thread.SK}
									handler={handler}
									body={thread.body}
								/>
							)}
						</div>
					)
				}
			})}
		</List>
	)
}
export default ReplyList
