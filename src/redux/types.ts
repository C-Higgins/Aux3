import {ThunkAction, ThunkDispatch as TD} from 'redux-thunk'
import {Action} from 'redux'
import {User as FBUser} from 'firebase'

export interface State {
	readonly authorization: AuthorizationState
	// readonly lobby: LobbyState
	// readonly room: RoomState
	// readonly user: UserState
}

export interface AuthorizationState {
	readonly isLoggedIn: boolean
	readonly user: null | {
		displayName: string | null
		email: string | null
		emailVerified: boolean
		isAnonymous: boolean
	}
}

export type Thunk = (payload?: any) => ThunkAction<Promise<Action>, State, void, Action>

export type ThunkDispatch = TD<State, void, Action>

interface LobbyState {
	readonly rooms: LobbyRoom[]
}

interface UserState extends FBUser {
	readonly settings: { readonly [key: string]: any }
}

interface LobbyRoom {
	readonly userCount: number
	readonly name: string
	readonly currentTrack: Track
	readonly key: string
}

interface RoomState extends LobbyRoom {
	readonly hostId: string
	readonly users: PublicUser[]
	readonly tracks: { [key: string]: Track }
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

