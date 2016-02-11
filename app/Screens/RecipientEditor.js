var React = require('react-native');
var KeyboardSpacer = require('react-native-keyboard-spacer');
var {
  View,
  StyleSheet,
  Text,
  ListView,
  PushNotificationIOS
} = React;

// Components
var Input = require('../Components/Input');
var DatePicker = require('../Components/DatePicker');
var Button = require('../Components/Button');

// Utils
var IotaAPI = require('../Utils/IotaAPI');

// Stores
var ComposerStore = require('../Stores/ComposerStore');

// Actions
var ComposerActions = require('../Actions/ComposerActions');

var getStateFromStores = function() {
  var users = ComposerStore.getUsers();
  return {
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1._id !== row2._id,
    }).cloneWithRows(users),
    notification: ComposerStore.get()
  };
}

var RecipientEditor = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  // componentDidMount: function() {
  //   ComposerStore.addChangeListener(this._onChange);
  // },

  // componentWillUnmount: function() {
  //   ComposerStore.removeChangeListener(this._onChange);
  // },

  // _onChange: function() {
  //   this.setState(getStateFromStores());
  // },

  switchToMessage: function() {
    ComposerActions.switchStage('message');
  },

  sendNotification: function(targetUser) {
    IotaAPI.sendNotification({
      message: this.state.notification.message,
      sender: this.props.user._id,
      recipient: targetUser._id,
      date: this.state.notification.date
    });
  },

  renderRow: function(rowData) {
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + rowData._id);

    return(
      <Button
        onPress={this.sendNotification.bind(this, rowData)}
        text={rowData.email}
      />
    );
  },

  render: function() {
    return(
      <View style={{flex: 1}}>
        <Button
          onPress={this.switchToMessage}
          text='BACK'
        />
        <ListView dataSource={this.state.dataSource} renderRow={this.renderRow}/>
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

module.exports = RecipientEditor;
