// 'Component' is a React object exported by default when you have a named import
import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    // console.log('setting constructor')
    super(props);
    this.state = {
      content: "",
      username: ""
    }
  }

// function that will take the input, store the input until the 'Enter' key
// is pressed and then send the input to the 'handleSubmitMessage' function on App.jsx
// and resets the input field to an empty string
  handleMessageChange (e) {
    if (e.key === "Enter") {
      this.props.handleSubmitMessage(this.state.content)
      this.setState({content:""});
    // } else if (e.key === "backspace") {
    } else if (e.key === "Backspace") {
      // this.props.handleSubmitMessage(this.state.content)
      this.setState({content:this.state.content.substring(0, this.state.content.length-1)})
    } else {
      this.setState({content:this.state.content + e.key})
    }
    // console.log('test', this.state)
  }

  handleUserChange (e) {
    // console.log('e', e)
    if (e.key === "Enter") {
      this.props.handleSubmitUser(this.state.username)
      this.setState({username:""});
    } else if (e.key === "Backspace") {
      this.setState({username: this.state.username.substring(0, this.state.username.length-1)})
    } else {
      this.setState({username:this.state.username + e.key})
    }
  }

  render() {
    console.log('ChatBar')
    return (
      <footer className="chatbar">
        <input className="chatbar-username" id="username" value={this.state.username} onKeyUp={this.handleUserChange.bind(this)} />
        <input className="chatbar-message" value={this.state.content} onKeyUp={this.handleMessageChange.bind(this)} />
      </footer>
    );
  }
}

export default ChatBar;
