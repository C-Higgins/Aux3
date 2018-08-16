import * as React from 'react'
import './css/App.css'
import Lobby from './components/Lobby'
import Header from './components/Header'
import {connect} from 'react-redux'
import {updateName} from './redux/authorization'
import {createRoom} from './redux/lobby'
import * as Types from './redux/types'
import {bindActionCreators} from 'redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import RoomWrapper from './wrappers/RoomWrapper'


class App extends React.Component<MappedStateProps & MappedActionsProps> {


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
		const home = () => <Lobby rooms={this.props.rooms} createRoom={this.props.createRoom} />
		return (
			<Router>
				<div className="wrapper">
					<Header
						name={this.props.user && this.props.user.displayName}
						updateName={this.props.updateName}
					/>
					<Route exact path='/' render={home} />
					<Route path="/:id" component={RoomWrapper} />
				</div>
			</Router>
		)
	}
}


const actions = {
	updateName,
	createRoom,
}

type MappedStateProps = Types.AuthorizationState & Types.LobbyState
type MappedActionsProps = typeof actions
const mapStateToProps = (state: Types.State) => ({...state.authorization, ...state.lobby})
const mapDispatchToProps = (dispatch: Types.ThunkDispatch) => bindActionCreators(actions, dispatch)
export default connect<MappedStateProps, MappedActionsProps>(mapStateToProps, mapDispatchToProps)(App)
