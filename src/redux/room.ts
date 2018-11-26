import {Reducer} from 'redux'
import {Message, RoomState} from './types'
import {createStandardAction, getType} from 'typesafe-actions'


const initialState: RoomState = {
	messages: [] as Message[],
	users: [] as any,
	isLoadingRoom: true,
	isLoadingChat: true,
} as RoomState

export default (function reducer(state = initialState, action) {
	switch (action.type) {
		case getType(roomUpdated):
			return {
				...state,
				...action.payload,
				isLoadingRoom: false,
			}

		case getType(roomJoined):
			return {
				...state,
				id: action.payload,
			}

		case getType(roomLeft):
			return initialState

		case getType(messageReceived):
			const msg: Message = action.payload
			msg.timestamp = msg.timestamp || Date.now().toString()
			return {
				...state,
				messages: state.messages.concat(msg),
			}

		case getType(messagesLoaded):
			if (state.isLoadingChat) {
				return {
					...state,
					isLoadingChat: false,
				}
			}
			return state

		default:
			return state
	}
}) as Reducer<RoomState>


// Action creators

// Room got updated in database somehow
export const roomUpdated = createStandardAction('@@room/ROOM_UPDATED')<RoomState>()

// Chat message received
export const messageReceived = createStandardAction('@@room/MESSAGE_RECIEVED')<Message>()

// Current user joined the room
export const roomJoined = createStandardAction('@@room/ROOM_JOINED')<string>()

// Current user left the room
export const roomLeft = createStandardAction('@@room/ROOM_LEFT')<string>()

// Messages have been loaded, even if there are none
export const messagesLoaded = createStandardAction('@@room/MESSAGES_LOADED')<void>()