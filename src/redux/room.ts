import {Reducer} from 'redux'
import {Message, RoomState} from './types'
import {createStandardAction, getType} from 'typesafe-actions'


const initialState: RoomState = {
	messages: [] as Message[],
	users: [] as any,
} as RoomState

export default (function reducer(state = initialState, action) {
	switch (action.type) {
		case getType(roomUpdated):
			return {
				...state,
				...action.payload,
			}

		case getType(messageReceived):
			const msg: Message = action.payload
			msg.timestamp = msg.timestamp || Date.now().toString()
			return {
				...state,
				messages: state.messages.concat(msg),
			}

		default:
			return state
	}
}) as Reducer<RoomState>


// Action creators
export const roomUpdated = createStandardAction('@@room/ROOM_UPDATED')<RoomState>()
export const messageReceived = createStandardAction('@@room/MESSAGE_RECIEVED')<Message>()
