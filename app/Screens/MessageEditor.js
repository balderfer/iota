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

// Actions
var ComposerActions = require('../Actions/ComposerActions');

var MessageEditor = React.createClass({
  onChange: function(text) {
    ComposerActions.setMessage(text);
  },

  onDateChange: function(date) {
    ComposerActions.setDate(date);
  },

  switchToRecipient: function() {
    ComposerActions.switchStage('recipient');
  },

  renderNote: function() {
    if (this.props.notification.message === '' || true) {
      return (
        <Text style={styles.note}>Type something {this.props.user.email}!</Text>
      );
    }
  },

  render: function() {
    console.log('USER: ' + this.props.user);
    return(
      <View style={{flex: 1}}>
        <View style={styles.container}>
          {this.renderNote()}
          <Input
            onChange={this.onChange}
            multiline={true}
            autoFocus={true}
          />
          <DatePicker
            date={this.props.notification.date}
            onDateChange={this.onDateChange}
          />
          <Button
            disabled={this.props.notification.message === ''}
            onPress={this.switchToRecipient}
            text='NEXT'
          />
        </View>
        <KeyboardSpacer/>
      </View>
    );
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

module.exports = MessageEditor;
