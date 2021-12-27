import axios from 'src/foundations/axios'
import { mutate } from 'swr'
import { useEffect, useState } from 'react'
import { VideoTableRow } from 'src/interfaces/api'
import { useVideoTable, useCategories } from 'src/foundations/hooks'
import { useSession } from 'next-auth/client'
import { useTips } from 'src/atoms/Tips'
import { TagWithChip } from 'src/components/video/useTagConfig'
import { ReqVideoPut, ReqVimeoPut } from 'src/interfaces/api'
import { EditorState, convertToRaw, DraftHandleValue } from 'draft-js'

import useEditor from 'src/components/video/useEditor'
import useTagConfig from 'src/components/video/useTagConfig'

/**
 * 動画コンテンツ編集のメタデータを管理するフック
 * @param selectedRow selected video meta data
 * @param handler handler for notice parent component
 * @returns
 */
const useVideoEdit = (
	selectedRow: VideoTableRow,
	handler: (value: React.SetStateAction<boolean>) => void
) => {
	const [session] = useSession()
	const { showTips } = useTips()

	const [prevRow, setPrevRow] = useState(selectedRow) //prev
	const [videoRow, setVideoRow] = useState(selectedRow) //current
	const [thumbnail, setThumbnail] = useState({} as File)
	const [error, setError] = useState(true)

	const { data: videoRows, error: tableError } = useVideoTable()
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
	} = useEditor(selectedRow.description)

	/** listener input video parameters */
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const key = event.target.id.split('video-edit-')[1]
		setVideoRow({ ...videoRow, [key]: event.target.value })
	}

	/** listener video invalid */
	const handleChangeInvalid = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		const released = event.currentTarget.innerText
		if (released == '公開中') setVideoRow({ ...videoRow, invalid: true })
		else setVideoRow({ ...videoRow, invalid: false })
	}

	/** listener primary category */
	const handleChangePrimary = (event: React.ChangeEvent<HTMLInputElement>) =>
		setVideoRow({ ...videoRow, primary: event.target.value })

	/** listener secondary category */
	const handleChangeSecondary = (
		event: React.ChangeEvent<HTMLInputElement>
	) => setVideoRow({ ...videoRow, secondary: event.target.value })

	/** listener input file */
	const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0]
			const reader = new FileReader()
			reader.onload = (e) => {
				setThumbnail(file)
				setVideoRow({
					...videoRow,
					thumbnail: e.target.result as string,
				})
			}
			reader.readAsDataURL(file)
		}
	}

	/** find changed state */
	const diffParams = (
		prevRow: VideoTableRow,
		videoRow: VideoTableRow,
		parsed: string
	) =>
		Object.keys(prevRow).filter((key) => {
			switch (key) {
				default:
					if (prevRow[key] != videoRow[key]) return key
					break
				case 'description':
					if (prevRow.description != parsed) return key
					break
			}
		})

	/** generate new thumbnail link */
	// [注意] URIの規則性を基に生成しているので変動要素あり
	const generateThumbnailURL = (link: string) => {
		const splitLink = link.split('/')
		const hash = splitLink[splitLink.length - 1]
		const id = hash.split('?')[0]
		return `https://i.vimeocdn.com/video/${id}_1920x1080?r=pad`
	}

	/** if thubmnail changed, update to vimeo */
	const updateThumbnail = async (params: ReqVideoPut, changed: string[]) => {
		if (!changed.find((key) => key == 'thumbnail')) {
			return Promise.resolve(params)
		}

		const reqBody = new FormData()
		reqBody.append('image', thumbnail)
		const id = videoRow.uri.split('/')[2]
		const headers = { 'Content-Type': 'multipart/form-data' }
		try {
			const res = await axios.post(`/video/thumbnail/${id}`, reqBody, {
				headers: headers,
			})
			if (res.status != 200) throw new Error(res.data.message)
			const newLink = generateThumbnailURL(res.data.link)
			return Promise.resolve({ ...params, thumbnail: newLink })
		} catch (err) {
			console.error(err.message)
			throw new Error(err.message)
		}
	}

	/** if name(=title) changed, update to vimeo */
	const updateName = async (params: ReqVideoPut, changed: string[]) => {
		if (!changed.find((key) => key == 'name')) {
			return Promise.resolve(params)
		}

		const reqBody: ReqVimeoPut = {
			PK: videoRow.uri.split('/')[2],
			name: videoRow.name,
		}
		try {
			const res = await axios.put('/vimeo/video', reqBody)
			if (res.status != 200) throw new Error(res.data)
			console.log('success to update name.')
			return Promise.resolve({ ...params, name: videoRow.name })
		} catch (err) {
			throw new Error(err.message)
		}
	}

	/** generate request body */
	const getRequestBody = (
		params: ReqVideoPut,
		changed: string[],
		parsed: string
	) => {
		changed.map((key) => {
			switch (key) {
				case 'invalid':
					params[key] = videoRow[key]
					break
				case 'note':
					params[key] = videoRow[key]
					break
				case 'secondary':
					params.categoryId = categories.find(
						(c) => c.name == videoRow.secondary
					).PK
					break
				case 'tags':
					params.tagIds = tagsWithChip
						.filter((tag) => {
							if (videoRow[key].find((t) => t == tag.name))
								return tag
						})
						.map((tag) => tag.PK)
					break
				case 'description':
					params[key] = parsed
					break
			}
		})
		return Promise.resolve(params)
	}

	/** update video meta data to db */
	const putData = async (params: ReqVideoPut) => {
		try {
			const res = await axios.put('/video', params)
			if (res.status != 200) throw new Error('failed to update video')
			showTips('動画コンテンツは正常に更新されました。', 'info')
			const newVideoRows = videoRows.map((row) => {
				if (row.uri == videoRow.uri) return videoRow
				else return row
			})
			mutate('/table/videos', newVideoRows, false)
			mutate('/videos')
			setPrevRow(videoRow)
			handler((value) => !value)
		} catch (err) {
			console.error(err.message)
			throw new Error(err.message)
		}
	}

	/** submit event */
	const handleSubmit = (editorState: EditorState) => {
		const parsed = JSON.stringify(
			convertToRaw(editorState.getCurrentContent())
		)
		const changed = diffParams(prevRow, videoRow, parsed)
		// not changed
		if (changed.length <= 0) {
			showTips('あれ、何も変えてないですよね？', 'info')
			handler((value) => !value)
			return
		}
		const params: ReqVideoPut = {
			PK: videoRow.uri,
			user: session.user.email,
		}
		updateThumbnail(params, changed)
			.then((params) => updateName(params, changed))
			.then((params) => getRequestBody(params, changed, parsed))
			.then(putData)
			.catch((err) => {
				console.error(err.message)
				throw new Error(err.message)
			})
	}

	/** validate */
	useEffect(() => {
		if (tagError || categoryError || tableError) setError(true)
		else setError(false)
	}, [tagError, categoryError, tableError])

	/** init video row */
	useEffect(() => {
		setVideoRow(selectedRow)
		setPrevRow(selectedRow)
	}, [selectedRow])

	return [
		{
			state: videoRow,
			handleInput: handleChange,
			handleInvalid: handleChangeInvalid,
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
		error,
	] as [
		{
			state: VideoTableRow
			handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void
			handleInvalid: (event: React.MouseEvent<HTMLButtonElement>) => void
			handlePrimary: (event: React.ChangeEvent<HTMLInputElement>) => void
			handleSecondary: (
				event: React.ChangeEvent<HTMLInputElement>
			) => void
			handleFile: (event: React.ChangeEvent<HTMLInputElement>) => void
			handleSubmit: (editorState: EditorState) => void
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
		any
	]
}
export default useVideoEdit
