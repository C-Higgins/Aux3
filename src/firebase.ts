import {default as firebase} from './index'
import {signInAnonymously} from './redux/authorization'
import {roomsUpdated} from './redux/lobby'
import {Message, RoomState, ThunkDispatch} from './redux/types'

export default function initializeListeners(dispatch: ThunkDispatch) {
	const db = firebase.firestore()
	db.collection('rooms').onSnapshot(ss => {
		dispatch(roomsUpdated(ss))
	})
	dispatch(signInAnonymously())

}

// A map of the rooms keys to the functions to stop listening to them.
// Not in the store because it's not state, it's just managing the listeners that will change the state.
const roomListenerMap = new Map<string, Array<() => void>>()

export const FS = {
	get db() {
		return firebase.firestore()
	},

	subscribeToRoom(roomId: string,
					onRoomUpdate: (room: RoomState | undefined) => any,
					onChatUpdate: (msg: Message) => any) {
		if (roomListenerMap.get('ROOM_' + roomId)) {
			this.unsubscribeFromRoom(roomId)
		}

		const roomDoc = this.db.collection('room_data').doc(roomId)

		// onSnapshot returns a function that cancels the listener
		const unsubscribeFromRoomListener = roomDoc.onSnapshot(roomSnapshot => {
			onRoomUpdate(roomSnapshot.data() as RoomState)
		})

		const unsubscribeFromChatListener = roomDoc.collection('messages').orderBy('timestamp')
		.onSnapshot(messagesSnapshot => {
			messagesSnapshot.docChanges().forEach(change => {
				if (change.type === 'added') {
					onChatUpdate(change.doc.data() as Message)
				}
			})
		})
		roomListenerMap.set('ROOM_' + roomId, [unsubscribeFromRoomListener, unsubscribeFromChatListener])
	},
	unsubscribeFromRoom(id: string) {
		const unsubscribeFunctions = roomListenerMap.get('ROOM_' + id)
		if (unsubscribeFunctions) {
			unsubscribeFunctions.forEach(f => f())
		}
		roomListenerMap.delete('ROOM_' + id)
	},
}
