import * as Types from '../redux/types'
import {messageReceived} from '../redux/room'
import {connect} from 'react-redux'
import * as React from 'react'
import {FS} from '../firebase'
import Chat from '../components/Chat'
import {default as firebase} from '../index'

const actions = {
	messageReceived,
}

interface MappedStateProps {
	room: Types.RoomState
	user: Types.AuthorizationState['user']
}

class ChatWrapper extends React.Component<MappedStateProps & typeof actions> {
	render() {
		return <Chat messages={this.props.room.messages}
					 users={this.props.room.users}
					 showUsers={false}
					 sendChat={this.sendChat}
					 isLoading={this.props.room.isLoadingChat}
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

const mapStateToProps = (state: Types.State) => ({
	room: state.room,
	user: state.authorization.user,
})

const cnChatWrapper = connect<MappedStateProps, typeof actions>(mapStateToProps, actions)(ChatWrapper)
export default cnChatWrapper
