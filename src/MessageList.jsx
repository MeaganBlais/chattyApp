// collect messages to place in list
import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    // console.log('MessageList', this.props.messages[0])

    const {messages} = this.props;
    // console.log("1", messages[0])
    // console.log("messages", messages) // Michelle's static input
    return (
      // grabbing the messages prop and looping through each item
      <div className="messages">
        {messages.map((message, index) => {
          return (
            <Message key={index} username={message.username}   content={message.content}/>
          )}
        )};

     </div>
    );
    console.log("message", message)
  }
}
export default MessageList;
