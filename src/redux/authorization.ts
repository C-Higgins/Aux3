import {Reducer} from 'redux'
import {AuthorizationState, Thunk} from './types'
import {createAction, createStandardAction, getType} from 'typesafe-actions'
import * as firebase from 'firebase/app'
import 'firebase/auth'

enum types {
	NAME_CHANGED = '@@authorization/NAME_CHANGED',
	LOGGED_IN = '@@authorization/LOGGED_IN',
}

const initialState: AuthorizationState = {
	isLoggedIn: false,
	user: null,
}

export default (function reducer(state = initialState, action) {
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
					...state.user,
					displayName: action.payload,
				},
			}

		default:
			return state
	}
}) as Reducer<AuthorizationState>


// Action creators
const loggedIn = createAction(types.LOGGED_IN, resolve => {
	return (user: firebase.User) => {
		return resolve({
			displayName: user.displayName,
			email: user.email,
			emailVerified: user.emailVerified,
			isAnonymous: user.isAnonymous,
		})
	}
})

const nameChanged = createStandardAction(types.NAME_CHANGED)<string>()

// Side effects
export const updateName: Thunk = (newName: string) => {
	return dispatch => {
		return firebase.auth().currentUser!.updateProfile({
			displayName: newName,
			photoURL: null,
		}).then(() => {
			return dispatch(nameChanged(newName))
		})
	}
}

export const signInAnonymously: Thunk = () => {
	return dispatch => {
		return firebase.auth().signInAnonymously().then(async (credentials) => {
			if (credentials.additionalUserInfo && credentials.additionalUserInfo.isNewUser) {
				await dispatch(updateName('Anonymous' + Math.random()))
				return dispatch(loggedIn(credentials.user!))
			}
			return dispatch(loggedIn(credentials.user!))
		})
	}
}