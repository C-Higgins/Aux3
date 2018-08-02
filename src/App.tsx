import * as React from 'react'
import './App.css'
import auth from './helpers/auth'
import logo from './logo.svg'


type State = Readonly<typeof App.initialState>

class App extends React.Component<{}, State> {
	static initialState = {
		name: '',
		somethingElse: true,
	}
	readonly state: State = App.initialState

	handleEnterSubmit = (kbEvent: React.KeyboardEvent<HTMLInputElement>) => {
		kbEvent.persist()
		if (kbEvent.keyCode === 13) {
			this.changeName(kbEvent.currentTarget.value)
			kbEvent.currentTarget.blur()
		}
	}
	handleBlurSubmit = (focusEvent: React.FocusEvent<HTMLInputElement>) => {
		this.changeName(focusEvent.target.value)
	}

	componentWillMount() {
		auth.signInAnonymously().then(user => {
			this.setState({name: user!.displayName || ''})
		})
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">
						{this.state.name ? `Welcome to React, ${this.state.name}` : 'Loading state'}</h1>
				</header>
				<input type="text" placeholder={this.state.name} onBlur={this.handleBlurSubmit}
					   onKeyDown={this.handleEnterSubmit} />
			</div>
		)
	}

	private changeName(newName: string) {
		if (newName.length) {
			auth.changeName(newName).then(() => {
				this.setState({name: newName})
			})
		}
	}
}


export default App
