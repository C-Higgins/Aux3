import {Reducer} from 'redux'
import {AuthAction, AuthorizationState} from './types'
import authActions from './actions'
import {getType} from 'typesafe-actions'


const initialState: AuthorizationState = {
	isLoggedIn: false,
	user: null,
}


export default (function reducer(state = initialState, action: AuthAction) {
	switch (action.type) {
		case getType(authActions.loggedIn):
			return {
				...state,
				user: action.payload,
				isLoggedIn: true,
			}
		case getType(authActions.nameChanged):
			return {
				...state,
				user: {
					...state.user,
					displayName: action.payload,
				},
			}

		default:
			return state
	}
}) as Reducer<AuthorizationState>
