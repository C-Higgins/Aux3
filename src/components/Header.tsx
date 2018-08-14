import * as React from 'react'
import {Link} from 'react-router-dom'
import '../css/Header.css'

interface HeaderProps {
	name: string | null
	updateName: (newName: string) => any
}

const Home: React.SFC<HeaderProps> = (props) => {
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
				<i className="material-icons lobby-button">
					add_circle_outline
				</i>
				<i className="material-icons lobby-button">
					settings
				</i>
			</div>
		</div>
	</div>
}

export default Home