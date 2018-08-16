import firebase from './index'
import {signInAnonymously} from './redux/authorization'
import {roomsUpdated} from './redux/lobby'
import {RoomState, ThunkDispatch} from './redux/types'

export default function initializeListeners(dispatch: ThunkDispatch) {
	const db = firebase.firestore()
	db.collection('rooms').onSnapshot(ss => {
		dispatch(roomsUpdated(ss))
	})
	dispatch(signInAnonymously())

}

const memo = new Map()

export const AuxFirestore = {
	get db() {
		return firebase.firestore()
	},
	subscribeToRoom(id: string, cb: (room: RoomState | undefined) => any) {
		if (memo.get('ROOM_' + id)) {
			this.unsubscribeFromRoom(id)
		}
		const unsub = this.db.collection('rooms').doc(id)
		.onSnapshot(roomSnapshot => cb(roomSnapshot.data() as RoomState))
		memo.set('ROOM_' + id, unsub)
	},
	unsubscribeFromRoom(id: string) {
		const unsub = memo.get('ROOM_' + id)
		if (unsub) {
			unsub()
		}
		memo.delete('ROOM_' + id)
	},
}
