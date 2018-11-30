import {Reducer} from 'redux'
import {LobbyRoom, LobbyState, ThunkActionAux} from 'types'
import {ActionType, createAction, createStandardAction, getType} from 'typesafe-actions'
import firebase from '@/index'
import {History} from 'history'

const initialState: LobbyState = {
	rooms: [],
}

export default ((state = initialState, action) => {
	switch (action.type) {
		case getType(roomsUpdated):
			return {rooms: action.payload}

		default:
			return state
	}
}) as Reducer<LobbyState, LobbyAction>


// Action creators
export const roomsUpdated = createAction('@@lobby/ROOMS_UPDATED', resolve => {
	return (roomsSnapshot: firebase.firestore.QuerySnapshot) => {
		// Inefficient but fine for now
		const rooms: LobbyRoom[] = []
		roomsSnapshot.forEach(doc => {
			rooms.push(doc.data() as LobbyRoom)
		})
		return resolve(rooms)
	}
})

const joinedRoom = createStandardAction('@@lobby/CREATED_AND_JOINED_ROOM')<string>()
// const roomAdded = createStandardAction('@@lobby/ROOM_ADDED')<LobbyRoom>()

// Side effects
export const createRoom = (name: string, history: History): ThunkActionAux<Promise<void>> => {
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
			dispatch(joinedRoom(newRoomId))
		})
	}
}

const actionCreators = {
	roomsUpdated,
	joinedRoom,
}

export type LobbyAction = ActionType<typeof actionCreators>
