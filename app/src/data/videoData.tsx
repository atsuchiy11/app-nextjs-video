import * as React from 'react'
import {
	GridColDef,
	GridCellParams,
	GridValueFormatterParams,
} from '@material-ui/data-grid'
import VideoChip from 'src/atoms/VideoChip'
import Image from 'next/image'
import { VideoDev } from 'src/interfaces'

const imageColumnWidth = 200
export const imageColumnHeight = (imageColumnWidth * 9) / 16

/**
 * 本番用インターフェース
 */
import { convSecToPlaytime } from 'src/foundations/util'
import Chip from '@material-ui/core/Chip'
import ColumnWithChip from 'src/atoms/TableColumnWithChip'
import StatusChip from 'src/atoms/StatusChip'

/**
 * 列定義と行定義をエクスポートする
 */
export const columns: GridColDef[] = [
	{ field: 'id', headerName: 'No.', width: 100 },
	{
		field: 'uri',
		headerName: 'URI',
		width: 120,
		hide: true,
		renderCell: (params: GridCellParams) => (
			<ColumnWithChip value={params.value as string} />
		),
	},
	{
		field: 'match',
		headerName: '状態',
		width: 120,
		// hide: true,
		renderCell: (params: GridCellParams) => (
			<StatusChip value={params.value as string} />
		),
	},
	{
		field: 'invalid',
		headerName: '公開',
		width: 120,
		renderCell: (params: GridCellParams) => (
			<Chip
				label={params.value ? '非公開' : '公開中'}
				color={params.value ? 'default' : 'primary'}
			/>
		),
	},
	{
		field: 'thumbnail',
		headerName: 'サムネイル',
		width: imageColumnWidth,
		renderCell: (params: GridCellParams) => (
			<Image
				src={params.value ? (params.value as string) : '/no-image.png'}
				width={params.colDef.width}
				height={imageColumnHeight}
			/>
		),
	},
	{
		field: 'name',
		headerName: 'タイトル',
		width: 180,
		renderCell: (params: GridCellParams) => (
			<ColumnWithChip value={params.value as string} />
		),
	},
	{
		field: 'primary',
		headerName: '親カテゴリ',
		width: 150,
		renderCell: (params: GridCellParams) => (
			<ColumnWithChip value={params.value as string} />
		),
	},
	{
		field: 'secondary',
		headerName: '子カテゴリ',
		width: 150,
		renderCell: (params: GridCellParams) => (
			<ColumnWithChip value={params.value as string} />
		),
	},
	{
		field: 'tags',
		headerName: 'タグ',
		width: 240,
		renderCell: (params: GridCellParams) => (
			<VideoChip items={params.value as string[]} />
		),
	},
	{
		field: 'paths',
		headerName: '再生リスト',
		width: 300,
		renderCell: (params: GridCellParams) => (
			<VideoChip items={params.value as string[]} />
		),
	},
	{
		field: 'note',
		headerName: '備考',
		width: 300,
		renderCell: (params: GridCellParams) => (
			<ColumnWithChip value={params.value as string} />
		),
	},
	{
		field: 'duration',
		headerName: '再生時間',
		width: 150,
		hide: true,
		valueFormatter: (params: GridValueFormatterParams) => {
			return convSecToPlaytime(params.value as number)
		},
	},
	{ field: 'plays', headerName: '再生回数', width: 150, hide: true },
	{ field: 'createdAt', headerName: '作成日時', width: 160, hide: true },
	{
		field: 'createdUser',
		headerName: '作成者',
		width: 200,
		hide: true,
		renderCell: (params: GridCellParams) => (
			<ColumnWithChip value={params.value as string} />
		),
	},
	{ field: 'updatedAt', headerName: '更新日時', width: 160, hide: true },
	{
		field: 'updatedUser',
		headerName: '更新者',
		width: 200,
		hide: true,
		renderCell: (params: GridCellParams) => (
			<ColumnWithChip value={params.value as string} />
		),
	},
	{ field: 'description', headerName: '概要欄', width: 450, hide: true },
]

