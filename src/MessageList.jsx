// message list //
// collect messages to place in list
import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx'

class MessageList extends Component {
  render() {
    // console.log('MessageList', this.props.messages[0])

    // console.log(this.props, 'this.now')
    const {messages} = this.props;
    console.log(this.props, 'this.now-1')
    // console.log("1", messages[0])
    // console.log("messages", messages) // Michelle's static input
    return (
      // grabbing the messages prop and looping through each item
      <div>
        <div className="messages">
          {messages.map((message, index) => {
          //  if (message.type === "incomingMessage") {
            return (
              <Message key={index} username={message.username}   content={message.content}/>
            )
            //} else if (message.type === "incomingNotification") {
            //   return (
            //     <div className="message system">
            //       <Notification key={index} oldName={message.oldName} text="changed their name to" newName={message.name} />
            //     </div>
            //   )
            // }
          }
          )};
        )
       </div>
     </div>
    );
    // console.log("message", message)
  }
}
export default MessageList;
