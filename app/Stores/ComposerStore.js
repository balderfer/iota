var React = require('react-native');
var store = require('react-native-simple-store');

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Dispatcher = require('../Dispatcher');

var CHANGE_EVENT = 'CHANGE_EVENT';
var Constants = require('../Constants');
var ActionTypes = Constants.ActionTypes;
var LocalStorageKeys = Constants.LocalStorageKeys;

var _notification = {
  message: '',
  date: new Date()
};
var _stage = 'message';
var _users = [];

var ComposerStore = assign({}, EventEmitter.prototype, {
  get: function() {
    return _notification;
  },

  getStage: function() {
    return _stage;
  },

  getUsers: function() {
    return _users;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

Dispatcher.register(function(action) {
  switch(action.actionType) {
    case ActionTypes.SET_MESSAGE:
      _notification.message = action.message;
      ComposerStore.emitChange();
      break;
    case ActionTypes.SET_MESSAGE:
      _notification.date = action.date;
      ComposerStore.emitChange();
      break;
    case ActionTypes.SWITCH_STAGE:
      _stage = action.stage;
      ComposerStore.emitChange();
      break;
    case ActionTypes.RECIEVE_USERS:
      _users = action.users;
      ComposerStore.emitChange();
      break;
  }
});

module.exports = ComposerStore;