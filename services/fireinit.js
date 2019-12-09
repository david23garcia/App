import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  apiKey: 'AIzaSyBXrWwYm0m9SVgmf2CmVMfMv-4AlWfn2LU',
  authDomain: 'comerciolocal-d913c.firebaseapp.com',
  databaseURL: 'https://comerciolocal-d913c.firebaseio.com',
  projectId: 'comerciolocal-d913c',
  storageBucket: 'comerciolocal-d913c.appspot.com',
  messagingSenderId: '292041066914',
  appId: '1:292041066914:web:f7d551a47f7fcfbc400afb'
}

const PersistenceOptions = {
  synchronizeTabs: true
}

const ForcePersistence = false

let fb = null

const fireInit = async () => {
  const firebaseModule = await import('firebase/app')
  const firebase = firebaseModule.default
  await import('firebase/auth')

  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
  fb = firebase // finish, assign to module var
  return fb
}

let fbPromise = null

export const getFirebase = async () => {
  if (fb === null) {
    if (fbPromise === null) {
      fbPromise = fireInit()
    }
    await fbPromise
  }
  return fb
}

export const getAuth = async () => {
  if (fb === null) {
    await getFirebase()
  }
  return fb.auth()
}

let db = null
let serverTimeStamp = null

const firestoreInit = async () => {
  if (fb === null) {
    await getFirebase()
  }
  await import('firebase/firestore')
  const firestore = fb.firestore()
  if (ForcePersistence) {
    try {
      await firestore.enablePersistence(PersistenceOptions)
    } catch (err) {
      console.log('Sin persistencia: ' + err.code)
    }
  }
  db = firestore
  serverTimeStamp = fb.firestore.FieldValue.serverTimestamp()
  // console.log(serverTimeStamp)
  return db
}

let dbPromise = null

export const getDB = async () => {
  if (db === null) {
    if (dbPromise === null) {
      dbPromise = firestoreInit()
    }
    await dbPromise
  }
  return db
}

// All functions
const endPoint = {
  // Functions
  functions: null,
  updateAuth: null,
  checkEmail: null,
  addUser: null,
  _functionsPromise: null,

  _initFunctions () {
    this.updateAuth = this.functions.httpsCallable('updateAuth')
    this.checkEmail = this.functions.httpsCallable('checkEmail')
    this.addUser = this.functions.httpsCallable('addUser')
  },
  async _functionsInit () {
    if (fb === null) {
      await getFirebase()
    }
    await import('firebase/functions')
    this.functions = fb.app().functions('europe-west1')
    this._initFunctions()
    return this.functions
  },
  async _init () {
    if (this.functions === null) {
      if (this._functionsPromise === null) {
        this._functionsPromise = this._functionsInit()
      }
      await this._functionsPromise
    }
  }
}

export const getEndPoint = async () => {
  await endPoint._init()
  return endPoint
}

export const getServerTimeStamp = async () => {
  await getDB()
  return serverTimeStamp
}

function getCurrentUserPromise (auth) {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}

export const getCurrentUser = async () => {
  const auth = await getAuth()
  if (auth.currentUser) {
    return {  displayName: auth.currentUser.displayName,
      uid:  auth.currentUser.uid,
      email:  auth.currentUser.emailVerified }
  }
  const result = await getCurrentUserPromise(auth)
  return result
}

export const onAuthStateChanged = async () => {
  const auth = await  getAuth()
  console.log("ESTOY DENTRO DE onAuthStateChanged")
  auth.onAuthStateChanged(user => {
    return user
  })
}

export const signOut = async () => {
  const auth = await getAuth()
  return auth.signOut()
}

export const signInWithEmailAndPassword = async (email, password) => {
  const auth = await getAuth()
  auth.signInWithEmailAndPassword(email, password).then((user) => {
    return user.user
  })
}
