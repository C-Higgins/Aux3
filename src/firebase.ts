import firebase from './index'
import {signInAnonymously} from './redux/authorization'
import {roomsUpdated} from './redux/lobby'
import {ThunkDispatch} from './redux/types'

export default function initializeListeners(dispatch: ThunkDispatch) {
	const db = firebase.firestore()

	dispatch(signInAnonymously())

	db.collection('rooms').onSnapshot(ss => {
		dispatch(roomsUpdated(ss))
	})
}
