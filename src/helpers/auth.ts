import * as firebase from 'firebase/app'
import 'firebase/auth'

export default {
	signInAnonymously(): Promise<firebase.User | null> {
		return firebase.auth().signInAnonymously().then((credentials) => {
			const user = credentials.user!
			if (credentials.additionalUserInfo && credentials.additionalUserInfo.isNewUser) {
				return user.updateProfile({
					displayName: 'Anonymous' + Math.random(),
					photoURL: null,
				}).then(() => {
					return this.currentUser
				})
			}
			return this.currentUser
		})
	},
	changeName(name: string): Promise<void> {
		return this.currentUser!.updateProfile({
			displayName: name,
			photoURL: null,
		})
	},
	get currentUser(): firebase.User | null {
		if (firebase.apps.length) {
			// initialized
			return firebase.auth().currentUser!
		}
		return null
	},
}