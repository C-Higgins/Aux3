import * as firebase from 'firebase'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

const firebaseConfig = {
    apiKey: 'AIzaSyDSm09hcjpWpoWXEDwinj7-tXH6cmt1iCw',
    authDomain: 'aux-radio.firebaseapp.com',
    databaseURL: 'https://aux-radio.firebaseio.com',
    projectId: 'aux-radio',
    storageBucket: 'aux-radio.appspot.com',
    messagingSenderId: '63957372247',
}
firebase.initializeApp(firebaseConfig)
ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
)
registerServiceWorker()
