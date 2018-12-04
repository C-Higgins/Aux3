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

// The Dispatch and ThunkAction types with validation for state and actions
export type DispatchAux = RThunkDispatch<RootState, any, RootAction>
export type ThunkActionAux<R = any> = RThunkAction<R, RootState, any, RootAction>

type ActionCreator = (...args: any[]) => RThunkAction<any, RootState, any, RootAction>

// // The type of the actions object in components
// export interface Actions {
// 	[key: string]: ActionCreator
// }
//
// // The return type of bindActionCreators, given T as actions
// export type BoundActions<T extends Actions> = {
// 	[P in keyof T]: ThunkActionDispatch<T[P]>
// }

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
 * bindActionCreators. This is what bindActionCreators will return for each function
 *
 * @template T ThunkAction to be wrapped
 */
export type ThunkActionDispatch<T extends ActionCreator> =
	(...args: Parameters<T>) => ReturnType<ReturnType<T>>
