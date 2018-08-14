import * as React from 'react'
import {LobbyRoom} from '../redux/types'
import {Link, RouteComponentProps, withRouter} from 'react-router-dom'
import '../css/Lobby.css'
import {History} from 'history'

interface HomeProps {
	rooms: LobbyRoom[]
	createRoom: (name: string, history: History) => any
}

const Lobby: React.SFC<HomeProps & RouteComponentProps<any>> = (props) => {
	const rooms = props.rooms.map(room => {
		return (
			<Link to={'/'} key={room.key}>
				{room.name}
			</Link>
		)
	})

	function handleEnterSubmit(kbEvent: React.KeyboardEvent<HTMLInputElement>) {
		kbEvent.persist()
		if (kbEvent.keyCode === 13) {
			props.createRoom(kbEvent.currentTarget.value, props.history)
		}
	}

	return (
		<div id="rooms-container">
			<input type="text" onKeyDown={handleEnterSubmit} />
			{rooms}
		</div>
	)
}

export default withRouter(Lobby)