import React, { useEffect, useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import useSWR from 'swr'

import StatusCard from 'src/atoms/StatusCard'
import Grid from '@material-ui/core/Grid'

import {
	getCategoryCount,
	getHistoryCount,
	getLoginUsers,
	getPathCount,
	getTagCount,
	getUserCount,
	getVideoCount,
} from 'src/data/fetcher'

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		flexGrow: 1,
		marginBottom: theme.spacing(1),
	},
}))

export interface Param {
	primaryKey: string
	primaryTitle: string
	primaryText: string
	secondaryKey: string
	secondaryTitle: string
	secondaryText: string
}

const initParams: Param[] = [
	{
		primaryKey: 'view',
		primaryTitle: '本日の視聴数',
		primaryText: 'N/A',
		secondaryKey: 'login',
		secondaryTitle: '本日のログインユーザ',
		secondaryText: 'N/A',
	},
	{
		primaryKey: 'video',
		primaryTitle: '動画数',
		primaryText: 'N/A',
		secondaryKey: 'open',
		secondaryTitle: '公開中',
		secondaryText: 'N/A',
	},
	{
		primaryKey: 'tag',
		primaryTitle: 'タグ数',
		primaryText: 'N/A',
		secondaryKey: 'category',
		secondaryTitle: 'カテゴリ数',
		secondaryText: 'N/A',
	},
	{
		primaryKey: 'path',
		primaryTitle: '再生リスト数',
		primaryText: 'N/A',
		secondaryKey: 'user',
		secondaryTitle: 'ユーザ数',
		secondaryText: 'N/A',
	},
]

export const StatusGridList = (): JSX.Element => {
	const classes = useStyles()

	/**
	 * load cache /他に用途がないのでフックにしない
	 */
	const { data: videos, error: videoError } = useSWR(
		'/videos?open=false&count=true',
		getVideoCount
	)
	const { data: tags, error: tagError } = useSWR(
		'/tags?count=true',
		getTagCount
	)
	const { data: categories, error: categoryError } = useSWR(
		'/categories?count=true',
		getCategoryCount
	)
	const { data: users, error: userError } = useSWR(
		'/users?count=true',
		getUserCount
	)
	const { data: paths, error: pathError } = useSWR(
		'/paths?count=true',
		getPathCount
	)
	const { data: histories, error: historyError } = useSWR(
		'/histories?count=true',
		getHistoryCount
	)
	const { data: login, error: loginError } = useSWR(
		'/users/login',
		getLoginUsers
	)

	/** dashboard parameters */
	const [params, setParams] = useState(initParams)

	/** initialize */
	useEffect(() => {
		if (
			!videos ||
			!tags ||
			!categories ||
			!paths ||
			!users ||
			!histories ||
			!login
		)
			return
		const newParams = params.map((param) => {
			if (param.primaryKey == 'view') {
				return {
					...param,
					primaryText: histories.count
						? String(histories.count)
						: 'N/A',
					secondaryText: login.count ? String(login.count) : 'N/A',
				}
			} else if (param.primaryKey == 'video') {
				return {
					...param,
					primaryText: videos.all ? String(videos.all) : 'N/A',
					secondaryText: videos.released
						? String(videos.released)
						: 'N/A',
				}
			} else if (param.primaryKey == 'tag') {
				return {
					...param,
					primaryText: tags.count ? String(tags.count) : 'N/A',
					secondaryText: categories.count
						? String(categories.count)
						: 'N/A',
				}
			} else if (param.primaryKey == 'path') {
				return {
					...param,
					primaryText: paths.count ? String(paths.count) : 'N/A',
					secondaryText: users.count ? String(users.count) : 'N/A',
				}
			} else {
				return param
			}
		})
		setParams(newParams)
	}, [videos, tags, categories, paths, users])

	/** validate */
	if (videoError) return <div>failed to load videos.</div>
	if (tagError) return <div>failed to load tags.</div>
	if (categoryError) return <div>failed to load categories.</div>
	if (userError) return <div>failed to load users.</div>
	if (pathError) return <div>failed to load paths.</div>
	if (historyError) return <div>failed to load histories.</div>
	if (loginError) return <div>failed to load histories.</div>
	if (
		!videos ||
		!tags ||
		!categories ||
		!users ||
		!paths ||
		!histories ||
		!login
	)
		return <div>loading...</div>

	return (
		<Grid container spacing={3} className={classes.container}>
			{params.map((param, index) => {
				return (
					<Grid item xs={12} sm={6} md={3} key={index}>
						<StatusCard param={param} />
					</Grid>
				)
			})}
		</Grid>
	)
}

export default StatusGridList
