import React, {FunctionComponent} from 'react'
import ChatWrapper from '../wrappers/ChatWrapper'

interface RoomProps {
	id: string
	name: string
	isLoading: boolean
}

const Home: FunctionComponent<RoomProps> = (props) => {
	const loading = 'LOADING...'
	const notLoading = `you are in room ${props.id} (${props.name})`

	return <div id="room-container">
		{props.isLoading ? loading : notLoading}
		<ChatWrapper />
		<input type="file" />
	</div>
}
export default Home
