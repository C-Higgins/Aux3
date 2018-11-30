import {Message, RoomState, RootState} from 'types'
import {messageReceived, messagesLoaded, roomJoined, roomLeft, roomUpdated} from '@/redux/room'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import {RouteComponentProps} from 'react-router'
import {FS} from '@/firebase'
import Room from '../components/Room'

const actions = {
	roomUpdated,
	roomJoined,
	roomLeft,
	messageReceived,
	messagesLoaded,
}

const mapStateToProps = (state: RootState) => ({
	room: state.room,
})

class RoomWrapper extends Component<Props> {

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

// TODO: How to validate that action creators passed to connect are valid?
// https://github.com/piotrwitek/react-redux-typescript-guide/issues/110
type Props = ReturnType<typeof mapStateToProps> & typeof actions & RouteComponentProps<any>
const cnRoomWrapper = connect(mapStateToProps, actions)(RoomWrapper)
export default cnRoomWrapper


/*
* connect(mapStateToProps, actions) is the same as
* connect(mapStateToProps, (dispatch: Types.DispatchAux) => bindActionCreators(actions, dispatch))
*
* it automatically uses the bindActionCreators when you pass an object of action creators
*
* mapStateToProps takes an optional second param, ownProps, which is the props passed to the component by other means
* (such as from a parent). Then mSTP is called on prop changes as well. Lets you define props which depend at once on
* external props and the store.
* More: https://github.com/reduxjs/react-redux/blob/master/docs/api.md#connect
* */
