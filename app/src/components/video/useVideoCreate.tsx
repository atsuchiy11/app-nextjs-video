import axios from 'src/foundations/axios'
import * as tus from 'tus-js-client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import { useTips, Severity } from 'src/atoms/Tips'
import { useSpinner } from 'src/atoms/Spinner'
import { TagWithChip } from 'src/components/video/useTagConfig'
import { EditorState, convertToRaw, DraftHandleValue } from 'draft-js'
import { useCategories } from 'src/foundations/hooks'
import { getYYYYMMDDHHMMSS } from 'src/foundations/util'
import {
	VideoTableRow,
	ReqFile,
	UploadFile,
	ReqVideoPost,
	ReqUploadStatusPost,
	ReqUploadStatusPut,
	VideoVimeo,
} from 'src/interfaces/api'

import useEditor, {
	initRawData,
	initState,
} from 'src/components/video/useEditor'
import useTagConfig from 'src/components/video/useTagConfig'
import useUploadStatus, {
	IN_ENCODE,
	IN_UPLOAD,
} from 'src/components/video/useUploadStatus'

/**
 * 動画コンテンツ登録のメタデータを管理するフック
 * @param selectedRow selected video meta data
 * @param handler handler for notice parent component
 * @returns
 */
const useVideoCreate = (
	handler: (value: React.SetStateAction<boolean>) => void
) => {
	const { showTips } = useTips()
	const { showSpinner } = useSpinner()

	const [session] = useSession()
	const user = session.user.email

	/**
	 * ステート管理できないのでローカル変数を使う（しかない）
	 * フックの更新よりも先にステータスの更新が走ってしまう（場合がある）
	 */
	let uploadStatus = {} as ReqUploadStatusPut

	const [videoRow, setVideoRow] = useState({} as VideoTableRow)
	const [file, setFile] = useState({} as File)
	const [titleErr, setTitleErr] = useState(false)
	const [primaryErr, setPrimaryErr] = useState(false)
	const [secondaryErr, setSecondaryErr] = useState(false)
	const [error, setError] = useState(true)

	const { data: categories, error: categoryError } = useCategories()
	const { tagsWithChip, handleTags, tagError } = useTagConfig({
		videoRow,
		setVideoRow,
	})
	const {
		editorState,
		setEditorState,
		handleKeyCommand,
		handleToggleClick,
		handleBlockClick,
		handleAddLink,
	} = useEditor(initRawData)
	const { postStatus, putStatus } = useUploadStatus()

	/** listener input video parameters */
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const key = event.target.id.split('video-create-')[1]
		setVideoRow({ ...videoRow, [key]: event.target.value })
		/** error cancel */
		if (key == 'name' && event.target.value != '') setTitleErr(false)
	}

	/** listener primary category */
	const handleChangePrimary = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setVideoRow({ ...videoRow, primary: event.target.value })
		/** error cancel */
		if (event.target.value !== '') setPrimaryErr(false)
	}

	/** listener secondary category */
	const handleChangeSecondary = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setVideoRow({ ...videoRow, secondary: event.target.value })
		/** error cancel */
		if (event.target.value !== '') setSecondaryErr(false)
	}

	/** listener input file */
	const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const inputFile = event.target.files[0]
			const src = window.URL.createObjectURL(inputFile)
			setVideoRow({ ...videoRow, thumbnail: src })
			setFile(inputFile)
		}
	}

	/** validate video meta data */
	const validateParams = (): { message: string; severity: Severity } => {
		const rawDescription = convertToRaw(editorState.getCurrentContent())
		if (!videoRow.thumbnail || videoRow.thumbnail == '')
			return {
				message: 'まずはアップロードする動画を選択しましょう！',
				severity: 'info',
			}
		if (!videoRow.name || videoRow.name == '') {
			setTitleErr(true)
			return {
				message: '動画のタイトルは必要ですよね？',
				severity: 'info',
			}
		}
		if (rawDescription.blocks[0].text == '')
			return {
				message: '概要欄を入力して動画をアピールしましょう！',
				severity: 'info',
			}
		if (!videoRow.primary || videoRow.primary == '') {
			setPrimaryErr(true)
			return {
				message: 'カテゴリは管理上必要なのでご協力をお願いしますm(__)m',
				severity: 'info',
			}
		}
		if (!videoRow.secondary || videoRow.secondary == '') {
			setSecondaryErr(true)
			return {
				message: 'カテゴリは管理上必要なのでご協力をお願いしますm(__)m',
				severity: 'info',
			}
		}
		if (!videoRow.tags || videoRow.tags == [])
			return {
				message: 'タグを設定しないと検索されないですよ？',
				severity: 'info',
			}
		return null
	}

	/** get upload URL from vimeo */
	const getUploadURL = async () => {
		const uploadInfo = `
            uploadUser: ${user};
            uploadDate: ${getYYYYMMDDHHMMSS()};
            filename: ${file.name}
        `
		const params: ReqFile = {
			name: videoRow.name,
			description: uploadInfo,
			size: file.size,
		}
		try {
			const res = await axios.post<UploadFile>(`/upload`, params)
			if (res.status != 200) throw new Error('faield to get upload URL.')
			return Promise.resolve(res.data)
		} catch (err) {
			console.error(err.message)
			throw new Error(err.message)
		}
	}

	/** post video meta data to db */
	const postData = async (vimeo: VideoVimeo) => {
		const rawDescription = convertToRaw(editorState.getCurrentContent())
		const params: ReqVideoPost = {
			PK: vimeo.uri,
			user,
			description: JSON.stringify(rawDescription),
			tagIds: tagsWithChip
				.filter((tag) => videoRow.tags.find((t) => t == tag.name))
				.map((t) => t.PK),
			categoryId: categories.find((c) => c.name == videoRow.secondary).PK,
		}
		if ('note' in videoRow) params.note = videoRow.note
		// append vimeo params
		const reqBody = Object.keys(vimeo).reduce(
			(obj, key) => ({ ...obj, [key]: vimeo[key] }),
			params
		)
		try {
			const res = await axios.post(`/video`, reqBody)
			if (res.status != 200) throw new Error('faield to upload db')
			return Promise.resolve(res.data)
		} catch (err) {
			console.error(err.message)
			throw new Error(err.message)
		}
	}

	/** generate tus uploader */
	const generateUploader = (vimeo: UploadFile) => {
		const uploader = new tus.Upload(file, {
			endpoint: 'none',
			uploadUrl: vimeo.upload_link,
			retryDelays: [0, 3000, 5000, 10000, 20000],
			metadata: {
				filename: file.name,
				filetype: file.type,
			},
			// listener
			onError: (err) => {
				throw new Error(`faield because ${err}`)
			},
			onProgress: (bytesUploaaded, bytesTotal) => {
				const percentage = (
					(bytesUploaaded / bytesTotal) *
					100
				).toFixed(2)
				console.info(bytesUploaaded, bytesTotal, percentage + '%')
			},
			onSuccess: () => {
				showSpinner(false)
				console.info(`Success! :${uploader.url}`)

				/** put upload status */
				putStatus({ ...uploadStatus, status: IN_ENCODE })
					.then(console.log)
					.catch((err) => {
						console.error(error)
						throw new Error(err.message)
					})
			},
		})
		return uploader
	}

	/** upload start */
	const uploadVideo = async () => {
		showTips(
			'アップロードを開始します。詳細はダッシュボードから確認してください。',
			'info'
		)
		showSpinner(true)

		const vimeo = await getUploadURL()
		if (!vimeo) throw new Error('faield to get upload URL.')

		const uploader = generateUploader(vimeo)

		// 時間があれば再開のロジックを組み込む
		uploader.findPreviousUploads().then((previousUploads) => {
			if (previousUploads.length) {
				// restart upload
				uploader.resumeFromPreviousUpload(previousUploads[0])
			}
			uploader.start()

			/** post video meta data */
			axios
				.get<VideoVimeo>(`/vimeo/video/${vimeo.uri.split('/')[2]}`)
				.then((res) => postData(res.data))
				.catch((err) => {
					throw new Error(err.message)
				})

			/** post upload status */
			const params: ReqUploadStatusPost = {
				uri: vimeo.uri,
				user,
				name: videoRow.name,
				filename: file.name,
				status: IN_UPLOAD,
			}
			postStatus(params)
				.then((status) => (uploadStatus = status))
				.catch((err) => {
					console.error(err.message)
					throw new Error(err.message)
				})

			/** reset */
			setVideoRow({} as VideoTableRow)
			setEditorState(initState)
		})
	}

	/** submit */
	const handleSubmit = () => {
		const isError = validateParams()
		if (isError) {
			showTips(isError.message, isError.severity)
			return
		}
		uploadVideo()
		handler((value) => !value)
	}

	/** validate */
	useEffect(() => {
		if (tagError || categoryError) setError(true)
		else setError(false)
	}, [tagError, categoryError])

	return [
		{
			state: videoRow,
			handleInput: handleChange,
			handlePrimary: handleChangePrimary,
			handleSecondary: handleChangeSecondary,
			handleFile: handleChangeFile,
			handleSubmit,
		},
		{
			state: tagsWithChip,
			handleTags,
		},
		{
			value: editorState,
			onChange: setEditorState,
			handleKeyCommand,
			handleToggleClick,
			handleBlockClick,
			handleAddLink,
		},
		{
			title: titleErr,
			primary: primaryErr,
			secondary: secondaryErr,
		},
		error,
	] as [
		{
			state: VideoTableRow
			handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void
			handlePrimary: (event: React.ChangeEvent<HTMLInputElement>) => void
			handleSecondary: (
				event: React.ChangeEvent<HTMLInputElement>
			) => void
			handleFile: (event: React.ChangeEvent<HTMLInputElement>) => void
			handleSubmit: () => void
		},
		{
			state: TagWithChip[]
			handleTags: (id: string) => void
		},
		{
			value: EditorState
			onChange: React.Dispatch<React.SetStateAction<EditorState>>
			handleKeyCommand: (
				command: string,
				editorState: EditorState
			) => DraftHandleValue
			handleToggleClick: (
				e: React.MouseEvent,
				inlineStyle: string
			) => void
			handleBlockClick: (e: React.MouseEvent, blockType: string) => void
			handleAddLink: () => void
		},
		{
			title: boolean
			primary: boolean
			secondary: boolean
		},
		any
	]
}
export default useVideoCreate
