/**
 * Reducerで状態管理するパラメータの型定義はまとめる
 * (複数箇所から参照されることが多いので。。)
 */

export type TagDev = {
	id: string
	name: string
	count: number
	description: string
}
export type TagWithChip = TagDev & { selected: 'default' | 'primary' }

export type Tag = {
	SortKey: string
	TagName: string
	VideoId?: string
}

export type VideoDev = {
	id: string
	title: string
	description: string
	primary: string
	secondary: string
	tag: string[]
	// path: string[]
	path: { [key: string]: number }
	thumbnail: string
	src?: string
}
export type VideoOrderDev = VideoDev & { order: number }

export type CategoryDev = {
	id: string
	name: string
	description: string
	children?: CategoryDev[]
}
export type CategoryRow = {
	id: string
	secondary: string
	primaryId: string
	primary: string
	description: string
}

export type UserDev = {
	id: string
	name: string
	email: string
	// acl: '管理者' | '閲覧者'
	acl: string
	lastLogin: string
}
export type GoogleUser = {
	email: string
	name: string
	image: string
}

export type PathDev = {
	id: string
	name: string
	count: number
	description: string
	createdUser: string
}

export type BannerDev = {
	id: string
	invalid: boolean
	image: string
	name: string
	text: string
	link: string
}
