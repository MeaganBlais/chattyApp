// message list //
// collect messages to place in list
import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    const {messages} = this.props;
    return (
      // grabbing the messages prop and looping through each item
      <div>
        <div className="messages">
          {messages.map((message, index) => {
            if (message.type === "incomingMessage") {
              return (
                <Message key={index} username={message.username}   content={message.content}/>
              )
            } else if (message.type === "incomingNotification") {
              return (
                <Notification key={index} oldName={message.oldName}   content={message.content}  newName={message.newName}/>
              )
            }
          }
          )};
        )
       </div>
     </div>
    );
  }
}
export default MessageList;
