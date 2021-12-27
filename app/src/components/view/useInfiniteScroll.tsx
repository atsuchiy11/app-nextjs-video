import React, { useState, useEffect } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { useAppContext } from 'src/foundations/AppProvider'
import { getVideos } from 'src/data/fetcher'
import { useVideos } from 'src/foundations/hooks'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		flexGrow: 1,
	},
	loading: {
		margin: theme.spacing(4),
	},
}))

const limit = 100

const useInfiniteScroll = () => {
	const classes = useStyles()
	const { state } = useAppContext()
	const { data: videos, mutate } = useVideos()

	const initLoader = (
		<Typography component="h3" key="loading" className={classes.loading}>
			Load more...
		</Typography>
	)
	const [page, setPage] = useState(2)
	const [hasMore, setHasMore] = useState(true)
	const [loader, setLoader] = useState(initLoader)

	useEffect(() => {
		if (state.prevAction == '') {
			setLoader(initLoader)
		} else {
			setLoader(null)
		}
	}, [state.prevAction])

	const loadMore = () => {
		const fetchData = async () => {
			if (state.prevAction != '') return
			// このAPIは使えなくなる
			const moreVideos = await getVideos(`/videos/async?page=${page}`)
			if (moreVideos.length <= limit) setHasMore(false)
			setPage(page + 1)
			mutate([...videos, ...moreVideos], false)
		}
		fetchData()
	}

	return {
		loadMore,
		hasMore,
		loader,
	}
}
export default useInfiniteScroll
