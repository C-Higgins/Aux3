import * as Types from '../redux/types'
import {Message, RoomState} from '../redux/types'
import {messageReceived, messagesLoaded, roomJoined, roomLeft, roomUpdated} from '../redux/room'
import {connect} from 'react-redux'
import * as React from 'react'
import {RouteComponentProps} from 'react-router'
import {FS} from '../firebase'
import Room from '../components/Room'

const actions = {
	roomUpdated,
	roomJoined,
	roomLeft,
	messageReceived,
	messagesLoaded,
}

interface MappedStateProps {
	room: Types.RoomState,
	user: Types.AuthorizationState['user']
}

class RoomWrapper extends React.Component<MappedStateProps & typeof actions & RouteComponentProps<any>> {

	id = this.props.match.params.id

	componentDidMount() {
		this.props.roomJoined(this.id)
		FS.subscribeToRoom(this.id,
			roomSnapshot => {
				const roomData = roomSnapshot.data() as RoomState
				if (roomData) {
					this.props.roomUpdated(roomData)
				}
			},
			messagesSnapshot => {
				messagesSnapshot.docChanges().forEach(change => {
					if (change.type === 'added') {
						this.props.messageReceived(change.doc.data() as Message)
					}
				})
				if (this.props.room.isLoadingChat) {
					this.props.messagesLoaded()
				}
			})
	}

	componentWillUnmount() {
		FS.unsubscribeFromRoom(this.id, () => {
			this.props.roomLeft(this.id)
		})
	}

	render() {
		return <Room
			id={this.props.room.id}
			name={this.props.room.name}
			isLoading={this.props.room.isLoadingRoom}
		/>
	}
}

const mapStateToProps = (state: Types.State) => ({
	room: state.room,
	user: state.authorization.user,
})
const cnRoomWrapper = connect<MappedStateProps, typeof actions>(mapStateToProps, actions)(RoomWrapper)
export default cnRoomWrapper


/*
* connect(mapStateToProps, actions) is the same as
* connect(mapStateToProps, (dispatch: Types.ThunkDispatch) => bindActionCreators(actions, dispatch))
*
* it automatically uses the bindActionCreators when you pass an object of action creators
* */