// 'Component' is a React object exported by default when you have a named import
import React, {Component} from 'react';

class Notification extends Component {
  render() {
    // console.log('Message') // 1st step/check used to understand order components are called

const {newName, content, oldName} = this.props;
  // console.log('content', content)


    return (
      <div>
        <div className="notification">
          <span className="notification-oldName">{oldName}</span>
          <span className="notification-content">{content}</span>
          <span className="notification-newName">{newName}</span>
        </div>
      </div>
    );
  }
}
export default Notification;
