import * as Types from 'types'
import {messageReceived} from '@/redux/room'
import {connect} from 'react-redux'
import * as React from 'react'
import {FS} from '@/firebase'
import Chat from '../components/Chat'
import {default as firebase} from '../index'

const actions = {
	messageReceived,
}

const mapStateToProps = (state: Types.RootState) => ({
	room: state.room,
	username: state.authorization.user!.displayName,
})


class ChatWrapper extends React.Component<Props> {
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
			author: this.props.username,
			text: msg,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		})
	}
}


type Props = ReturnType<typeof mapStateToProps> & typeof actions
const cnChatWrapper = connect(mapStateToProps, actions)(ChatWrapper)
export default cnChatWrapper
