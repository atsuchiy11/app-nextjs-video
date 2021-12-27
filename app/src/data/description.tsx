import { RawDraftContentState } from 'draft-js'
import { generateRandomKey } from 'src/foundations/util'

export const description: RawDraftContentState = {
	entityMap: {
		0: {
			type: 'LINK',
			mutability: 'MUTABLE',
			data: {
				url: 'https://www.prime-x.co.jp/works-tag/creative/',
			},
		},
		1: {
			type: 'LINK',
			mutability: 'MUTABLE',
			data: {
				url: 'https://google.co.jp',
			},
		},
	},
	blocks: [
		{
			key: generateRandomKey(),
			text: '動画コンテンツの概要欄です。文字を大きくできます',
			type: 'header-two',
			depth: 0,
			entityRanges: [],
			inlineStyleRanges: [],
		},
		{
			key: generateRandomKey(),
			text: 'Bold: こんな感じで太字を使うことができます。',
			type: 'unstyled',
			depth: 0,
			inlineStyleRanges: [
				{
					offset: 12,
					length: 2,
					style: 'BOLD',
				},
			],
			entityRanges: [],
		},
		{
			key: generateRandomKey(),
			text: 'Italic: こんな感じでイタリック（斜体文字）を使うことができます。',
			type: 'unstyled',
			depth: 0,
			inlineStyleRanges: [
				{
					offset: 12,
					length: 11,
					style: 'ITALIC',
				},
			],
			entityRanges: [],
		},
		{
			key: generateRandomKey(),
			text: 'Underline: こんな感じで下線にすることもできます。',
			type: 'unstyled',
			depth: 0,
			inlineStyleRanges: [
				{
					offset: 17,
					length: 5,
					style: 'UNDERLINE',
				},
			],
			entityRanges: [],
		},
		{
			key: generateRandomKey(),
			text: 'トン',
			type: 'unordered-list-item',
			depth: 0,
			inlineStyleRanges: [],
			entityRanges: [],
		},
		{
			key: generateRandomKey(),
			text: 'チン',
			type: 'unordered-list-item',
			depth: 0,
			inlineStyleRanges: [],
			entityRanges: [],
		},
		{
			key: generateRandomKey(),
			text: 'カン',
			type: 'unordered-list-item',
			depth: 0,
			inlineStyleRanges: [],
			entityRanges: [],
		},
		{
			key: generateRandomKey(),
			text: '↑順序なしリスト',
			type: 'unstyled',
			depth: 0,
			inlineStyleRanges: [],
			entityRanges: [],
		},
		{
			key: generateRandomKey(),
			text: 'First',
			type: 'ordered-list-item',
			depth: 0,
			inlineStyleRanges: [],
			entityRanges: [],
		},
		{
			key: generateRandomKey(),
			text: 'Second',
			type: 'ordered-list-item',
			depth: 0,
			inlineStyleRanges: [],
			entityRanges: [],
		},
		{
			key: generateRandomKey(),
			text: 'Third',
			type: 'ordered-list-item',
			depth: 0,
			inlineStyleRanges: [],
			entityRanges: [],
		},
		{
			key: generateRandomKey(),
			text: '↑順序ありリスト',
			type: 'unstyled',
			depth: 0,
			inlineStyleRanges: [],
			entityRanges: [],
		},
		{
			key: generateRandomKey(),
			text: '',
			type: 'unstyled',
			depth: 0,
			inlineStyleRanges: [],
			entityRanges: [],
		},
		{
			key: generateRandomKey(),
			text: '↑空の改行も入ります',
			type: 'unstyled',
			depth: 0,
			inlineStyleRanges: [],
			entityRanges: [],
		},
		{
			key: generateRandomKey(),
			text: '',
			type: 'unstyled',
			depth: 0,
			inlineStyleRanges: [],
			entityRanges: [],
		},
		{
			key: generateRandomKey(),
			text: 'https://www.prime-x.co.jp/works-tag/creative/ ←こんな感じでURLをリンクにすることができます。',
			type: 'unstyled',
			depth: 0,
			entityRanges: [
				{
					offset: 0,
					length: 45,
					key: 0,
				},
			],
			inlineStyleRanges: [],
		},
		{
			key: generateRandomKey(),
			text: 'こんな感じでリンク付きテキストにすることもできます。',
			type: 'unstyled',
			depth: 0,
			entityRanges: [
				{
					offset: 6,
					length: 3,
					key: 1,
				},
			],
			inlineStyleRanges: [],
		},
		{
			key: generateRandomKey(),
			text: '',
			type: 'unstyled',
			depth: 0,
			inlineStyleRanges: [],
			entityRanges: [],
		},
		{
			key: generateRandomKey(),
			text: '他に欲しいものあれば作れます。画像とかコードブロックとか。。',
			type: 'unstyled',
			depth: 0,
			inlineStyleRanges: [],
			entityRanges: [],
		},
	],
}

export const jsonDescription =
	'{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://www.prime-x.co.jp/works-tag/creative/"}},"1":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://google.co.jp"}}},"blocks":[{"key":"clpo0","text":"動画コンテンツの概要欄です。文字を大きくできます","type":"header-two","depth":0,"entityRanges":[],"inlineStyleRanges":[]},{"key":"b1nuk","text":"Bold: こんな感じで太字を使うことができます。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":2,"style":"BOLD"}],"entityRanges":[]},{"key":"b84td","text":"Italic: こんな感じでイタリック（斜体文字）を使うことができます。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":11,"style":"ITALIC"}],"entityRanges":[]},{"key":"c0mcd","text":"Underline: こんな感じで下線にすることもできます。","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":17,"length":5,"style":"UNDERLINE"}],"entityRanges":[]},{"key":"d70op","text":"トン","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"4le0c","text":"チン","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"d17am","text":"カン","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b4mv2","text":"↑順序なしリスト","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5c8h0","text":"First","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"buqb0","text":"Second","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"do6no","text":"Third","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"4kkpu","text":"↑順序ありリスト","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"br9pi","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"v7id","text":"↑空の改行も入ります","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"70tbh","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"adn6g","text":"https://www.prime-x.co.jp/works-tag/creative/ ←こんな感じでURLをリンクにすることができます。","type":"unstyled","depth":0,"entityRanges":[{"offset":0,"length":45,"key":0}],"inlineStyleRanges":[]},{"key":"7ivvp","text":"こんな感じでリンク付きテキストにすることもできます。","type":"unstyled","depth":0,"entityRanges":[{"offset":6,"length":3,"key":1}],"inlineStyleRanges":[]},{"key":"c9d0o","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"f3ctu","text":"他に欲しいものあれば作れます。画像とかコードブロックとか。。","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'
