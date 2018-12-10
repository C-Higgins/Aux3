import React, {FunctionComponent} from 'react'
import ChatWrapper from '../wrappers/ChatWrapper'
import Dropzone from 'react-dropzone'

interface RoomProps {
	id: string
	name: string
	isLoading: boolean
	onFilesSubmit?: (accepted: File[], rejected: File[]) => any
}

const Home: FunctionComponent<RoomProps> = (props) => {
	const loading = 'LOADING...'
	const notLoading = `you are in room ${props.id} (${props.name})`

	return <div id="room-container">
		{props.isLoading ? loading : notLoading}
		<ChatWrapper />
		<Dropzone
			accept="audio/*"
			onDrop={props.onFilesSubmit} />
	</div>
}
export default Home
