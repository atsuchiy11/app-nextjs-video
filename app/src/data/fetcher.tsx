import _ from 'lodash'
import axios from 'src/foundations/axios'

import {
	Path,
	Tag,
	Category,
	User,
	UserHistory,
	Favorite,
	Likes,
	Thread,
	Banner,
	VideoTableRow,
	UploadStatus,
	VideoDB,
} from 'src/interfaces/api'

/**
 * fetch learning paths
 * @param url /paths
 * @returns learning paths
 */
export const getPaths = async (_: string) => {
	const paths = await axios.get('/paths/paths')
	const videos = await axios.get('/paths/videos')
	paths.data.map((path, index) => {
		path['id'] = index + 1
		path['videos'] = []
		const _videos = videos.data
			.filter((video) => video.PK == path.PK)
			.map((video) => ({ uri: video.SK, order: video.order }))
		if (_videos) path['videos'] = _videos
	})
	return Promise.resolve(paths.data as Path[])
}
/**
 * fetch learning path by id
 * @param url /path/{path_id}
 * @returns
 */
export const getPath = async (url: string) => {
	const res = await axios.get<Path>(url)
	return Promise.resolve(res.data)
}

/**
 * fetch path count
 * @param url /paths?count=true
 * @returns path count
 */
export const getPathCount = async (url: string) => {
	const res = await axios.get<Path[]>(url)
	return Promise.resolve({ count: res.data.length })
}

/**
 * fetch specified video
 * @param url /video/{video_id}
 * @returns video
 */
export const getVideo = async (url: string) => {
	const res = await axios.get<VideoDB>(url)
	return Promise.resolve(res.data)
}

/**
 * fetch videos
 * @param url /videos
 * @returns videos released
 */
export const getVideos = async (url: string) => {
	const params = {
		categoryId: '',
		tagId: '',
		learningPathId: '',
		name: '',
	}
	const res = await axios.post<VideoDB[]>(url, params)
	// remove no match videos
	if (url.indexOf('open=false') >= 0) {
		return Promise.resolve(res.data)
	} else {
		const videos = res.data.filter((v) => v.match)
		return Promise.resolve(videos)
	}
}

/**
 * fetch video table data
 * @param url /table/videos
 * @returns table rows for video
 */
interface Props {
	(
		url: string,
		_videos?: VideoDB[],
		_categories?: Category[],
		_tags?: Tag[],
		_paths?: Path[],
		_users?: User[]
	): Promise<VideoTableRow[]>
}
export const getVideoRows: Props = async (
	_,
	_videos,
	_categories,
	_tags,
	_paths,
	_users
) => {
	let videos = [] as VideoDB[]
	let categories = [] as Category[]
	let tags = [] as Tag[]
	let paths = [] as Path[]
	let users = [] as User[]

	_videos
		? (videos = _videos)
		: (videos = await getVideos('/videos?open=false'))
	_categories
		? (categories = _categories)
		: (categories = await getCategories('/categories'))
	_tags ? (tags = _tags) : (tags = await getTags('/tags'))
	_paths ? (paths = _paths) : (paths = await getPaths('/paths'))
	_users ? (users = _users) : (users = await getUsers('/users'))

	const rows = [] as VideoTableRow[]
	videos.map((video, index) => {
		const row = {} as VideoTableRow
		row.id = index + 1
		row.match = video.match
		row.uri = video.PK
		row.invalid = video.invalid
		row.thumbnail = video.thumbnail
		row.name = video.name
		row.description = video.description
		// find category
		const secondary = categories.find((c) => c.PK == video.categoryId)
		if (!secondary) {
			row.primary = ''
			row.secondary = ''
		} else {
			const primary = categories.find((c) => c.PK == secondary.parentId)
			row.primary = primary.name
			row.secondary = secondary.name
		}
		// find tags
		if (!video.tagIds) {
			row.tags = []
		} else {
			const sorted = tags
				.filter((t) => video.tagIds.find((id) => id == t.PK))
				.map((t) => t.name)
			row.tags = sorted
		}
		// find learning paths
		if (!video.learningPathIds) {
			row.paths = []
		} else {
			const sorted = paths
				.filter((p) => video.learningPathIds.find((id) => id == p.PK))
				.map((p) => p.name)
			row.paths = sorted
		}
		// find user
		if (!video.createdUser) {
			row.createdUser = ''
			row.updatedUser = ''
		} else {
			row.createdUser = users.find((u) => u.PK == video.createdUser).name
			row.updatedUser = users.find((u) => u.PK == video.updatedUser).name
		}
		row.note = video.note
		row.duration = video.duration
		row.plays = video.plays
		row.createdAt = video.createdAt
		row.updatedAt = video.updatedAt

		rows.push(row)
	})
	return Promise.resolve(rows)
}

