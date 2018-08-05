import * as firebase from 'firebase/app'
import 'firebase/auth'
import {createAction, createStandardAction} from 'typesafe-actions'
import {Thunk} from '../types'

enum types {
	NAME_CHANGED = '@@authorization/NAME_CHANGED',
	LOGGED_IN = '@@authorization/LOGGED_IN',
}

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
const updateName: Thunk = (newName: string) => {
	return dispatch => {
		return firebase.auth().currentUser!.updateProfile({
			displayName: newName,
			photoURL: null,
		}).then(() => {
			return dispatch(nameChanged(newName))
		})
	}
}

const signInAnonymously: Thunk = () => {
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

export const publics = {
	updateName,
	signInAnonymously,
}
export default {
	loggedIn,
	nameChanged, ...publics,
}