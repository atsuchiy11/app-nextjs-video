import * as React from 'react'
import { useEffect, useState } from 'react'
import { convertFromRaw, EditorState, RichUtils } from 'draft-js'
import { linkDecorator } from 'src/atoms/Link'

/** editor initial state */
const initData = { entityMap: {}, blocks: [] }
export const initRawData = JSON.stringify(initData)
export const initState = EditorState.createWithContent(
	convertFromRaw(initData),
	linkDecorator
)

const useEditor = (rawData?: string) => {
	const [editorState, setEditorState] = useState(initState)

	/** initilize state */
	useEffect(() => {
		if (!rawData) return
		// const _rawData = rawData ? rawData : JSON.stringify(initData)
		const parsed = convertFromRaw(JSON.parse(rawData))
		const currentState = EditorState.createWithContent(
			parsed,
			linkDecorator
		)
		setEditorState(currentState)
	}, [rawData])

	// short-cut key
	const handleKeyCommand = (command: string, editorState: EditorState) => {
		const newState = RichUtils.handleKeyCommand(editorState, command)

		if (newState) {
			setEditorState(newState)
			return 'handled'
		}
		return 'not-handled'
	}

	// text decoration
	const handleToggleClick = (e: React.MouseEvent, inlineStyle: string) => {
		e.preventDefault()
		setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle))
	}

	// text format
	const handleBlockClick = (e: React.MouseEvent, blockType: string) => {
		e.preventDefault()
		setEditorState(RichUtils.toggleBlockType(editorState, blockType))
	}

	// text link
	const handleAddLink = () => {
		const selection = editorState.getSelection()
		const link = prompt('Please enter the URL of your link')
		if (!link) {
			setEditorState(RichUtils.toggleLink(editorState, selection, null))
			return
		}
		const content = editorState.getCurrentContent()
		const contentWithEntity = content.createEntity('LINK', 'MUTABLE', {
			url: link,
		})
		const newState = EditorState.push(
			editorState,
			contentWithEntity,
			'apply-entity'
		)
		const entityKey = contentWithEntity.getLastCreatedEntityKey()
		setEditorState(RichUtils.toggleLink(newState, selection, entityKey))
	}
	// 親フックで配列にまとめるのでオブジェクトで返す
	return {
		editorState,
		setEditorState,
		handleKeyCommand,
		handleToggleClick,
		handleBlockClick,
		handleAddLink,
	}
}
export default useEditor