/**
 * fetch video count
 * @param url /db/videos?all=true&count=true
 * @returns video count
 */
export const getVideoCount = async (url: string) => {
	const params = {
		categoryId: '',
		tagId: '',
		learningPathId: '',
		name: '',
	}
	const res = await axios.post<VideoDB[]>(url, params)
	const released = res.data.filter((video) => !video.invalid)
	return Promise.resolve({
		all: res.data.length,
		released: released.length,
	})
}

/**
 * fetch tags
 * @param url /tags
 * @returns tags
 */
export const getTags = async (url: string) => {
	const res = await axios.get<Tag[]>(url)
	return Promise.resolve(res.data)
}

/**
 * fetch tags count
 * @param url /tags?count=true
 * @returns tag count
 */
export const getTagCount = async (url: string) => {
	const res = await axios.get<Tag[]>(url)
	return Promise.resolve({ count: res.data.length })
}

/**
 * fetch users
 * @param url /users
 * @returns users
 */
export const getUsers = async (url: string) => {
	const res = await axios.get<User[]>(url)
	return Promise.resolve(res.data)
}

/**
 * fetch user count
 * @param url /users?count=true
 * @returns user count
 */
export const getUserCount = async (url: string) => {
	const res = await axios.get<User[]>(url)
	return Promise.resolve({ count: res.data.length })
}

/**
 * fetch login users today
 * @param url /users/login
 * @returns user count
 */
export const getLoginUsers = async (url: string) => {
	const res = await axios.get(url)
	return Promise.resolve(res.data)
}

/**
 * fetch categories
 * @param url /categories
 * @returns categories
 */
export const getCategories = async (url: string) => {
	const res = await axios.get<Category[]>(url)
	return Promise.resolve(res.data)
}

/**
 * fetch category count
 * @param url /categories?count=true
 * @returns category count
 */
export const getCategoryCount = async (url: string) => {
	const res = await axios.get<Category[]>(url)
	return Promise.resolve({ count: res.data.length })
}

/**
 * fetch histories today
 * @param url /history
 * @returns video histories for each user
 */
export const getHistory = async (url: string) => {
	const res = await axios.get<UserHistory[]>(url)
	return Promise.resolve(res.data)
}

/**
 * fetch history count
 * @param url /history?count=true
 * @returns history count
 */
export const getHistoryCount = async (url: string) => {
	const res = await axios.get(url)
	return Promise.resolve(res.data)
}
/**
 * fetch favorites
 * @param url /favorite
 * @returns favorite videos for each user
 */
export const getFavorite = async (url: string) => {
	const res = await axios.get<Favorite[]>(url)
	return Promise.resolve(res.data)
}

/**
 * fetch likes for video
 * @param url /like/{video_id}
 * @returns likes for each video
 */
export const getLikes = async (url: string) => {
	const res = await axios.get<Likes>(url)
	return Promise.resolve(res.data)
}

/**
 * fetch threads for video
 * @param url /thread/{video_id}
 * @returns threads for each video
 */
export const getThreads = async (url: string) => {
	const res = await axios.get<Thread[]>(url)
	return Promise.resolve(res.data)
}

/**
 * fetch active banner
 * @param url /banners?active=true
 * @returns active banner
 */
export const getBanners = async (url: string) => {
	const res = await axios.get<Banner[]>(url)
	return Promise.resolve(res.data)
}

/**
 * fetch upload status
 * @param url /upload/status
 * @returns upload status today
 */
export const getStatus = async (url: string) => {
	const res = await axios.get<UploadStatus[]>(url)
	return Promise.resolve(res.data)
}
