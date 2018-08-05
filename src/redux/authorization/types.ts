import {ActionType} from 'typesafe-actions'
import authActions from './actions'

export interface AuthorizationState {
	readonly isLoggedIn: boolean
	readonly user: null | {
		displayName: string | null
		email: string | null
		emailVerified: boolean
		isAnonymous: boolean
	}
}

export type AuthAction = ActionType<typeof authActions>
