import React, {FunctionComponent} from 'react'
import {Link} from 'react-router-dom'
import '../css/Header.css'
import {MdAddCircleOutline, MdSettings} from 'react-icons/md'

interface HeaderProps {
	name: string | null
	updateName: (newName: string) => void
}

const Home: FunctionComponent<HeaderProps> = (props) => {
	function handleEnterSubmit(kbEvent: React.KeyboardEvent<HTMLInputElement>) {
		kbEvent.persist()
		if (kbEvent.keyCode === 13) {
			// Triggers the onblur method to do the actual submit
			kbEvent.currentTarget.blur()
		}
	}

	function handleBlurSubmit(focusEvent: React.FocusEvent<HTMLInputElement>) {
		const newName = focusEvent.target.value
		if (newName && newName !== props.name) {
			props.updateName(focusEvent.target.value)
		}
	}

	return <div id="header">
		<div className="wrapper header">
			<Link to="/"><span id="aux">Aux</span></Link>
			<h1 className="App-title">
				{props.name ? `Welcome to React, ${props.name}` : 'Loading state'}
			</h1>
			<input type="text" placeholder={props.name && props.name || ''}
				   onBlur={handleBlurSubmit}
				   onKeyDown={handleEnterSubmit} />
			<div id="buttons">
				<MdAddCircleOutline className="lobby-button" />
				<MdSettings className="lobby-button" />
			</div>
		</div>
	</div>
}

export default Home
