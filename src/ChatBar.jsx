// 'Component' is a React object exported by default when you have a named import
import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "postMessage",
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
    } else if (e.key === "Backspace") {
      // this.props.handleSubmitMessage(this.state.content)
      this.setState({content:this.state.content.substring(0, this.state.content.length-1)})
    } else if (e.key === "Tab" || e.key === "Shift"){
      this.setState({content:this.state.content})
    } else if (e.key === "Shift") {
      this.setState({content:this.state.conent + e.key.toUpperCase()})
    } else {
      this.setState({content:this.state.content + e.key})
    }
  }

  handleUserChange (e) {
    if (e.key === "Enter") {
      this.props.handleSubmitUser(this.state.username)
      this.setState({username:""});
    } else if (e.key === "Backspace") {
      this.setState({username: this.state.username.substring(0, this.state.username.length-1)})
    } else  if (e.key === "Shift") {
      this.setState({username:this.state.username})
    } else {
      this.setState({username:this.state.username + e.key})
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" id="username" defaultValue={this.props.currentUser.name} placeholder= "Your Name (Optional)" onKeyUp={this.handleUserChange.bind(this)} />
        <input className="chatbar-message" value={this.state.content} placeholder= "Type a message and hit ENTER" onKeyUp={this.handleMessageChange.bind(this)} />
      </footer>
    );
  }
}

export default ChatBar;
