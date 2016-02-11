var Dispatcher = require('../Dispatcher.js');

var Constants = require('../Constants');
var ActionTypes = Constants.ActionTypes;

var UserActions = {

  setDeviceToken: function(token) {
    Dispatcher.dispatch({
      actionType: ActionTypes.SET_DEVICE_TOKEN,
      deviceToken: token
    });
  },

  login: function(user) {
    Dispatcher.dispatch({
      actionType: ActionTypes.LOGIN,
      user: user
    });
  }

};

module.exports = UserActions;