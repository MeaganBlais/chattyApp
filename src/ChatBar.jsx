// 'Component' is a React object exported by default when you have a named import
import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    console.log('ChatBar')
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type of message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;
