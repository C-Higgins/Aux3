import {applyMiddleware, combineReducers, createStore} from 'redux'
import authReducer from './authorization'
import lobbyReducer from './lobby'
import roomReducer from './room'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {RootState} from 'types'

const loggerMiddleware = createLogger()

const rootReducer = combineReducers({
	authorization: authReducer,
	lobby: lobbyReducer,
	room: roomReducer,
})

export {rootReducer}

function configureStore(initialState?: RootState) {
	return createStore(rootReducer, initialState!, composeWithDevTools(applyMiddleware(thunk, loggerMiddleware)))
}

// can pass an optional param to rehydrate state on app start
const store = configureStore()
export default store
