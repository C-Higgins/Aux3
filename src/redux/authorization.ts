import {Reducer} from 'redux'
import {AuthorizationState, ThunkActionAux} from 'types'
import {ActionType, createAction, createStandardAction, getType} from 'typesafe-actions'
import * as firebase from 'firebase/app'
import 'firebase/auth'

const initialState: AuthorizationState = {
	isLoggedIn: false,
	user: null,
}

export default ((state = initialState, action) => {
	switch (action.type) {
		case getType(loggedIn):
			return {
				...state,
				user: action.payload,
				isLoggedIn: true,
			}
		case getType(nameChanged):
			return {
				...state,
				user: {
					...state.user!,
					displayName: action.payload,
				},
			}

		default:
			return state
	}
}) as Reducer<AuthorizationState, AuthorizationAction>

// Action creators
const loggedIn = createAction('@@authorization/LOGGED_IN', resolve => {
	return (user: firebase.User) => {
		return resolve({
			displayName: user.displayName,
			email: user.email,
			emailVerified: user.emailVerified,
			isAnonymous: user.isAnonymous,
		})
	}
})

const nameChanged = createStandardAction('@@authorization/NAME_CHANGED')<string>()

// Side effects
export const updateName = (newName: string): ThunkActionAux<Promise<void>> => {
	return dispatch => {
		return firebase.auth().currentUser!.updateProfile({
			displayName: newName,
			photoURL: null,
		}).then(() => {
			dispatch(nameChanged(newName))
		})
	}
}

export const signInAnonymously = (): ThunkActionAux<Promise<void>> => {
	return dispatch => {
		return firebase.auth().signInAnonymously().then(async (credentials) => {
			if (credentials.additionalUserInfo && credentials.additionalUserInfo.isNewUser) {
				await dispatch(updateName('Anonymous' + Math.random()))
				dispatch(loggedIn(credentials.user!))
			}
			dispatch(loggedIn(credentials.user!))
		})
	}
}

const authActions = {
	loggedIn,
	nameChanged,
}

export type AuthorizationAction = ActionType<typeof authActions>
