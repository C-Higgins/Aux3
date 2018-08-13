import {Reducer} from 'redux'
import {LobbyRoom, LobbyState, Thunk} from './types'
import {createAction, createStandardAction, getType} from 'typesafe-actions'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import {History} from 'history'

enum types {
	ROOMS_UPDATED = '@@lobby/ROOMS_UPDATED',
	ROOM_ADDED = '@@lobby/ROOM_ADDED',
	JOINED_ROOM = '@@lobby/CREATED_AND_JOINED_ROOM'
}

const initialState: LobbyState = {
	rooms: [],
}

export default (function reducer(state = initialState, action) {
	switch (action.type) {
		case getType(roomsUpdated):
			return {rooms: action.payload}
		case getType(roomAdded):
			return {
				rooms: state.rooms.concat(action.payload),
			}

		default:
			return state
	}
}) as Reducer<LobbyState>


// Action creators
export const roomsUpdated = createAction(types.ROOMS_UPDATED, resolve => {
	return (roomsSnapshot: firebase.firestore.QuerySnapshot) => {
		// Inefficient but fine for now
		const rooms = [] as LobbyRoom[]
		roomsSnapshot.forEach(doc => {
			rooms.push(doc.data() as LobbyRoom)
		})
		return resolve(rooms)
	}
})

const joinedRoom = createStandardAction(types.JOINED_ROOM)<string>()
const roomAdded = createStandardAction(types.ROOM_ADDED)<LobbyRoom>()

// Side effects
export const createRoom: Thunk = (newRoom: LobbyRoom, history: History) => {
	return dispatch => {
		return firebase.firestore().collection('room_data').add(newRoom)
		.then((createdRoom) => {
			history.push('/' + createdRoom.id)
			return dispatch(joinedRoom(createdRoom.id))
		})
	}
}

// export const signInAnonymously: Thunk = () => {
// 	return dispatch => {
// 		return firebase.auth().signInAnonymously().then(async (credentials) => {
// 			if (credentials.additionalUserInfo && credentials.additionalUserInfo.isNewUser) {
// 				await dispatch(updateName('Anonymous' + Math.random()))
// 				return dispatch(loggedIn(credentials.user!))
// 			}
// 			return dispatch(loggedIn(credentials.user!))
// 		})
// 	}
// }