import _ from 'lodash'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppContext } from 'src/foundations/AppProvider'
import {
	useVideos,
	useHistory,
	useCategories,
	useTags,
	usePaths,
} from 'src/foundations/hooks'
import useFavorite from 'src/components/player/useFavorite'
import { VideoDB } from 'src/interfaces/api'

const useSearch = () => {
	const router = useRouter()
	const { state, dispatch } = useAppContext()
	const { data: videos } = useVideos()
	const { data: categories } = useCategories()
	const { data: tags } = useTags()
	const { data: paths } = usePaths()
	const { data: history } = useHistory()
	const { favorite } = useFavorite()

	// ちょっと使途不明。。一緒にしていいのかもちょっと自信ない。
	/** reset filter */
	useEffect(() => {
		if (router.query.from == 'player') return
		dispatch({
			searchTag: { payload: 'ALL' },
			searchCategory: { payload: 'ALL' },
			prevAction: { payload: '' },
		})
	}, [router.asPath])

	/**
	 * fitering videos
	 * filter priority: title, category, tag, playlist, description
	 */
	const nestSearch = (item: VideoDB, key: string, searchRegex: RegExp) => {
		switch (key) {
			case 'name':
				return searchRegex.test(item[key].toString())
			case 'categoryId':
				return categories.some((category) => {
					if (category.PK == item[key]) {
						return Object.keys(category).some((_key) => {
							return searchRegex.test(category[_key].toString())
						})
					}
				})
			case 'tagIds':
				return tags.some((tag) => {
					if (item[key].find((_tag) => _tag == tag.PK)) {
						return Object.keys(tag).some((_key) => {
							return searchRegex.test(tag[_key].toString())
						})
					}
				})
			case 'learningPathIds':
				return paths.some((path) => {
					if (item[key].find((_path) => _path == path.PK)) {
						return Object.keys(path).some((_key) => {
							return searchRegex.test(path[_key].toString())
						})
					}
				})
			case 'description':
				return searchRegex.test(item[key].toString())
		}
	}

	/** search videos */
	const requestSearch = () => {
		const searchKey = state.prevAction
		const searchValue = state[searchKey]
		const searchRegex = new RegExp(_.escapeRegExp(searchValue), 'i')
		const searchKeys = [
			'name',
			'categoryId',
			'tagIds',
			'learningPathIds',
			'description',
		]
		/** switch search type */
		let filteredVideos = [] as VideoDB[]
		switch (searchKey) {
			case 'searchTag':
				filteredVideos = videos.filter((video) => {
					if (
						searchValue == 'ALL' ||
						video.tagIds.find((tag) => tag == searchValue)
					)
						return video
				})
				break
			case 'searchCategory':
				filteredVideos = videos.filter((video) => {
					if (searchValue == 'ALL' || video.categoryId == searchValue)
						return video
				})
				break
			case 'searchWord':
				filteredVideos = videos.filter((item) => {
					return Object.keys(item).some((key) => {
						if (searchKeys.find((k) => k == key)) {
							return nestSearch(item, key, searchRegex)
						}
					})
				})
				break
			case 'history':
				filteredVideos = videos.filter((video) => {
					if (history.find((h) => video.PK == h.videoUri))
						return video
				})
				break
			case 'favorite':
				filteredVideos = videos.filter((video) => {
					if (favorite.find((f) => video.PK == f.SK)) return video
				})
				break
			default:
				filteredVideos = videos
				break
		}
		return filteredVideos
	}
	return {
		requestSearch,
	}
}
export default useSearch
