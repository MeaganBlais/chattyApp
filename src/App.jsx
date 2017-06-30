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
      currentUser: {name: "Bob"},
      messages: []
    }
    this.socket = new WebSocket('ws://localhost:3001');
  }

  // function takes full input from ChatBar message and appends it to the 'this.state' variable using concat
  handleSubmitMessage(content) {
    // this.setState({
    //   messages: this.state.messages.concat({id:this.state.messages.length + 1, username:this.state.currentUser, content:content})
    // })

    let msg = {
      username: document.getElementById('username').value,
      content: content
    }
    socket.send(JSON.stringify(msg));
    // console.log('content', content)
  }

  componentDidMount() {
    // console.log('componentDidMount <App/>')
    socket.onopen = (event) =>  {

      console.log('connected')
    }

    socket.onmessage = (event) => {
      // console.log('event', event);
      let msg = JSON.parse(event.data);
      console.log('msg', msg)
      console.log('before', this.state)
      switch(msg.type) {
        case "message":
        this.setState((prevState) => {
          prevState.messages.push(msg);
          this.setState({messages: prevState.messages});
        });
        console.log('after', this.state)
  break;
      // this.setState({
      //
      // })
      }
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
          <ChatBar currentUser={this.state.currentUser.name} handleSubmitMessage={this.handleSubmitMessage.bind(this)}/>
        </div>
      );
  }
}

export default App;
