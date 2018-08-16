import * as Types from '../redux/types'
import {bindActionCreators} from 'redux'
import {roomUpdated} from '../redux/room'
import {connect} from 'react-redux'
import * as React from 'react'
import {RouteComponentProps} from 'react-router'
import {AuxFirestore} from '../firebase'

class RoomWrapper extends React.Component<MappedStateProps & MappedActionsProps & RouteComponentProps<any>> {

	id = this.props.match.params.id

	componentDidMount() {
		AuxFirestore.subscribeToRoom(this.id, room => {
			if (room) {
				this.props.roomUpdated(room)
			}
		})
	}

	componentWillUnmount() {
		AuxFirestore.unsubscribeFromRoom(this.id)
	}

	render() {
		return (
			<div id="room-container">
				you are in room "{this.id}"
			</div>
		)
	}
}


const actions = {
	roomUpdated,
}
type MappedStateProps = Types.RoomState
type MappedActionsProps = typeof actions
const mapStateToProps = (state: Types.State) => state.room
const mapDispatchToProps = (dispatch: Types.ThunkDispatch) => bindActionCreators(actions, dispatch)
export default connect<MappedStateProps, MappedActionsProps>(mapStateToProps, mapDispatchToProps)(RoomWrapper)
