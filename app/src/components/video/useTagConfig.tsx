import React, { useState, useEffect } from 'react'
import { Tag } from 'src/interfaces/api'
import { VideoTableRow } from 'src/interfaces/api'
import { useTags } from 'src/foundations/hooks'
import { useTips } from 'src/atoms/Tips'

export type TagWithChip = Tag & { selected: 'default' | 'primary' }

interface Props {
	videoRow: VideoTableRow
	setVideoRow: React.Dispatch<React.SetStateAction<VideoTableRow>>
}

const useTagConfig = ({ videoRow, setVideoRow }: Props) => {
	const tagLimitCount = 3
	const { showTips } = useTips()

	const { data: tags, error: tagError } = useTags()
	const [tagsWithChip, setTagsWithChip] = useState([] as TagWithChip[])

	/** listener tags changed */
	const handleTags = (id: string) => {
		const currentTag = tagsWithChip.find((tag) => tag.PK == id)
		const currentTags = tagsWithChip.filter(
			(tag) => tag.selected == 'primary'
		)

		const newTagsWithChip = tagsWithChip.map((tag) => {
			if (tag.PK == currentTag.PK) {
				if (tag.selected == 'default')
					return { ...tag, selected: 'primary' } as TagWithChip
				else return { ...tag, selected: 'default' } as TagWithChip
			}
			return tag
		})

		/** limit */
		const selected = newTagsWithChip.filter(
			(tag) => tag.selected == 'primary'
		)
		if (selected.length > tagLimitCount) {
			// notification(`タグは${tagLimitCount}個までです！`, 'info')
			showTips(`タグは${tagLimitCount}個までです！`, 'info')
			/** return to previous state */
			const newTags = currentTags.map((tag) => tag.name)
			setVideoRow({ ...videoRow, tags: newTags })
		} else {
			const newTags = selected.map((tag) => tag.name)
			setVideoRow({ ...videoRow, tags: newTags })
			setTagsWithChip(newTagsWithChip)
		}
	}

	/** init tags with chip */
	useEffect(() => {
		if (!tags) return
		const tagsWithChip: TagWithChip[] = tags.map((tag) => {
			// 名前当て危険かもしれない。。（重複を防ぐロジックがどこかに必要）
			// 新規の場合はタグなし
			if (videoRow.tags && videoRow.tags.find((t) => t == tag.name))
				return { ...tag, selected: 'primary' }
			else return { ...tag, selected: 'default' }
		})
		setTagsWithChip(tagsWithChip)
	}, [tags, videoRow.tags])

	return {
		tagsWithChip,
		handleTags,
		tagError,
	}
}
export default useTagConfig
