var keyMirror = require('keymirror');

var APIRoot = 'http://benji-pro.local:3000/v1';
// var APIRoot = 'https://mysigtau.herokuapp.com/v1';

var Constants = {
  APIEndpoints: {
    // User
    LOGIN: APIRoot + '/users/login',
    SIGNUP: APIRoot + '/users/signup',
    GET_USERS: APIRoot + '/users/get',

    // Notifications
    SEND_NOTIFICATION: APIRoot + '/notifications/send'
  },

  ActionTypes: keyMirror({
    
    // User
    SET_DEVICE_TOKEN: null,
    LOGIN: null,

    // Composer
    SET_MESSAGE: null,
    SET_DATE: null,
    SWITCH_STAGE: null,
    RECIEVE_USERS: null
  }),

  LocalStorageKeys: keyMirror({
    // User
    LOCAL_USER: null,
  })
}

module.exports = Constants;