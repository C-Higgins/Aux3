import * as React from 'react'
import logo from '../logo.svg'
import {LobbyRoom} from '../redux/types'

interface HomeProps {
	name: string | null
	updateName: (newName: string) => any
	rooms: LobbyRoom[]
}

const Home: React.SFC<HomeProps> = (props) => {
	function handleEnterSubmit(kbEvent: React.KeyboardEvent<HTMLInputElement>) {
		kbEvent.persist()
		if (kbEvent.keyCode === 13) {
			kbEvent.currentTarget.blur()
		}
	}

	function handleBlurSubmit(focusEvent: React.FocusEvent<HTMLInputElement>) {
		const newName = focusEvent.target.value
		if (newName && newName !== props.name) {
			props.updateName(focusEvent.target.value)
		}
	}

	const rooms = props.rooms.map(room => {
		return <li key={room.name}>{room.name}</li>
	})

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h1 className="App-title">
					{props.name ? `Welcome to React, ${props.name}` : 'Loading state'}</h1>
			</header>
			<input type="text" placeholder={props.name && props.name || ''}
				   onBlur={handleBlurSubmit}
				   onKeyDown={handleEnterSubmit} />
			<div>
				Lobby Rooms:
				<ul>
					{rooms}
				</ul>
			</div>
		</div>)
}

export default Home