export const columnsDev: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 100 },
	{
		field: 'thumbnail',
		headerName: 'サムネイル',
		width: imageColumnWidth,
		renderCell: (params: GridCellParams) => (
			<Image
				src={params.value as string}
				width={params.colDef.width}
				height={imageColumnHeight}
			/>
		),
	},
	{ field: 'title', headerName: 'タイトル', width: 180 },
	{ field: 'primary', headerName: '親カテゴリ', width: 150 },
	{ field: 'secondary', headerName: '子カテゴリ', width: 150 },
	{
		field: 'tag',
		headerName: 'タグ',
		width: 300,
		renderCell: (params: GridCellParams) => (
			<VideoChip items={params.value as string[]} />
		),
	},
	{
		field: 'path',
		headerName: 'ラーニングパス',
		width: 300,
		valueGetter: (params) => {
			if (params.value) return Object.keys(params.value)
			return ''
		},
		renderCell: (params: GridCellParams) => (
			<VideoChip items={params.value as string[]} />
		),
	},
	{
		field: 'description',
		headerName: '概要',
		width: 450,
		hide: true,
	},
	{ field: 'creator', headerName: '作成者', width: 350, hide: true },
	{
		field: 'createdAt',
		headerName: '作成日時',
		width: 200,
		type: 'date',
		hide: true,
	},
	{ field: 'modifier', headerName: '更新者', width: 350, hide: true },
	{
		field: 'updatedAt',
		headerName: '更新日時',
		width: 200,
		type: 'date',
		hide: true,
	},
]

/** 再生リスト用の列定義 */
export const _columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 100 },
	{
		field: 'thumbnail',
		headerName: 'サムネイル',
		width: imageColumnWidth,
		renderCell: (params: GridCellParams) => (
			<Image
				src={params.value as string}
				width={params.colDef.width}
				height={imageColumnHeight}
			/>
		),
	},
	{ field: 'title', headerName: 'タイトル', width: 180 },
	{ field: 'primary', headerName: '親カテゴリ', width: 150 },
	{ field: 'secondary', headerName: '子カテゴリ', width: 150 },
	{
		field: 'tag',
		headerName: 'タグ',
		width: 250,
		renderCell: (params: GridCellParams) => (
			<VideoChip items={params.value as string[]} />
		),
		hide: true,
	},
	{
		field: 'path',
		headerName: 'ラーニングパス',
		width: 300,
		valueGetter: (params) => {
			if (params.value) return Object.keys(params.value)
			return ''
		},
		renderCell: (params: GridCellParams) => (
			<VideoChip
				items={params.value as string[]}
				// primary={path.name}
			/>
		),
	},
	{ field: 'order', headerName: '再生順', width: 120 },
]

/** ラーニングパスダイアログ用の列定義（仮） */
const _width = 150
export const _height = (_width * 9) / 16
export const dialogColumns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 100 },
	{
		field: 'thumbnail',
		headerName: 'サムネイル',
		width: _width,
		renderCell: (params: GridCellParams) => (
			<Image
				src={params.value as string}
				width={params.colDef.width}
				height={_height}
			/>
		),
	},
	{ field: 'title', headerName: 'タイトル', width: 180 },
	{ field: 'primary', headerName: '親カテゴリ', width: 150, hide: true },
	{ field: 'secondary', headerName: '子カテゴリ', width: 150 },
	{
		field: 'tag',
		headerName: 'タグ',
		width: 300,
		renderCell: (params: GridCellParams) => (
			<VideoChip items={params.value as string[]} />
		),
	},
	{
		field: 'path',
		headerName: 'ラーニングパス',
		width: 300,
		valueGetter: (params) => Object.keys(params.value),
		renderCell: (params: GridCellParams) => (
			<VideoChip items={params.value as string[]} />
		),
	},
	{
		field: 'description',
		headerName: '概要',
		width: 450,
		hide: true,
	},
	{ field: 'creator', headerName: '作成者', width: 350, hide: true },
	{
		field: 'createdAt',
		headerName: '作成日時',
		width: 200,
		type: 'date',
		hide: true,
	},
	{ field: 'modifier', headerName: '更新者', width: 350, hide: true },
	{
		field: 'updatedAt',
		headerName: '更新日時',
		width: 200,
		type: 'date',
		hide: true,
	},
]

/**
 * 行定義（DBデータ想定）
 * 本番データはカテゴリ、タグ、ラーニングパスはIDになる
 */
export const videoTemplate: VideoDev = {
	id: '',
	title: '',
	description: '',
	primary: '',
	secondary: '',
	tag: [],
	path: {},
	thumbnail: '',
}

