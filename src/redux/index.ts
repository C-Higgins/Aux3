import {applyMiddleware, combineReducers, createStore, Store} from 'redux'
import authReducer from './authorization'
import lobbyReducer from './lobby'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {State} from './types'

const loggerMiddleware = createLogger()

const rootReducer = combineReducers<State>({
	authorization: authReducer,
	lobby: lobbyReducer,
})

export default function configureStore(initialState?: State): Store<State> {
	if (initialState) {
		return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(loggerMiddleware, thunk)))
	}
	return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, loggerMiddleware)))
}