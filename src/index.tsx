import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
// import registerServiceWorker from './registerServiceWorker'
import {Provider} from 'react-redux'
import store from './redux'
import initializeListeners from './firebase'
import {IconContext} from 'react-icons/lib'

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


// react-icon default config
const iconConfig = {
	className: 'react-icons',
}

// Initial firebase listener setup. Pass the dispatch so it can update the state from listeners
initializeListeners(store.dispatch)

// TODO: Don't load app until listeners are done initializing
ReactDOM.render(
	<Provider store={store}>
		<IconContext.Provider value={iconConfig}>
			<App />
		</IconContext.Provider>
	</Provider>,
	document.getElementById('root') as HTMLElement,
)

export {store}

// registerServiceWorker()
