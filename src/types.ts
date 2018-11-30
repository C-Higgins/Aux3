import {ThunkAction as RThunkAction, ThunkDispatch as RThunkDispatch} from 'redux-thunk'
import {LobbyAction} from './redux/lobby'
import {AuthorizationAction} from './redux/authorization'
import {RoomAction} from './redux/room'
import {StateType} from 'typesafe-actions'
import {rootReducer} from './redux'

export type RootAction =
	| LobbyAction
	| AuthorizationAction
	| RoomAction

// Figure out the type of state from the root reducer, to reduce duplication
export type RootState = Readonly<StateType<typeof rootReducer>>

// The
export type DispatchAux = RThunkDispatch<RootState, any, RootAction>
export type ThunkActionAux<R = any> = RThunkAction<R, RootState, any, RootAction>

export interface AuthorizationState {
	readonly isLoggedIn: boolean
	readonly user: null | {
		displayName: string | null
		email: string | null
		emailVerified: boolean
		isAnonymous: boolean
	}
}


export interface LobbyState {
	readonly rooms: LobbyRoom[]
}

// interface UserState extends FBUser {
// 	readonly settings: { readonly [key: string]: any }
// }

export interface LobbyRoom {
	readonly userCount: number
	readonly name: string
	readonly currentTrack: Track
	readonly id: string
}

export interface RoomState extends LobbyRoom {
	readonly hostId: string
	readonly users: PublicUser[]
	readonly tracks: { [key: string]: Track }
	readonly messages: Message[]
	readonly isLoadingRoom: boolean
	readonly isLoadingChat: boolean
}

interface PublicUser {
	readonly displayName: string | null
	readonly photoURL: string | null
	// readonly uid: string
}

interface Track {
	readonly title: string
	readonly duration: number
	readonly artist?: string
	readonly isUploading: boolean
}

export interface Message {
	author: string
	timestamp: string
	text: string
	system?: boolean
}


/**
 * Takes a ThunkAction and returns a function signature which matches how it would appear when processed using
 * bindActionCreators
 *
 * @template T ThunkAction to be wrapped
 */
export type ThunkActionDispatch<T extends RThunkAction<any, any, any, any>> = (...args: Parameters<T>)
	=> ReturnType<ReturnType<T>>;
