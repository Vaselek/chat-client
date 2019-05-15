import React, {Component} from 'react';
import {connect} from "react-redux";
import {Col, Row} from "reactstrap";

class Chat extends Component {
    state = {
        username: '',
        usernameSet: false,
        messages: [],
        messageText: '',
        usernames: [],
    }

    setChat = () => {
        this.websocket = new WebSocket('ws://localhost:8000/chat?token=' + this.props.user.token);
        this.websocket.onmessage = event => {
            const decodedMessage = JSON.parse(event.data);

            if (decodedMessage.type === 'LATEST_MESSAGES') {
                this.setState({
                    messages: decodedMessage.messages
                })
            }

            if (decodedMessage.type === 'NEW_MESSAGE') {
                this.setState({
                    messages: [...this.state.messages, decodedMessage.message]
                })
            }

            if (decodedMessage.type === 'ACTIVE_USERS') {
                this.setState({
                    usernames: decodedMessage.usernames
                })
            }

        }
        this.websocket.onerror = error => {
            const interval = setInterval(
                () => {
                    this.websocket = new WebSocket('ws://localhost:8000/chat?token=' + this.props.user.token);
                    console.log(error)
                    if (!error) clearInterval(interval)
                }, 1000)
        }
    }

    componentDidMount() {
        this.setChat()
    }

    sendMessage = () => {
        const message = JSON.stringify({
            type: 'CREATE_MESSAGE',
            text: this.state.messageText
        })
        this.websocket.send(message);
    }

    changeInputHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {

        let users = (
            <div>
                {this.state.usernames && this.state.usernames.map(user => (
                    <li key={user}>{user}</li>
                ))}
            </div>
        )

        let chat = (
            <div>
                {this.state.messages.map((message, i) => (
                    <div key={i}>
                        <b>{message.username || 'Anonymous'}</b>:
                        <span>{message.text}</span>
                </div>
                ))}
                <div>
                    <input type="text" onChange={this.changeInputHandler} name="messageText" value={this.state.messageText}/>
                    <input type="button" value="send" onClick={this.sendMessage}/>
                </div>
            </div>
        );

        return (
            <div>
                <Row>
                <Col sm={3}>
                    <h5>Online users</h5>
                    {users}
                </Col>
                <Col sm={9} className="Chat">
                    {chat}
                </Col>
                </Row>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    user: state.users.user
});

export default connect(mapStateToProps)(Chat);
