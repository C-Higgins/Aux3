import * as React from 'react'
import ChatWrapper from '../wrappers/ChatWrapper'

interface RoomProps {
	id: string
	name: string
	isLoading: boolean
}

const Home: React.SFC<RoomProps> = (props) => {
	const loading = 'LOADING...'
	const notLoading = `you are in room ${props.id} (${props.name})`

	return <div id="room-container">
		{props.isLoading ? loading : notLoading}
		<ChatWrapper />
	</div>
}
export default Home
