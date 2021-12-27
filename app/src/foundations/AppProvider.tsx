/**
 * manage global state
 */
import * as React from 'react'
import _ from 'lodash'
import { GoogleUser } from 'src/interfaces/index'
import { ReqHistory, UserHistory } from 'src/interfaces/api'

export type Severity = 'error' | 'warning' | 'info' | 'success'
export interface Alert {
	open: boolean
	message: string
	severity: Severity
}

/**
 * Types
 */
interface State {
	// [key: string]: any
	user: GoogleUser
	searchWord: string
	searchTag: string
	searchCategory: string
	prevAction: string
	localHistory: ReqHistory
	history: UserHistory[]
	openThread: boolean
	openSpinner: boolean
	openAlert: Alert
	acl: string
}
interface Action {
	// [key: string]: { payload: any }
	user?: { payload: GoogleUser }
	searchWord?: { payload: string }
	searchTag?: { payload: string }
	searchCategory?: { payload: string }
	prevAction?: { payload: string }
	localHistory?: { payload: ReqHistory }
	history?: { payload: UserHistory[] }
	openThread?: { payload: boolean }
	openSpinner?: { payload: boolean }
	openAlert?: { payload: Alert }
	acl?: { payload: string }
}
interface AppContextType {
	state: State
	dispatch: React.Dispatch<Action>
}

/**
 * Reducer
 * @param state current state
 * @param action dispatched action
 * @returns new state
 */
const reducer = (state: State, action: Action) => {
	const newState = _.cloneDeep(state)
	if (action.searchTag) newState.searchTag = action.searchTag.payload
	if (action.searchWord) newState.searchWord = action.searchWord.payload
	if (action.searchCategory)
		newState.searchCategory = action.searchCategory.payload
	if (action.localHistory) newState.localHistory = action.localHistory.payload
	if (action.openThread) newState.openThread = action.openThread.payload
	if (action.openSpinner) newState.openSpinner = action.openSpinner.payload
	if (action.openAlert) newState.openAlert = action.openAlert.payload
	if (action.acl) newState.acl = action.acl.payload

	if (action.prevAction) newState.prevAction = action.prevAction.payload
	return newState
}

/**
 * Initializer
 */
const initState = {
	user: {} as GoogleUser,
	searchWord: '',
	searchTag: 'ALL',
	searchCategory: 'ALL',
	prevAction: '',
	localHistory: {} as ReqHistory,
	history: [] as UserHistory[],
	openThread: true,
	openSpinner: false,
	openAlert: {} as Alert,
	acl: 'user',
}

/**
 * Components
 */
const AppContext = React.createContext({} as AppContextType)
export const useAppContext = () => React.useContext(AppContext)

const AppContextProvider: React.FC = ({ children }) => {
	const [state, dispatch] = React.useReducer(reducer, initState)
	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{children}
		</AppContext.Provider>
	)
}
export default AppContextProvider
