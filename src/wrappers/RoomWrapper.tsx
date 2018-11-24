import * as Types from '../redux/types'
import {bindActionCreators} from 'redux'
import {messageReceived, roomUpdated} from '../redux/room'
import {connect} from 'react-redux'
import * as React from 'react'
import {RouteComponentProps} from 'react-router'
import {FS} from '../firebase'
import ChatWrapper from './ChatWrapper'

class RoomWrapper extends React.Component<MappedStateProps & MappedActionsProps & RouteComponentProps<any>> {

	id = this.props.match.params.id

	componentDidMount() {
		FS.subscribeToRoom(this.id, room => {
			if (room) {
				this.props.roomUpdated(room)
			}
		}, message => {
			this.props.messageReceived(message)
		})
	}

	componentWillUnmount() {
		FS.unsubscribeFromRoom(this.id)
	}

	render() {
		return (
			<div id="room-container">
				you are in room "{this.id} ({this.props.name})"
				<ChatWrapper />
			</div>
		)
	}
}


const actions = {
	roomUpdated,
	messageReceived,
}
type MappedStateProps = Types.RoomState & Types.AuthorizationState
type MappedActionsProps = typeof actions
const mapStateToProps = (state: Types.State) => ({...state.room, ...state.authorization})
const mapDispatchToProps = (dispatch: Types.ThunkDispatch) => bindActionCreators(actions, dispatch)
const cnRoomWrapper = connect<MappedStateProps, MappedActionsProps>(mapStateToProps, mapDispatchToProps)(RoomWrapper)
export default cnRoomWrapper
