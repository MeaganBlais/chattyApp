// 'Component' is a React object exported by default when you have a named import
import React, {Component} from 'react';

class Message extends Component {
  render() {
    // console.log('Message')

const {username, content} = this.props;
  // console.log('key', content)
    return (
      <div>
        <div className="message">
          <span className="message-username">{username}</span>
          <span className="message-content">{content}</span>
        </div>
        <div className="message system">
          "message system"
        </div>
      </div>
    );
  }
}
export default Message;
