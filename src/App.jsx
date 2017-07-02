import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

const socket = new WebSocket('ws://localhost:3001');

class App extends Component {

//setting state to include all props necessary for app
  constructor(props) {
    // console.log('setting constructor')
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [], // array of objects with 5 keys: username, content & id, name, oldName
      clientSize: 0
    }
    // this.socket = new WebSocket('ws://localhost:3001'); // this may need to be added back ....
  }


  // function takes full input from ChatBar message and appends it to the 'this.state' variable using concat
  handleSubmitMessage(content) {
    // declare keys for the inputs from .....................
    let msg = {
      username: document.getElementById('username').value, // needs to
      content: content,
      type: "postMessage"
    }
    // send input to the server
    socket.send(JSON.stringify(msg));
  }

  handleSubmitUser(username) {
    //save oldName & newName
    let oldName = this.state.currentUser.name;
    let newName = document.getElementById('username').value;

    // update the current user name to new name
    this.setState((prevState) => {
      return {currentUser: {name: newName}}
    })

    //send server oldName & newName
    if (newName !== oldName) {
    let user = {
      newName: document.getElementById('username').value,
      oldName: oldName,
      type: "postNotification"
    }
    socket.send(JSON.stringify(user));
    }
  }

  // self explanatory
  componentDidMount() {
    socket.onopen = (event) =>  {
      console.log('connected')
    }

// watch for a message event
    socket.onmessage = (event) => {

      // parse the input
      let data = JSON.parse(event.data);

      // boolean to check for 'type' of input - defined on server side
      switch(data.type) {
        case "incomingMessage":
          this.setState((prevState) => {
            let messages = [].concat(prevState.messages).concat(data)
            return {messages: messages}
          });
          break;

        case "incomingNotification":
          this.setState((prevState) => {
            let newUsername = data.newName;
            let oldUsername = data.oldName;
            let notificationContent = {
              oldName: oldUsername,
              newName: newUsername,
              content: " changed name to ",
              type: "incomingNotification"
            }
            let messages = [].concat(prevState.messages).concat(notificationContent)

            return {messages: messages}
          });
            break;

            case "clientsConnected":
              this.setState((prevState) => {
              return {clientSize: data.clientSize}
              })
            break;
          default:
          // show an erro in the console if the message type in unknown
          throw new Error("Unknown event type" + data.type);
      }
    };

    setTimeout(() => {
    }, 3000);
}

  render() {
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <h2>{this.state.clientSize} users online</h2>
          </nav>
          <MessageList messages={this.state.messages} currentUser={this.state.currentUser}/>
          <ChatBar handleSubmitUser={this.handleSubmitUser.bind(this)} handleSubmitMessage={this.handleSubmitMessage.bind(this)} currentUser={this.state.currentUser}/>
        </div>
      );
  }
}

export default App;
