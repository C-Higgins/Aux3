import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
// import registerServiceWorker from './registerServiceWorker'
import {Provider} from 'react-redux'
import configureStore from './redux'
import initializeListeners from './firebase'

firebase.initializeApp({
	apiKey: 'AIzaSyDSm09hcjpWpoWXEDwinj7-tXH6cmt1iCw',
	authDomain: 'aux-radio.firebaseapp.com',
	databaseURL: 'https://aux-radio.firebaseio.com',
	projectId: 'aux-radio',
	storageBucket: 'aux-radio.appspot.com',
	messagingSenderId: '63957372247',
})
firebase.firestore().settings({timestampsInSnapshots: true})
export default firebase


const store = configureStore()
initializeListeners(store.dispatch)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root') as HTMLElement,
)

// registerServiceWorker()
