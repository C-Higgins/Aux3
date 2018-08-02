import * as firebase from 'firebase/app'
import 'firebase/auth'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
// import registerServiceWorker from './registerServiceWorker'
import './index.css'

firebase.initializeApp({
	apiKey: 'AIzaSyDSm09hcjpWpoWXEDwinj7-tXH6cmt1iCw',
	authDomain: 'aux-radio.firebaseapp.com',
	databaseURL: 'https://aux-radio.firebaseio.com',
	projectId: 'aux-radio',
	storageBucket: 'aux-radio.appspot.com',
	messagingSenderId: '63957372247',
})

ReactDOM.render(
	<App />,
	document.getElementById('root') as HTMLElement,
)


// registerServiceWorker()
