import * as React from 'react'
import logo from '../logo.svg'

interface HomeProps {
	name: string | null
	updateName: (newName: string) => any
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
		</div>)
}

export default Home