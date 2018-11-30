import React, {PureComponent} from 'react'
import '../css/Chat.css'
import {RoomState} from 'types'
import classes from 'classnames'
import {MdArrowDropDown, MdArrowDropUp, MdGroup} from 'react-icons/md'

interface ChatProps {
	messages: RoomState['messages']
	users: RoomState['users']
	showUsers: boolean
	sendChat: (message: string) => any
	isLoading: boolean,
}

class Chat extends PureComponent<ChatProps> {

	messagesDiv = null as HTMLDivElement | null
	textArea = null as HTMLTextAreaElement | null

	componentDidUpdate(prevProps: ChatProps) {
		if (this.messagesDiv) {
			this.messagesDiv.scrollTop = this.messagesDiv.scrollHeight
		}
	}

	checkKey = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		event.persist()
		if (event.keyCode !== 13 || event.currentTarget.value === '') {
			return
		}
		event.preventDefault()
		this.props.sendChat(event.currentTarget.value)
		this.textArea!.value = ''
	}

	render() {
		const messages = this.props.messages.map(message => {
			const messageClasses = classes('message', {system: message.system})

			return (<p className={messageClasses} key={message.timestamp}>
				{message.author && <strong>{message.author}:</strong>}<br />{message.text}
			</p>)
		})

		return (<div id='chat'>
			<div id="users-small">

				{this.props.showUsers ? <MdArrowDropUp /> : <MdArrowDropDown />}
				<span style={{
					position: 'absolute',
					left: '10px',
				}}>
				<MdGroup size="1.5em" />
					{this.props.users.length}
			</span>
				<br />
				<div id="users-big">user list</div>
			</div>

			<div id="chat-messages-container">
				<div id="chat-messages" ref={div => {
					this.messagesDiv = div
				}}>
					{this.props.isLoading ? 'Loading...' : messages}
				</div>
			</div>
			<textarea
				onKeyDown={this.checkKey}
				className="chat-input"
				placeholder="Chat..."
				ref={textarea => {
					this.textArea = textarea
				}}
			/>

		</div>)
	}
}

export default Chat
