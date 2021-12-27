import React, { useState } from 'react'
import { mutate } from 'swr'
import axios from 'src/foundations/axios'

import Chip from '@material-ui/core/Chip'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Divider from '@material-ui/core/Divider'

import { GridRowData } from '@material-ui/data-grid'
import { useSession } from 'next-auth/client'
import { ReqUser } from 'src/interfaces/api'
import { useTips } from 'src/atoms/Tips'

interface Props {
	user: GridRowData
}

const UserPermissionChip: React.FC<Props> = ({ user }) => {
	const [session] = useSession()
	const { showTips } = useTips()

	/** user state */
	const [acl, setAcl] = useState(user.acl)
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAcl(event.target.value)
	}

	/** dialog state */
	const [openDialog, setOpenDialog] = useState(false)
	const handleDialog = () => {
		/** can't change yourself */
		if (session.user.email == user.PK) {
			showTips('自身の権限は変更できません！', 'warning')
			return
		}
		setOpenDialog(!openDialog)
	}

	/** submit state */
	const handleSubmit = (okCancel: boolean) => {
		if (!okCancel) {
			setOpenDialog(!openDialog)
			return
		}
		const putUser = async () => {
			const params: ReqUser = {
				PK: user.PK,
				acl: acl,
			}
			try {
				const res = await axios.put('/user', params)
				if (res.status != 200) throw new Error('failed to update user')
				mutate('/users')
				setOpenDialog(!openDialog)
				showTips('ユーザの権限を更新しました', 'info')
			} catch (err) {
				throw new Error(err)
			}
		}
		if (user.acl != acl) putUser()
		else showTips('あれ、何も変えてませんよね？', 'info')
	}

	return (
		<>
			<Chip
				label={user.acl == 'admin' ? '管理者' : '閲覧者'}
				color={user.acl == 'user' ? 'default' : 'primary'}
				onClick={handleDialog}
			/>
			<Dialog
				fullWidth
				maxWidth="sm"
				open={openDialog}
				onClose={handleDialog}>
				<DialogTitle id="change-permission">権限設定</DialogTitle>
				<DialogContent>
					<DialogContentText>
						「{user.name}」さんの権限を変更します。
					</DialogContentText>
					<FormControl component="fieldset">
						<RadioGroup
							name="permission"
							value={acl}
							onChange={handleChange}>
							<FormControlLabel
								value="user"
								control={<Radio />}
								label="閲覧者"
							/>
							<FormControlLabel
								value="admin"
								control={<Radio />}
								label="管理者"
							/>
						</RadioGroup>
					</FormControl>
					<Divider style={{ marginBottom: '16px' }} />
					<DialogContentText style={{ fontSize: '.9rem' }}>
						基本的に部署から選ばれた人のみが管理者です。無闇に増やさないください。
					</DialogContentText>
					<DialogContentText style={{ fontSize: '.9rem' }}>
						不正な権限は、発覚した時点で予告なく剥奪します。
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => handleSubmit(false)} color="primary">
						キャンセル
					</Button>
					<Button onClick={() => handleSubmit(true)} color="primary">
						OK
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
export default UserPermissionChip
