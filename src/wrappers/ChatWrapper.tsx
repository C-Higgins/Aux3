import * as Types from '../redux/types'
import {bindActionCreators} from 'redux'
import {messageReceived} from '../redux/room'
import {connect} from 'react-redux'
import * as React from 'react'
import {FS} from '../firebase'
import Chat from '../components/Chat'
import {default as firebase} from '../index'

class ChatWrapper extends React.Component<MappedStateProps & MappedActionsProps> {


	render() {
		return <Chat messages={this.props.room.messages}
					 users={this.props.room.users}
					 showUsers={false}
					 sendChat={this.sendChat}
		/>
	}

	private sendChat = (msg: string) => {
		FS.db.collection('room_data').doc(this.props.room.id).collection('messages').add({
			author: this.props.user!.displayName,
			text: msg,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		})
	}
}


const actions = {
	messageReceived,
}

interface MappedStateProps {
	room: Types.RoomState
	user: Types.AuthorizationState['user']
}

type MappedActionsProps = typeof actions
const mapStateToProps = (state: Types.State) => ({
	room: state.room,
	user: state.authorization.user,
})
const mapDispatchToProps = (dispatch: Types.ThunkDispatch) => bindActionCreators(actions, dispatch)
const cnChatWrapper = connect<MappedStateProps, MappedActionsProps>(mapStateToProps, mapDispatchToProps)(ChatWrapper)
export default cnChatWrapper
