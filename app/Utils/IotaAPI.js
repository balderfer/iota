var request = require('superagent');

var UserActions = require('../Actions/UserActions');
var ComposerActions = require('../Actions/ComposerActions');

var Constants = require('../Constants');
var APIEndpoints = Constants.APIEndpoints;

IotaAPI = {

  login: function(credentials) {
    request.post(APIEndpoints.LOGIN)
      .send(credentials)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        console.log(res.text);
        var data = JSON.parse(res.text);
        if (err) {
          console.log('Login failed with error: ' + data.message);
        } else {
          console.log('Login success!');
          UserActions.login(data.user);
        }        
      });
  },

  signup: function(credentials) {
    request.post(APIEndpoints.SIGNUP)
      .send(credentials)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        var data = JSON.parse(res.text);
        if (err) {
          console.log('Signup failed with error: ' + data.message);
        } else {
          console.log('Login success!');
          UserActions.login(data.user);
        }        
      });
  },

  getUsers: function() {
    request.get(APIEndpoints.GET_USERS)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        var data = JSON.parse(res.text);
        if (err) {
          console.log('Retrieving users failed with error: ' + data.message);
        } else {
          console.log(data.message);
          ComposerActions.recieveUsers(data.users);
        }
      });
  },

  sendNotification: function(notification) {
    request.post(APIEndpoints.SEND_NOTIFICATION)
      .send(notification)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        var data = JSON.parse(res.text);
        if (err) {
          console.log('Send notification failed with error: ' + data.message);
        } else {
          console.log('Notification sent!');
          // UserActions.login(data.user);
        }        
      });
  }

}

module.exports = IotaAPI;