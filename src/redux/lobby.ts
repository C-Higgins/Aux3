import {Reducer} from 'redux'
import {AsyncAction, LobbyRoom, LobbyState} from './types'
import {createAction, createStandardAction, getType} from 'typesafe-actions'
import firebase from '../index'
import {History} from 'history'


const initialState: LobbyState = {
	rooms: [],
}

export default (function reducer(state = initialState, action) {
	switch (action.type) {
		case getType(roomsUpdated):
			return {rooms: action.payload}

		default:
			return state
	}
}) as Reducer<LobbyState>


// Action creators
export const roomsUpdated = createAction('@@lobby/ROOMS_UPDATED', resolve => {
	return (roomsSnapshot: firebase.firestore.QuerySnapshot) => {
		// Inefficient but fine for now
		const rooms = [] as LobbyRoom[]
		roomsSnapshot.forEach(doc => {
			rooms.push(doc.data() as LobbyRoom)
		})
		return resolve(rooms)
	}
})

const joinedRoom = createStandardAction('@@lobby/CREATED_AND_JOINED_ROOM')<string>()
// const roomAdded = createStandardAction('@@lobby/ROOM_ADDED')<LobbyRoom>()

// Side effects
export const createRoom = (name: string, history: History): AsyncAction => {
	return dispatch => {
		const newRoom = {
			name,
		}
		const newRoomRef = firebase.firestore().collection('room_data').doc()
		const newRoomId = newRoomRef.id
		return newRoomRef.set({
			...newRoom,
			id: newRoomId,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
		}).then(() => {
			history.push('/' + newRoomId)
			return dispatch(joinedRoom(newRoomId))
		})
	}
}