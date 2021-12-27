import {
	format,
	differenceInMinutes,
	differenceInHours,
	differenceInCalendarDays,
	differenceInCalendarWeeks,
	differenceInCalendarMonths,
	differenceInCalendarYears,
	addSeconds,
} from 'date-fns'

/**
 * ゼロ埋めした4桁IDを返す
 * @param latestId
 * @param initial
 * @returns
 */
export function getLatestId(latestId: string, initial: string) {
	// const latestId = tags.slice(-1)[0].id
	const num = Number(latestId.split(initial)[1])
	return `${initial}${`00000${num + 1}`.slice(-3)}`
}

/**
 * 秒を、HH:MM:SSに変換する
 * @param sec
 * @returns
 */
export function convSecToPlaytime(sec: number) {
	const zeroPadding = (num: number) => `00000${num}`.slice(-2)
	const timeH = Math.floor((sec % (24 * 60 * 60)) / (60 * 60))
	const timeM = Math.floor(((sec % (24 * 60 * 60)) % (60 * 60)) / 60)
	const timeS = ((sec % (24 * 60 * 60)) % (60 * 60)) % 60

	if (timeH > 0) {
		return `${zeroPadding(timeH)}:${zeroPadding(timeM)}:${zeroPadding(
			timeS
		)}`
	} else {
		return `${zeroPadding(timeM)}:${zeroPadding(timeS)}`
	}
}

/**
 * タイムスタンプから動画コンテンツがいつ配信されたかを文字列で返す
 * @param timestamp yyyy-mm-dd hh:mm:ss
 * @returns
 */
export function getVideoCreated(timestamp) {
	/** within 60 minutes */
	const mins = differenceInMinutes(new Date(), new Date(timestamp))
	if (mins <= 60) return `${mins}分前`
	/** within 24 hours */
	const hours = differenceInHours(new Date(), new Date(timestamp))
	if (hours <= 24) return `${hours}時間前`

	const days = differenceInCalendarDays(new Date(), new Date(timestamp))
	/** within 7 days */
	if (days <= 7) return `${days}日前`
	/** within 30 days */
	if (days <= 30) {
		const weeks = differenceInCalendarWeeks(new Date(), new Date(timestamp))
		return `${weeks}週間前`
	}
	/** within 12 months */
	const months = differenceInCalendarMonths(new Date(), new Date(timestamp))
	if (months <= 12) return `${months}ヶ月前`
	/** over 1 years */
	const years = differenceInCalendarYears(new Date(), new Date(timestamp))
	return `${years}年前`
}

/**
 * 現在日時を日付文字列で返す
 * @returns
 */
export function getYYYYMMDDHHMMSS(sec = 0) {
	const ret = addSeconds(new Date(), sec)
	return format(ret, 'yyyy-MM-dd HH:mm:ss')
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow strict
 * @emails oncall+draft_js
 */
const seenKeys = {}
const MULTIPLIER = Math.pow(2, 24)

export function generateRandomKey(): string {
	let key
	while (key === undefined || key in seenKeys || !isNaN(+key)) {
		key = Math.floor(Math.random() * MULTIPLIER).toString(32)
	}
	seenKeys[key] = true
	return key
}
