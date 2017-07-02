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
      messages: [] // array of objects with 5 keys: username, content & id, name, oldName
    }
    this.socket = new WebSocket('ws://localhost:3001');
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
    // console.log('content', content)
  }

  handleSubmitUser(username) {
    // let previousUser = {
    //   name: ,
    //   type: "postNotification"
    // }


    let currentUser = {
      name: document.getElementById('username').value,
      type: "postNotification"
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
      // console.log("event", event)
      // console.log('event', event);
      // debugger;

      // parse the input
      let data = JSON.parse(event.data);
      // console.log('msg', msg, 'before', this.state)

      // console.log('data.type', data.type)
      // console.log('prevState', prevState);
      // console.log('this.state', this.state)


      // boolean to check for 'type' of input
      switch(data.type) { // defined on server side
        case "incomingMessage":
        this.setState((prevState) => {
          // console.log("prevState", prevState)
          // console.log("data", data)
          // prevState.messages.push(data);
          const messages = [].concat(prevState.messages).concat(data)
          // console.log("messages", messages)
          // this.setState({messages: prevState.messages.username});
          // this.setState({currentUser: {name: prevState.messages.username}})
          return {messages: messages}
        });
          // console.log('after', this.state)
          break;


          case "incomingNotification":
          // let oldUsername = this.state.currentUser.name
          // console.log('test', this.props.currentUser.name)
          // let newUsername = data.name
          // console.log('user', user)
          // console.log(msg, 'msgssg')
          // console.log(data.name, 'dats')
          // console.log('oldUser', this.state.currentUser.name)
          // user.notification = prevState.currentUser.user + " has changed name " + name


console.log('detect incoming')

          this.setState((prevState) => {
            const newUsername = data.name;
            const oldUsername = prevState.currentUser.name;

            // console.log(newUsername, 'newUsername')
            // console.log('prevState1', prevState)
            var content = oldUsername + " changed their name to " + newUsername
            data.content = content;
            // var msgdata = {
            //     id: data.id,
            //     content: content,
            //     name: data.name
            //
            // };
            console.log('msgdata', data)




            // return [{messages:
            //   {
            //     content: content
            //     //  index: data.id,
            //     //  name: newUsername,
            //     //  oldName: oldUsername,
            //     //  type:"incomingNotification"}
            //    }]
            // console.log('name', {currentUser: {name: newUsername, oldName: oldUsername}})
            // console.log( {currentUser: {name: newUsername}} )

            const messages = [].concat(prevState.messages).concat(data)
            // console.log("messages", messages)
            // this.setState({messages: prevState.messages.username});
            // this.setState({currentUser: {name: prevState.messages.username}})
            return {messages: messages}
          });

          console.log("state", this.state)
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
    // console.log('App'); // 1st step/check used to understand order components are called
    // console.log(this.state.currentUser, '1st')
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <MessageList messages={this.state.messages} currentUser={this.state.currentUser}/>
          <ChatBar handleSubmitUser={this.handleSubmitUser.bind(this)} handleSubmitMessage={this.handleSubmitMessage.bind(this)} currentUser={this.state.currentUser}/>
        </div>
      );
  }
}

export default App;
