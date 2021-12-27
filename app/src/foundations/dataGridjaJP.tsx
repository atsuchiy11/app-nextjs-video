import { GridLocaleText } from '@material-ui/data-grid'

/**
 * @see https://qiita.com/kisakutakashi0226/items/6e51cd70d7243108d4b8
 */
const dataGridjaJP: Partial<GridLocaleText> = {
	// Root
	noRowsLabel: '動画はありません',
	// ツールバー
	toolbarColumns: '列選択',
	toolbarFilters: 'フィルタ',

	// 列メニュー
	columnMenuLabel: 'メニュー',
	columnMenuShowColumns: '列の表示/非表示',
	columnMenuFilter: 'フィルタ',
	columnMenuHideColumn: '非表示にする',
	columnMenuUnsort: '並べ替えを解除',
	columnMenuSortAsc: '昇順で並び替え',
	columnMenuSortDesc: '降順で並び替え',

	// フィルタメニュー
	filterPanelAddFilter: 'フィルター追加',
	filterPanelDeleteIconLabel: '削除',
	filterPanelOperators: 'フィルタ条件',
	filterPanelOperatorAnd: 'And',
	filterPanelOperatorOr: 'Or',
	filterPanelColumns: '列名',
	filterPanelInputLabel: '値',
	filterPanelInputPlaceholder: '値を入力',

	// フィルタオペレーション
	filterOperatorContains: '...を含む',
	filterOperatorEquals: '...に等しい',
	filterOperatorStartsWith: '...で始まる',
	filterOperatorEndsWith: '...で終わる',
	filterOperatorIs: '...である',
	filterOperatorNot: '...でない',
	filterOperatorAfter: '...より後ろ',
	filterOperatorOnOrAfter: '...以降',
	filterOperatorBefore: '...より前',
	filterOperatorOnOrBefore: '...以前',

	// フッター
	footerRowSelected: (count) => `${count}行を選択しました`,

	// 列の表示・非表示
	columnsPanelTextFieldLabel: '列を検索',
	columnsPanelTextFieldPlaceholder: '検索条件を入力',
	columnsPanelDragIconLabel: '列並べ替え',
	columnsPanelShowAllButton: 'すべて表示',
	columnsPanelHideAllButton: 'すべて非表示',
}
export default dataGridjaJP