export const rows = [
	{
		id: 'V001',
		title: 'Video Title_1',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		primary: '研修',
		secondary: 'プライムアカデミー',
		tag: ['デジタルツール', '営業'],
		path: {
			新入社員入社時: 1,
			顧客理解研修: 2,
		},
		thumbnail: '/city.jpg',
	},
	{
		id: 'V002',
		title: 'Video Title_2',
		description: '概要欄',
		primary: '社内広報',
		secondary: '人事・総務',
		tag: ['若手', '勤怠'],
		path: { 新入社員入社時: 2 },
		thumbnail: '/city.jpg',
	},
	{
		id: 'V003',
		title: 'Video Title_3',
		description: '概要欄',
		primary: '研修',
		secondary: 'METHOD共有会',
		tag: ['コンサルティング', '若手'],
		path: { コンサルティング研修: 1 },
		thumbnail: '/city.jpg',
	},
	{
		id: 'V004',
		title: 'Video Title_4',
		description: '概要欄',
		primary: '研修',
		secondary: 'その他',
		tag: ['JavaScript', '若手'],
		path: { エンジニア育成研修: 1 },
		thumbnail: '/city.jpg',
	},
	{
		id: 'V005',
		title: 'Video Title_5',
		description: '概要欄',
		primary: '研修',
		secondary: 'プライムアカデミー',
		tag: ['営業', '若手'],
		path: { 新入社員入社時: 3 },
		thumbnail: '/city.jpg',
	},
	{
		id: 'V006',
		title: 'Video Title_6',
		description: '概要欄',
		primary: '社内広報',
		secondary: '経理',
		tag: ['若手', '勤怠'],
		path: { 新入社員入社時: 4 },
		thumbnail: '/city.jpg',
	},
	{
		id: 'V007',
		title: 'Video Title_7',
		description: '概要欄',
		primary: '研修',
		secondary: 'METHOD共有会',
		tag: ['コンサルティング', '若手'],
		path: { コンサルティング研修: 2 },
		thumbnail: '/city.jpg',
	},
	{
		id: 'V008',
		title: 'Video Title_8',
		description: '概要欄',
		primary: '研修',
		secondary: 'その他',
		tag: ['JavaScript', '若手'],
		path: { エンジニア育成研修: 2 },
		thumbnail: '/city.jpg',
	},
	{
		id: 'V009',
		title: 'Video Title_9',
		description: '概要欄',
		primary: '研修',
		secondary: 'その他',
		tag: ['営業', '若手'],
		path: { 新入社員入社時: 5 },
		thumbnail: '/city.jpg',
	},
	{
		id: 'V010',
		title: 'Video Title_10',
		description: '概要欄',
		primary: '社内広報',
		secondary: 'その他',
		tag: ['若手', '勤怠'],
		path: { 新入社員入社時: 6 },
		thumbnail: '/city.jpg',
	},
	{
		id: 'V011',
		title: 'Video Title_11',
		description: '概要欄',
		primary: '研修',
		secondary: 'METHOD共有会',
		tag: ['コンサルティング', '若手'],
		path: { コンサルティング研修: 3 },
		thumbnail: '/city.jpg',
	},
	{
		id: 'V012',
		title: 'Video Title_12',
		description: '概要欄',
		primary: '研修',
		secondary: 'プライムアカデミー',
		tag: ['JavaScript', '若手'],
		path: { エンジニア育成研修: 3 },
		thumbnail: '/city.jpg',
	},
]

/**
 * 本番データ
 */
