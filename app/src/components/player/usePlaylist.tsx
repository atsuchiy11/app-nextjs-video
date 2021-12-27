import * as React from 'react'
import axios from 'src/foundations/axios'
import { useEffect, useState } from 'react'
import { useVideos } from 'src/foundations/hooks'
import { useRouter } from 'next/router'
import { Path } from 'src/interfaces/api'
import VideoItem from 'src/components/player/VideoItem'

const usePlaylist = () => {
	const router = useRouter()
	const { id, list, tag, _tag, category } = router.query
	const relatedTag = tag || _tag

	const { data: videos, error: videoError } = useVideos()
	const [path, setPath] = useState({} as Path)
	const [error, setError] = useState(null)

	useEffect(() => {
		if (!list) return
		axios
			.get<Path>(`/path/${list}`)
			.then((res) => res.data)
			.then(setPath)
			.catch(setError)
	}, [list])

	const getPlaylist = () => {
		if (!path.videos) return null
		const elements = path.videos.map((order) => {
			const item = videos.find((v) => v.PK == order.uri)
			if (!item) return
			const videoId = item.uri.split('/')[2]
			let nowPlaying = false
			if (id == videoId) nowPlaying = true
			const href = `/player/${videoId}?list=${list}`
			return (
				<VideoItem
					item={item}
					href={href}
					order={order.order}
					nowPlaying={nowPlaying}
					key={item.PK}
				/>
			)
		})
		return elements
	}
	const getRelatedList = () => {
		const elements = videos.map((item) => {
			if (item.tagIds.find((i) => i == relatedTag)) {
				let nowPlaying = false
				const videoId = item.uri.split('/')[2]
				if (id == videoId) nowPlaying = true
				const href = `/player/${videoId}?tag=${relatedTag}`
				return (
					<VideoItem
						item={item}
						href={href}
						order={0}
						nowPlaying={nowPlaying}
						key={item.PK}
					/>
				)
			}
		})
		return elements
	}
	const getCategoryList = () => {
		const elements = videos.map((item) => {
			if (item.categoryId == category) {
				let nowPlaying = false
				const videoId = item.uri.split('/')[2]
				if (id == videoId) nowPlaying = true
				const href = `/player/${videoId}?category=${category}`
				return (
					<VideoItem
						item={item}
						href={href}
						order={0}
						nowPlaying={nowPlaying}
						key={item.PK}
					/>
				)
			}
		})
		return elements
	}
	const getList = () => {
		if (list) return getPlaylist()
		if (relatedTag) return getRelatedList()
		if (category) return getCategoryList()
	}

	return {
		path,
		pathError: error,
		videos,
		videoError,
		getList,
	}
}
export default usePlaylist
