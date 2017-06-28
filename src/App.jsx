import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'



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
          body: "What's this new app about?"
        },
        {
          id: 2,
          username: "Bob",
          body: "Anyone out there?"
        }
      ]
  }


  }


  componentDidMount() {
    // console.log('componentDidMount', this.state)
    setTimeout(() => {
      this.setState({loading: true})
    }, 2000)
  }

  render() {
    // console.log('App');
    if(this.state.loading) {
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <MessageList messages={this.state.messages}/>
          <ChatBar currentUser={this.state.currentUser}/>
        </div>
      );
    } else {
      return <h1>3 seconds have elapsed and page is loading</h1>
    }
  }
}
export default App;
