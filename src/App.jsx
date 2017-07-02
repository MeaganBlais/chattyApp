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
      currentUser: {name: "Anonymous", oldName: "Anonymous"},
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

    let currentUser = {
      name: document.getElementById('username').value,
      type: "postNotification"
    }
    socket.send(JSON.stringify(currentUser));
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

      // boolean to check for 'type' of input
      switch(data.type) { // defined on server side
        case "incomingMessage":
        this.setState((prevState) => {
          const messages = [].concat(prevState.messages).concat(data)
          return {messages: messages}
        });
          break;


          case "incomingNotification":

          this.setState((prevState) => {
            const newUsername = data.name;
            const oldUsername = prevState.currentUser.name;

            let notificationContent = {
              oldName: oldUsername,
              newName: newUsername,
              content: " changed name to ",
              type: "incomingNotification"
            }

            const messages = [].concat(prevState.messages).concat(notificationContent)

            return {messages: messages}
          });
            break;

            case "clientsConnected":
            console.log('data', data)

            //document.getElementById();

            this.setState((prevState) => {
              return {clientSize: data.clientSize}
            })
            console.log('clientState', this.state.clientSize)


            break;



          default:
          // show an erro in the console if the message type in unknown
          throw new Error("Unknown event type" + data.type);
      }
    };

    setTimeout(() => {

      console.log('Simulating incoming message');
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello, there!"}

      //Update the state of the app component.
      const messages = this.state.messages.concat(newMessage)

      //Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
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
