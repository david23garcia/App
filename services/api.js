import Vue from 'vue'
import { getEndPoint, getDB, getServerTimeStamp, getAuth } from '~/services/fireinit'

export const UIActions = {
  ChooseModelDirectly: 'chooseModelDirectly'
}

export const Collection = {
  Article: 'article',
  Shop: 'shop',
  Order: 'order',
  Commentary: 'commentary',
  Assessment: 'assessment',
  User: 'user'
}

export const ChangeType = {
  Added: 'added',
  Modified: 'modified',
  Removed: 'removed'
}

export const Rol = {
  Admin: 'admin',
  Super: 'super',
  User: 'user'
}

export const Group = {
  Anea: 'anea',
  Devel: 'dev',
  Eco: 'eco',
  User: 'user'
}

export const SnapshotOptions = { serverTimestamps: 'estimate' }

export const checkEmail = async function (email) {
  const endPoint = await getEndPoint()
  const { data } = await endPoint.checkEmail({ email })
  return data
}

export const addUser = async function (email, name, company, telf) {
  const endPoint = await getEndPoint()
  const { data } = await endPoint.addUser({ email, name, company, telf })
  return data
}

export const updateAuth = async function () {
  const endPoint = await getEndPoint()
  const { data } = await endPoint.updateAuth({})
  return data
}

// callback es called with the snapshot
// returns unsubscribe method
export const listenCollection = async function (collection, callback) {
  const db = await getDB()
  return db.collection(collection).onSnapshot(callback)
}

// callback es called with the snapshot
// returns unsubscribe method
export const listenDocument = async function (kind, id, callback) {
  const db = await getDB()
  return db
    .collection(kind)
    .doc(id)
    .onSnapshot(callback)
}

// SyncJSonCol. Please note that in modifications, does not deep merge objects
export const syncJsonCol = function (snapshot, json, remove = true) {
  snapshot.docChanges().forEach((change) => {
    // console.log(change)
    if (change.type === ChangeType.Added) {
      Vue.set(json, change.doc.id, change.doc.data(SnapshotOptions))
    } else if (remove && change.type === ChangeType.Removed) {
      Vue.delete(json, change.doc.id)
    } else if (change.type === ChangeType.Modified) {
      const dest = json[change.doc.id]
      if (!dest) {
        Vue.set(json, change.doc.id, change.doc.data(SnapshotOptions))
      } else {
        const orig = change.doc.data(SnapshotOptions)
        // eslint-disable-next-line no-unused-vars
        for (const p in orig) {
          if (orig.hasOwnProperty(p)) {
            Vue.set(dest, p, orig[p])
          }
        }
      }
    }
  })
}
// update field, and modify updated
export const updateField = async function (kind, id, fieldPath, value) {
  const db = await getDB()
  const timeStamp = await getServerTimeStamp()
  return db
    .collection(kind)
    .doc(id)
    .update(fieldPath, value, 'updated', timeStamp)
}

export const updateFields = async function (kind, id, fields, source) {
  const db = await getDB()
  const timeStamp = await getServerTimeStamp()
  const pairs = []
  for (const f of fields) {
    pairs.push(f, source.hasOwnProperty(f) ? source[f] : null)
  }
  pairs.push('updated', timeStamp)
  return db
    .collection(kind)
    .doc(id)
    .update(...pairs)
}

export const deleteDocument = async function (kind, id) {
  const db = await getDB()
  return db
    .collection(kind)
    .doc(id)
    .delete()
}

export const addDocument = async function (kind, field) {
  const db = await getDB()
  return db.collection(kind).add(field)
}

export const addDocumentByUid = async function (kind, field, uid) {
  const db = await getDB()
  return db.collection(kind).doc(uid).set(field)
}

export const registerUser = async function (kind, field) {
  const fb = await getAuth()
  return fb.createUserWithEmailAndPassword(field.email, field.password)
}

export const loginFirebase = async function (email, password) {
  const fb = await getAuth()
  return fb.signInWithEmailAndPassword(email, password)
}

// export const userSession() = async function (){
//   const fb = await getAuth()
//
//   return fb.currentUser
// }
