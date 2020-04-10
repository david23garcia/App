const admin = require('firebase-admin');

exports.disable = function (id) {
  admin.initializeApp()
  return admin.auth().updateUser(id, {
    disabled: true
  })
}

exports.create = function(email, password) {
  admin.initializeApp()
  return admin.auth().createUser({
    email: email,
    emailVerified: false,
    password: password,
    disabled: false
  })
}

