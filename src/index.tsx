import * as firebase from 'firebase/app'
import 'firebase/auth'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
// import registerServiceWorker from './registerServiceWorker'
import {Provider} from 'react-redux'
import configureStore from './redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'

firebase.initializeApp({
	apiKey: 'AIzaSyDSm09hcjpWpoWXEDwinj7-tXH6cmt1iCw',
	authDomain: 'aux-radio.firebaseapp.com',
	databaseURL: 'https://aux-radio.firebaseio.com',
	projectId: 'aux-radio',
	storageBucket: 'aux-radio.appspot.com',
	messagingSenderId: '63957372247',
})
firebase.firestore().settings({timestampsInSnapshots: true})

const store = configureStore()

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Route exact path='/' component={App} />
		</Router>
	</Provider>,
	document.getElementById('root') as HTMLElement,
)


// registerServiceWorker()
