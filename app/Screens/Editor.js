var React = require('react-native');
var KeyboardSpacer = require('react-native-keyboard-spacer');
var {
  View,
  StyleSheet,
  Text,
  PushNotificationIOS
} = React;

// Components
var Input = require('../Components/Input');
var DatePicker = require('../Components/DatePicker');
var Button = require('../Components/Button');
var MessageEditor = require('./MessageEditor');
var RecipientEditor = require('./RecipientEditor');

// Stores
var ComposerStore = require('../Stores/ComposerStore');

// Actions
var ComposerActions = require('../Actions/ComposerActions');

var getStateFromStores = function() {
  return {
    notification: ComposerStore.get(),
    stage: ComposerStore.getStage(),
    users: ComposerStore.getUsers()
  }
}

var Editor = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    IotaAPI.getUsers();
    ComposerStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ComposerStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  render: function() {
    switch(this.state.stage) {
      case 'message':
        return <MessageEditor user={this.props.user} notification={this.state.notification}/>;
      case 'recipient':
        return <RecipientEditor user={this.props.user} />;
    }
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#ECF0F1',
    flex: 1,
    justifyContent: 'flex-end'
  },
  note: {
    padding: 10,
    textAlign: 'center'
  }
});

module.exports = Editor;
