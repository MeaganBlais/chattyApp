// 'Component' is a React object exported by default when you have a named import
import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    // console.log('setting constructor')
    super(props);
    this.state = {
      content: ""
    }
  }

// function that will take the input, store the input until the 'Enter' key
// is pressed and then send the input to the 'handleSubmitMessage' function on App.jsx
// and resets the input field to an empty string
  handleMessageChange (e) {
    if (e.key === "Enter") {
      this.props.handleSubmitMessage(this.state.content);
      this.state.content = ""
    } else {
      this.setState({content:this.state.content + e.key})
    }
    // console.log('test', this.state)
  }

  render() {
    // console.log('ChatBar')
    return (
      <footer className="chatbar">
        <input className="chatbar-username" id="username" value={this.props.currentUser} />
        <input className="chatbar-message" value={this.state.content} onKeyPress={this.handleMessageChange.bind(this)} />
      </footer>
    );
  }
}

export default ChatBar;
