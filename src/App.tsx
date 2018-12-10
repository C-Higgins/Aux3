import * as React from 'react'
import './css/App.css'
import Lobby from './components/Lobby'
import Header from './components/Header'
import {connect} from 'react-redux'
import {updateName} from './redux/authorization'
import {createRoom} from './redux/lobby'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import RoomWrapper from './wrappers/RoomWrapper'
import {bindActionCreators} from 'redux'
import {DispatchAux, RootState} from 'types'

const actions = {
	updateName,
	createRoom,
}

// Transform the redux store into props consumed by wrapper component
const mapStateToProps = (state: RootState) => ({
	rooms: state.lobby.rooms,
	user: state.authorization.user,
})

class App extends React.Component<Props> {


	// async componentWillMount() {
	// 	const db = firebase.firestore()
	//
	// 	await this.props.dispatch(signInAnonymously())
	//
	// 	db.collection('rooms').onSnapshot(ss => {
	// 		this.props.dispatch(roomsUpdated(ss))
	// 	})
	// }

	render() {
		const Home = () => <Lobby rooms={this.props.rooms} createRoom={this.props.createRoom} />
		const Loading = () => <div>LOADING AUX</div>
		if (!this.props.user) {
			return Loading
		}
		return (
			<Router>
				<div className="wrapper">
					<Header
						name={this.props.user && this.props.user.displayName}
						updateName={this.props.updateName}
					/>
					<Route exact path='/' render={Home} />
					<Route path="/:id" component={RoomWrapper} />
				</div>
			</Router>
		)
	}
}

// When using thunks, can't use the shorthand of passing actions directly to connect
const mapDispatchToProps = (dispatch: DispatchAux) => bindActionCreators(actions, dispatch)
// Can't use "typeof actions" when using thunks
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default connectedApp
