import {default as firebase} from './index'
import {signInAnonymously} from './redux/authorization'
import {roomsUpdated} from './redux/lobby'
import {DispatchAux} from 'types'
import QuerySnapshot = firebase.firestore.QuerySnapshot
import DocumentSnapshot = firebase.firestore.DocumentSnapshot

export default function initializeListeners(dispatch: DispatchAux) {
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
					onRoomSnapshot: (ss: DocumentSnapshot) => any,
					onChatSnapshot: (ss: QuerySnapshot) => any) {
		if (roomListenerMap.get('ROOM_' + roomId)) {
			this.unsubscribeFromRoom(roomId)
		}

		const roomDoc = this.db.collection('room_data').doc(roomId)

		// onSnapshot returns a function that cancels the listener
		const unsubscribeFromRoomListener = roomDoc.onSnapshot(onRoomSnapshot)

		const unsubscribeFromChatListener = roomDoc.collection('messages').orderBy('timestamp')
		.onSnapshot(onChatSnapshot)
		roomListenerMap.set('ROOM_' + roomId, [unsubscribeFromRoomListener, unsubscribeFromChatListener])
		console.info('Subscribed to ' + roomId)
	},
	unsubscribeFromRoom(roomId: string, cb?: (roomId: string) => any) {
		const unsubscribeFunctions = roomListenerMap.get('ROOM_' + roomId)
		if (unsubscribeFunctions) {
			unsubscribeFunctions.forEach(f => f())
		}
		roomListenerMap.delete('ROOM_' + roomId)
		console.info('Unsubscribed from ' + roomId)
		if (cb) {
			cb(roomId)
		}
	},
}
