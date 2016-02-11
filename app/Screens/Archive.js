var React = require('react-native');
var KeyboardSpacer = require('react-native-keyboard-spacer');
var {
  View,
  StyleSheet,
  Text
} = React;

var Input = require('../Components/Input');
var Button = require('../Components/Button');

var Archive = React.createClass({
  render: function() {
    return(
      <View style={{flex: 1}}>
        <Text>Archive!</Text>
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

module.exports = Archive;
