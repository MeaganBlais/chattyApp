// 'Component' is a React object exported by default when you have a named import
import React, {Component} from 'react';

class Notification extends Component {
  render() {

    const {newName, content, oldName} = this.props;
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
