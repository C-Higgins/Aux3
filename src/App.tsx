import * as React from 'react'
import './App.css'
import Home from './components/Home'
import {connect} from 'react-redux'
import {signInAnonymously, updateName} from './redux/authorization'
import {createRoom, roomsUpdated} from './redux/lobby'
import * as Types from './redux/types'
import {bindActionCreators} from 'redux'
import {RouteComponentProps, withRouter} from 'react-router'
import * as firebase from 'firebase/app'
import 'firebase/firestore'


const actions = {
	signInAnonymously,
	updateName,
	roomsUpdated,
	createRoom,
}
type Props = typeof actions & Types.AuthorizationState & Types.LobbyState & RouteComponentProps<any>

class App extends React.Component<Props> {

	async componentWillMount() {
		const db = firebase.firestore()

		await this.props.signInAnonymously()

		db.collection('rooms').onSnapshot(ss => {
			this.props.roomsUpdated(ss)
		})
	}

	render() {
		return (
			<Home
				name={this.props.user && this.props.user.displayName}
				updateName={this.props.updateName}
				rooms={this.props.rooms}
			/>
		)
	}
}

const mapStateToProps = (state: Types.State) => ({...state.authorization, ...state.lobby})
const mapDispatchToProps = (dispatch: Types.ThunkDispatch) => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))
