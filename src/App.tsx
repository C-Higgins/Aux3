import * as React from 'react'
import './App.css'
import Home from './components/Home'
import {connect} from 'react-redux'
import {signInAnonymously, updateName} from './redux/authorization'
import * as Types from './redux/types'
import {bindActionCreators} from 'redux'
import {RouteComponentProps} from 'react-router'


const actions = {
	signInAnonymously,
	updateName,
}
type Props = typeof actions & Types.AuthorizationState & RouteComponentProps<any>

class App extends React.Component<Props> {

	async componentWillMount() {
		await this.props.signInAnonymously()

		// TODO: put the listeners in here and have them call actions
	}

	render() {
		return (
			<Home
				name={this.props.user && this.props.user.displayName}
				updateName={this.props.updateName}
			/>
		)
	}
}

const mapStateToProps = (state: Types.State) => ({...state.authorization})
const mapDispatchToProps = (dispatch: Types.ThunkDispatch) => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(App)