// export const demoData = [
// 	{
// 		indexKey: 'Video',
// 		PK: '/videos/564506284',
// 		SK: '/videos/564506284',
// 		createdAt: '2021-08-01 09:35:12',
// 		createdUser: 'a2-tsuchiya@prime-x.co.jp',
// 		updatedAt: '2021-08-01 09:35:12',
// 		updatedUser: 'a2-tsuchiya@prime-x.co.jp',
// 		invalid: false,
// 		note: 'No Remarks',
// 		description:
// 			'{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://www.prime-x.co.jp/works-tag/creative/"}},"1":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://google.co.jp"}}},"blocks":[{"key":"clpo0","text":"動画コンテンツの概要欄です。文字を大きくできます","type":"header-two","depth":0,"entityRanges":[],"inlineStyleRanges":[]},{"key":"b1nuk","text":"Bold: こんな感じで太字を使うことができます。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":2,"style":"BOLD"}],"entityRanges":[]},{"key":"b84td","text":"Italic: こんな感じでイタリック（斜体文字）を使うことができます。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":11,"style":"ITALIC"}],"entityRanges":[]},{"key":"c0mcd","text":"Underline: こんな感じで下線にすることもできます。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":17,"length":5,"style":"UNDERLINE"}],"entityRanges":[]},{"key":"d70op","text":"トン","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"4le0c","text":"チン","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"d17am","text":"カン","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b4mv2","text":"↑順序なしリスト","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5c8h0","text":"First","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"buqb0","text":"Second","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"do6no","text":"Third","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"4kkpu","text":"↑順序ありリスト","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"br9pi","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"v7id","text":"↑空の改行も入ります","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"70tbh","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"adn6g","text":"https://www.prime-x.co.jp/works-tag/creative/ ←こんな感じでURLをリンクにすることができます。","type":"unstyled","depth":0,"entityRanges":[{"offset":0,"length":45,"key":0}],"inlineStyleRanges":[]},{"key":"7ivvp","text":"こんな感じでリンク付きテキストにすることもできます。","type":"unstyled","depth":0,"entityRanges":[{"offset":6,"length":3,"key":1}],"inlineStyleRanges":[]},{"key":"c9d0o","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"f3ctu","text":"他に欲しいものあれば作れます。画像とかコードブロックとか。。","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}',
// 		learningPathIds: ['L001'],
// 		tagIds: ['T001'],
// 		categoryId: 'C007',
// 		uri: '/videos/564506284',
// 		name: 'mov_hts-samp010',
// 		// description: null,
// 		duration: 19,
// 		stats: {
// 			plays: 36,
// 		},
// 		privacy: {
// 			view: 'anybody',
// 		},
// 		html: '<iframe src="https://player.vimeo.com/video/564506284?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=213894&amp;h=c1c83ddd57" width="1920" height="1080" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="mov_hts-samp010"></iframe>',
// 		thumbnail: {
// 			width: 1920,
// 			height: 1080,
// 			link: 'https://i.vimeocdn.com/video/1166975432_1920x1080?r=pad',
// 			link_with_play_button:
// 				'https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1166975432_1920x1080&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png',
// 		},
// 	},
// 	{
// 		indexKey: 'Video',
// 		PK: '/videos/543097654',
// 		SK: '/videos/543097654',
// 		createdAt: '2021-08-03 21:05:41',
// 		createdUser: 'a2-tsuchiya@prime-x.co.jp',
// 		updatedAt: '2021-08-03 21:05:41',
// 		updatedUser: 'a2-tsuchiya@prime-x.co.jp',
// 		invalid: false,
// 		note: 'No Remarks',
// 		description:
// 			'{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://www.prime-x.co.jp/works-tag/creative/"}},"1":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://google.co.jp"}}},"blocks":[{"key":"clpo0","text":"動画コンテンツの概要欄です。文字を大きくできます","type":"header-two","depth":0,"entityRanges":[],"inlineStyleRanges":[]},{"key":"b1nuk","text":"Bold: こんな感じで太字を使うことができます。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":2,"style":"BOLD"}],"entityRanges":[]},{"key":"b84td","text":"Italic: こんな感じでイタリック（斜体文字）を使うことができます。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":11,"style":"ITALIC"}],"entityRanges":[]},{"key":"c0mcd","text":"Underline: こんな感じで下線にすることもできます。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":17,"length":5,"style":"UNDERLINE"}],"entityRanges":[]},{"key":"d70op","text":"トン","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"4le0c","text":"チン","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"d17am","text":"カン","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b4mv2","text":"↑順序なしリスト","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5c8h0","text":"First","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"buqb0","text":"Second","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"do6no","text":"Third","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"4kkpu","text":"↑順序ありリスト","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"br9pi","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"v7id","text":"↑空の改行も入ります","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"70tbh","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"adn6g","text":"https://www.prime-x.co.jp/works-tag/creative/ ←こんな感じでURLをリンクにすることができます。","type":"unstyled","depth":0,"entityRanges":[{"offset":0,"length":45,"key":0}],"inlineStyleRanges":[]},{"key":"7ivvp","text":"こんな感じでリンク付きテキストにすることもできます。","type":"unstyled","depth":0,"entityRanges":[{"offset":6,"length":3,"key":1}],"inlineStyleRanges":[]},{"key":"c9d0o","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"f3ctu","text":"他に欲しいものあれば作れます。画像とかコードブロックとか。。","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}',
// 		learningPathIds: ['L002'],
// 		tagIds: ['T002'],
// 		categoryId: 'C005',
// 		uri: '/videos/543097654',
// 		name: 'mov_hts-samp005',
// 		// description: null,
// 		duration: 22,
// 		stats: {
// 			plays: 42,
// 		},
// 		privacy: {
// 			view: 'anybody',
// 		},
// 		html: '<iframe src="https://player.vimeo.com/video/543097654?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=213894&amp;h=be19d11ee1" width="1920" height="1080" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="mov_hts-samp005"></iframe>',
// 		thumbnail: {
// 			width: 1920,
// 			height: 1080,
// 			link: 'https://i.vimeocdn.com/video/1124264485_1920x1080?r=pad',
// 			link_with_play_button:
// 				'https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1124264485_1920x1080&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png',
// 		},
// 	},
// 	{
// 		indexKey: 'Video',
// 		PK: '/videos/561734799',
// 		SK: '/videos/561734799',
// 		createdAt: '2021-08-02 10:25:36',
// 		createdUser: 'a2-tsuchiya@prime-x.co.jp',
// 		updatedAt: '2021-08-02 10:25:36',
// 		updatedUser: 'a2-tsuchiya@prime-x.co.jp',
// 		invalid: true,
// 		note: 'No Remarks',
// 		description:
// 			'{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://www.prime-x.co.jp/works-tag/creative/"}},"1":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://google.co.jp"}}},"blocks":[{"key":"clpo0","text":"動画コンテンツの概要欄です。文字を大きくできます","type":"header-two","depth":0,"entityRanges":[],"inlineStyleRanges":[]},{"key":"b1nuk","text":"Bold: こんな感じで太字を使うことができます。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":2,"style":"BOLD"}],"entityRanges":[]},{"key":"b84td","text":"Italic: こんな感じでイタリック（斜体文字）を使うことができます。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":11,"style":"ITALIC"}],"entityRanges":[]},{"key":"c0mcd","text":"Underline: こんな感じで下線にすることもできます。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":17,"length":5,"style":"UNDERLINE"}],"entityRanges":[]},{"key":"d70op","text":"トン","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"4le0c","text":"チン","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"d17am","text":"カン","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b4mv2","text":"↑順序なしリスト","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5c8h0","text":"First","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"buqb0","text":"Second","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"do6no","text":"Third","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"4kkpu","text":"↑順序ありリスト","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"br9pi","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"v7id","text":"↑空の改行も入ります","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"70tbh","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"adn6g","text":"https://www.prime-x.co.jp/works-tag/creative/ ←こんな感じでURLをリンクにすることができます。","type":"unstyled","depth":0,"entityRanges":[{"offset":0,"length":45,"key":0}],"inlineStyleRanges":[]},{"key":"7ivvp","text":"こんな感じでリンク付きテキストにすることもできます。","type":"unstyled","depth":0,"entityRanges":[{"offset":6,"length":3,"key":1}],"inlineStyleRanges":[]},{"key":"c9d0o","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"f3ctu","text":"他に欲しいものあれば作れます。画像とかコードブロックとか。。","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}',
// 		learningPathIds: ['L001', 'L002', 'L003'],
// 		tagIds: [''],
// 		categoryId: 'C006',
// 		uri: '/videos/561734799',
// 		name: 'mov_hts-samp010',
// 		// description: '動画の説明',
// 		duration: 19,
// 		stats: {
// 			plays: 5,
// 		},
// 		privacy: {
// 			view: 'nobody',
// 		},
// 		html: '<iframe src="https://player.vimeo.com/video/561734799?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=213894&amp;h=7194bb98d2" width="1920" height="1080" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="mov_hts-samp010"></iframe>',
// 		thumbnail: {
// 			width: 1920,
// 			height: 1080,
// 			link: 'https://i.vimeocdn.com/video/1166976637_1920x1080?r=pad',
// 			link_with_play_button:
// 				'https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1166976637_1920x1080&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png',
// 		},
// 	},
// ]
export const demoData = [
	{
		indexKey: 'Video',
		PK: '/videos/596533406',
		SK: '/videos/596533406',
		createdAt: '2021-08-03 21:05:41',
		createdUser: 'a2-tsuchiya@prime-x.co.jp',
		updatedAt: '2021-08-03 21:05:41',
		updatedUser: 'a2-tsuchiya@prime-x.co.jp',
		invalid: false,
		note: 'No Remarks',
		description:
			'{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://www.prime-x.co.jp/works-tag/creative/"}},"1":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://google.co.jp"}}},"blocks":[{"key":"clpo0","text":"動画コンテンツの概要欄です。文字を大きくできます","type":"header-two","depth":0,"entityRanges":[],"inlineStyleRanges":[]},{"key":"b1nuk","text":"Bold: こんな感じで太字を使うことができます。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":2,"style":"BOLD"}],"entityRanges":[]},{"key":"b84td","text":"Italic: こんな感じでイタリック（斜体文字）を使うことができます。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":11,"style":"ITALIC"}],"entityRanges":[]},{"key":"c0mcd","text":"Underline: こんな感じで下線にすることもできます。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":17,"length":5,"style":"UNDERLINE"}],"entityRanges":[]},{"key":"d70op","text":"トン","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"4le0c","text":"チン","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"d17am","text":"カン","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b4mv2","text":"↑順序なしリスト","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5c8h0","text":"First","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"buqb0","text":"Second","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"do6no","text":"Third","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"4kkpu","text":"↑順序ありリスト","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"br9pi","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"v7id","text":"↑空の改行も入ります","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"70tbh","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"adn6g","text":"https://www.prime-x.co.jp/works-tag/creative/ ←こんな感じでURLをリンクにすることができます。","type":"unstyled","depth":0,"entityRanges":[{"offset":0,"length":45,"key":0}],"inlineStyleRanges":[]},{"key":"7ivvp","text":"こんな感じでリンク付きテキストにすることもできます。","type":"unstyled","depth":0,"entityRanges":[{"offset":6,"length":3,"key":1}],"inlineStyleRanges":[]},{"key":"c9d0o","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"f3ctu","text":"他に欲しいものあれば作れます。画像とかコードブロックとか。。","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}',
		learningPathIds: ['L002'],
		tagIds: ['T002'],
		categoryId: 'C006',
		match: true,
		uri: '/videos/596533406',
		name: 'サンプル03',
		duration: 30,
		stats: {
			plays: 31,
		},
		privacy: {
			view: 'disable',
		},
		html: '<iframe src="https://player.vimeo.com/video/596533406?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=224354&amp;h=ef6986a0ca" width="3840" height="2160" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="サンプル03"></iframe>',
		thumbnail: {
			width: 1920,
			height: 1080,
			link: 'https://i.vimeocdn.com/video/1231007473_1920x1080?r=pad',
			link_with_play_button:
				'https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1231007473_1920x1080&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png',
		},
	},
	{
		indexKey: 'Video',
		PK: '/videos/596388490',
		SK: '/videos/596388490',
		createdAt: '2021-08-02 10:25:36',
		createdUser: 'a2-tsuchiya@prime-x.co.jp',
		updatedAt: '2021-08-02 10:25:36',
		updatedUser: 'a2-tsuchiya@prime-x.co.jp',
		invalid: false,
		note: 'No Remarks',
		description:
			'{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://www.prime-x.co.jp/works-tag/creative/"}},"1":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://google.co.jp"}}},"blocks":[{"key":"clpo0","text":"動画コンテンツの概要欄です。文字を大きくできます","type":"header-two","depth":0,"entityRanges":[],"inlineStyleRanges":[]},{"key":"b1nuk","text":"Bold: こんな感じで太字を使うことができます。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":2,"style":"BOLD"}],"entityRanges":[]},{"key":"b84td","text":"Italic: こんな感じでイタリック（斜体文字）を使うことができます。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":11,"style":"ITALIC"}],"entityRanges":[]},{"key":"c0mcd","text":"Underline: こんな感じで下線にすることもできます。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":17,"length":5,"style":"UNDERLINE"}],"entityRanges":[]},{"key":"d70op","text":"トン","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"4le0c","text":"チン","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"d17am","text":"カン","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b4mv2","text":"↑順序なしリスト","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5c8h0","text":"First","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"buqb0","text":"Second","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"do6no","text":"Third","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"4kkpu","text":"↑順序ありリスト","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"br9pi","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"v7id","text":"↑空の改行も入ります","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"70tbh","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"adn6g","text":"https://www.prime-x.co.jp/works-tag/creative/ ←こんな感じでURLをリンクにすることができます。","type":"unstyled","depth":0,"entityRanges":[{"offset":0,"length":45,"key":0}],"inlineStyleRanges":[]},{"key":"7ivvp","text":"こんな感じでリンク付きテキストにすることもできます。","type":"unstyled","depth":0,"entityRanges":[{"offset":6,"length":3,"key":1}],"inlineStyleRanges":[]},{"key":"c9d0o","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"f3ctu","text":"他に欲しいものあれば作れます。画像とかコードブロックとか。。","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}',
		learningPathIds: ['L001', 'L002', 'L003'],
		tagIds: ['T003'],
		categoryId: 'C005',
		match: true,
		uri: '/videos/596388490',
		name: 'サンプル02',
		duration: 30,
		stats: {
			plays: 11,
		},
		privacy: {
			view: 'disable',
		},
		html: '<iframe src="https://player.vimeo.com/video/596388490?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=224354&amp;h=c770740eac" width="3840" height="2160" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="サンプル02"></iframe>',
		thumbnail: {
			width: 1920,
			height: 1080,
			link: 'https://i.vimeocdn.com/video/1230795591_1920x1080?r=pad',
			link_with_play_button:
				'https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1230795591_1920x1080&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png',
		},
	},
	{
		indexKey: 'Video',
		PK: '/videos/596317660',
		SK: '/videos/596317660',
		createdAt: '2021-08-01 09:35:12',
		createdUser: 'a2-tsuchiya@prime-x.co.jp',
		updatedAt: '2021-08-01 09:35:12',
		updatedUser: 'a2-tsuchiya@prime-x.co.jp',
		invalid: false,
		note: 'No Remarks',
		description:
			'{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://www.prime-x.co.jp/works-tag/creative/"}},"1":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://google.co.jp"}}},"blocks":[{"key":"clpo0","text":"動画コンテンツの概要欄です。文字を大きくできます","type":"header-two","depth":0,"entityRanges":[],"inlineStyleRanges":[]},{"key":"b1nuk","text":"Bold: こんな感じで太字を使うことができます。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":2,"style":"BOLD"}],"entityRanges":[]},{"key":"b84td","text":"Italic: こんな感じでイタリック（斜体文字）を使うことができます。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":11,"style":"ITALIC"}],"entityRanges":[]},{"key":"c0mcd","text":"Underline: こんな感じで下線にすることもできます。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":17,"length":5,"style":"UNDERLINE"}],"entityRanges":[]},{"key":"d70op","text":"トン","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"4le0c","text":"チン","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"d17am","text":"カン","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b4mv2","text":"↑順序なしリスト","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5c8h0","text":"First","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"buqb0","text":"Second","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"do6no","text":"Third","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"4kkpu","text":"↑順序ありリスト","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"br9pi","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"v7id","text":"↑空の改行も入ります","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"70tbh","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"adn6g","text":"https://www.prime-x.co.jp/works-tag/creative/ ←こんな感じでURLをリンクにすることができます。","type":"unstyled","depth":0,"entityRanges":[{"offset":0,"length":45,"key":0}],"inlineStyleRanges":[]},{"key":"7ivvp","text":"こんな感じでリンク付きテキストにすることもできます。","type":"unstyled","depth":0,"entityRanges":[{"offset":6,"length":3,"key":1}],"inlineStyleRanges":[]},{"key":"c9d0o","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"f3ctu","text":"他に欲しいものあれば作れます。画像とかコードブロックとか。。","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}',
		learningPathIds: ['L001'],
		tagIds: ['T001'],
		categoryId: 'C007',
		// match: true,
		match: false,
		uri: '/videos/596317660',
		name: 'サンプル01',
		duration: 19,
		stats: {
			plays: 24,
		},
		privacy: {
			view: 'disable',
		},
		html: '<iframe src="https://player.vimeo.com/video/596317660?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=224354&amp;h=6e23a9eca9" width="3840" height="2160" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="サンプル01"></iframe>',
		thumbnail: {
			width: 1920,
			height: 1080,
			link: 'https://i.vimeocdn.com/video/1230690262_1920x1080?r=pad',
			link_with_play_button:
				'https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1230690262_1920x1080&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png',
		},
	},
]
