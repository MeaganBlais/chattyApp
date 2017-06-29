import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

const socket = new WebSocket('ws://localhost:3001');

//setting state to include all props necessary for app
class App extends Component {

  constructor(props) {
    // console.log('setting constructor')
    super(props);
    this.state = {
      currentUser: "Bob",
      messages: [
        {
          id: 1,
          username: "Anonymous",
          content: "What's this new app about?"
        },
        {
          id: 2,
          username: "Bob",
          content: "Anyone out there?"
        }
      ]
    }
    this.socket = new WebSocket('ws://localhost:3001');
  }

  // function takes full input from ChatBar message and appends it to the 'this.state' variable using concat
  handleSubmitMessage(content) {
    this.setState({
      messages: this.state.messages.concat({id:this.state.messages.length + 1, username:this.state.currentUser, content:content})
    })

    var msg = {
      username: document.getElementById('username').value,
      content: content
    }
    socket.send(JSON.stringify(msg));
    // console.log('content', content)
  }

  componentDidMount() {
    // console.log('componentDidMount <App/>')
    socket.onopen = function (event) {
      console.log('connected')
    }


    setTimeout(() => {
      console.log('Simulating incoming message');
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello, there!"}
      const messages = this.state.messages.concat(newMessage)
      //Update the state of the app component.
      //Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
}

  render() {
    // console.log('App');
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <MessageList messages={this.state.messages}/>
          <ChatBar currentUser={this.state.currentUser} handleSubmitMessage={this.handleSubmitMessage.bind(this)}/>
        </div>
      );
  }
}

export default App;
