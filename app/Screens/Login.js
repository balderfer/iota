var React = require('react-native');
var KeyboardSpacer = require('react-native-keyboard-spacer');
var {
  PushNotificationIOS,
  View,
  StyleSheet,
  Text
} = React;

var Input = require('../Components/Input');
var Button = require('../Components/Button');
var IotaAPI = require('../Utils/IotaAPI');

var Login = React.createClass({
  getInitialState: function() {
    return {
      email: '',
      password: ''
    }
  },

  onEmailChange: function(text) {
    this.setState({email: text});
  },

  onPasswordChange: function(text) {
    this.setState({password: text});    
  },

  login: function() {
    var self = this;
    IotaAPI.login({
      email: this.state.email,
      password: this.state.password,
      deviceToken: this.props.deviceToken
    });
  },

  signup: function() {
    var self = this;
    IotaAPI.signup({
      email: this.state.email,
      password: this.state.password,
      deviceToken: this.props.deviceToken
    });
  },

  render: function() {
    return(
      <View style={{flex: 1}}>
        <Input
          keyboardType='email-address'
          placeholder='Email'
          onChange={this.onEmailChange}
        />
        <Input
          secureTextEntry={true}
          placeholder='Password'
          onChange={this.onPasswordChange}
        />
        <Button
          text='LOG IN'
          onPress={this.login}
        />
        <Button
          text='SIGN UP'
          onPress={this.signup}
        />
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

module.exports = Login;
