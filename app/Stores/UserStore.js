var React = require('react-native');
var store = require('react-native-simple-store');

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Dispatcher = require('../Dispatcher');

var CHANGE_EVENT = 'CHANGE_EVENT';
var Constants = require('../Constants');
var ActionTypes = Constants.ActionTypes;
var LocalStorageKeys = Constants.LocalStorageKeys;

var _user = null;
var _deviceToken = null;

store.get(LocalStorageKeys.LOCAL_USER).then(function(user) {
  if (user) {
    _user = user;
    UserStore.emitChange();
  }
});

var storeUser = function(user) {
  if (user.email) {
    store.save(LocalStorageKeys.LOCAL_USER, user).then(function(error) {
      if (error) {
        console.log('Error setting item (' + LOCAL_USER_KEY + ') to local storage. ' + error.message);
      }
    })
    _user = user;
    UserStore.emitChange();
  }
}

var deleteUser = function() {
  store.delete(LocalStorageKeys.LOCAL_USER).then(function(err) {
    if (error) {
      console.log('Error deleting user/logging out.');
    }
    _user = null;
    UserStore.emitChange();
  })
}

var UserStore = assign({}, EventEmitter.prototype, {
  get: function() {
    return _user;
  },

  getDeviceToken: function() {
    return _deviceToken;
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
    case ActionTypes.SET_DEVICE_TOKEN:
      _deviceToken = action.deviceToken;
      UserStore.emitChange();
      break;
    case ActionTypes.LOGIN:
      storeUser(action.user);
      break;
    case ActionTypes.LOGOUT:
      deleteUser();
      break;

  }
});

module.exports = UserStore;