import {Reducer} from 'redux'
import {AsyncAction, LobbyRoom, RoomState} from './types'
import {createAction, createStandardAction, getType} from 'typesafe-actions'
import firebase from '../index'
import {History} from 'history'


const initialState: RoomState = {} as RoomState

export default (function reducer(state = initialState, action) {
	switch (action.type) {
		case getType(roomUpdated):
			return {
				...state,
				...action.payload,
			}

		default:
			return state
	}
}) as Reducer<RoomState>


// Action creators
export const roomUpdated = createStandardAction('@@room/ROOM_UPDATED')<RoomState>()