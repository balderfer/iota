var Dispatcher = require('../Dispatcher.js');

var Constants = require('../Constants');
var ActionTypes = Constants.ActionTypes;

var UserActions = {

  setMessage: function(message) {
    Dispatcher.dispatch({
      actionType: ActionTypes.SET_MESSAGE,
      message: message
    });
  },

  setDate: function(date) {
    Dispatcher.dispatch({
      actionType: ActionTypes.SET_DATE,
      date: date
    });
  },

  switchStage: function(stage) {
    Dispatcher.dispatch({
      actionType: ActionTypes.SWITCH_STAGE,
      stage: stage
    });
  },

  recieveUsers: function(users) {
    Dispatcher.dispatch({
      actionType: ActionTypes.RECIEVE_USERS,
      users: users
    });
  }

};

module.exports = UserActions;