var React = require('react-native');
var {
  Text,
  PushNotificationIOS
} = React;

// Screens
var Login = require('./Screens/Login');
var Editor = require('./Screens/Editor');
var Display = require('./Screens/Display');

// Stores
var UserStore = require('./Stores/UserStore');

// Actions
var UserActions = require('./Actions/UserActions');

var thing = null;

var getStateFromStores = function() {
  return {
    user: UserStore.get(),
    deviceToken: UserStore.getDeviceToken()
  }
}

var Root = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    PushNotificationIOS.requestPermissions();
    PushNotificationIOS.addEventListener('register', function(token) {
      console.log('You are registered and the device token is: ', token);
      UserActions.setDeviceToken(token);
    });

    // Check if app was cold launched by a notification
    var initNotification = PushNotificationIOS.popInitialNotification();
    if (initNotification) {
      console.log('You OPENED THE APP FROM THIS NOTE: ' + initNotification);
      thing = (<Text>{JSON.stringify(initNotification)}</Text>);
    }

    // Check if app was opened by a notification or one arrive while the app was opened
    PushNotificationIOS.addEventListener('notification', function(notification) {
      console.log('You recieved a NOTIFICATION: ', notification);
    });

    UserStore.addChangeListener(this._onChange);
    // RouteStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
    // RouteStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  render: function() {

    // If no user means the user is not logged in
    if (!this.state.user) {
      return <Login deviceToken={this.state.deviceToken}/>
    }
    
    switch (this.state.route) {
      case 'editor':
        return <Editor user={this.state.user}/>;
      case 'display':
        return <Display/>
      default:
        return <Editor user={this.state.user}/>;
    }
  }
});

module.exports = Root;
