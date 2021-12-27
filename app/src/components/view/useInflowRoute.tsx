import { useAppContext } from 'src/foundations/AppProvider'
import { VideoDB } from 'src/interfaces/api'

/**
 * 動画詳細画面に遷移するパスに流入経路をクエリとして付与する
 * @param {VideoDB} video video data
 * @returns path to detail view
 */
const useInflowRoute = (video: VideoDB) => {
	const { state } = useAppContext()

	const createPath = () => {
		const url = `/player/${video.uri.split('/')[2]}?`
		switch (state.prevAction) {
			case 'searchTag':
				if (state.searchTag) return `${url}tag=${state.searchTag}`
				else return url
			case 'searchCategory':
				if (state.searchCategory)
					return `${url}category=${state.searchCategory}`
				else return url
			case 'searchWord':
				if (state.searchWord) return `${url}text=${state.searchWord}`
				else return url
			case 'history':
				return `${url}_tag=${video.tagIds[0]}&history=true`
			case 'favorite':
				return `${url}_tag=${video.tagIds[0]}&favorite=true`
			default:
				// 再生リスト用のダミーTag
				if (video.tagIds) return `${url}_tag=${video.tagIds[0]}`
				else return url
		}
	}
	return {
		createPath,
	}
}
export default useInflowRoute
