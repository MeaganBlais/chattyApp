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
      currentUser: {name: "Bob"},
      messages: [] // array of objects with 3 keys: username, content & id
    }
    this.socket = new WebSocket('ws://localhost:3001');
  }

  // function takes full input from ChatBar message and appends it to the 'this.state' variable using concat
  handleSubmitMessage(content) {

                    // removed to allow .................................... new message?
                    // this.setState({
                    //   messages: this.state.messages.concat({id:this.state.messages.length + 1, username:this.state.currentUser, content:content})
                    // })

    // declare keys for the inputs from .....................
    let msg = {
      username: document.getElementById('username').value, // needs to
      content: content
    }
    // send input to the server
    socket.send(JSON.stringify(msg));
    // console.log('content', content)
  }

  handleSubmitUser(username) {
    let currentUser = {
      name: document.getElementById('username').value
    }
    socket.send(JSON.stringify(currentUser));
  }

  // self explanatory
  componentDidMount() {
    // console.log('componentDidMount <App/>')
    socket.onopen = (event) =>  {
      console.log('connected')
    }

// watch for a message event
    socket.onmessage = (event) => {
      // console.log('event', event);

      // parse the input
      let msg = JSON.parse(event.data);
      // console.log('msg', msg, 'before', this.state)

      // boolean to check for 'type' of input
      switch(msg.type) { // defined on server side
        case "message":
        this.setState((prevState) => {
          prevState.messages.push(msg);
          this.setState({messages: prevState.messages});
        });
          // console.log('after', this.state)

          break;
      }
    }

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
    // console.log('App'); // 1st step/check used to understand order components are called
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <MessageList messages={this.state.messages}/>
          <ChatBar currentUser={this.state.currentUser.name} handleSubmitMessage={this.handleSubmitMessage.bind(this)}/>
        </div>
      );
  }
}

export default App;
