import {types} from './authorization'
import {ThunkAction, ThunkDispatch as TD} from 'redux-thunk'
import {Action} from 'redux'

export interface State {
	readonly authorization: types.AuthorizationState
}

export type Thunk = (payload?: any) => ThunkAction<Promise<Action>, State, void, Action>
export type ThunkDispatch = TD<State, void, Action>

export * from './authorization/types'