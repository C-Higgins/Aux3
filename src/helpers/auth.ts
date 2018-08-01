import * as firebase from 'firebase/app'
import 'firebase/auth'

export default {
	signInAnonymously(): Promise<firebase.User> {
		return firebase.auth().signInAnonymously().then((credentials) => {
			const user = credentials.user!
			console.log('signed in', credentials)
			if (credentials.additionalUserInfo && credentials.additionalUserInfo.isNewUser) {
				return user.updateProfile({
					displayName: 'Anonymous' + Math.random(),
					photoURL: null,
				}).then(() => {
					return firebase.auth().currentUser!
				})
			}
			return firebase.auth().currentUser!
		})
	}
}