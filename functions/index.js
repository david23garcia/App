// import { pay } from '../services/api'

const functions = require('firebase-functions');
const pay = require('./pay')
const user = require('./user')

exports.pay = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
      'while authenticated.');
  }
  return pay.pay(data.orderId)
});

exports.disabledUser = functions.https.onCall((data, context) => {
  if(!context.auth){
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
      'while authenticated.');
  }
  return user.disable(data.id)
})

exports.createUser = functions.https.onCall((data, context) =>{
  if(!context.auth){
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
      'while authenticated.');
  }
  return user.create(data.email, data.password)
})
