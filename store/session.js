import { getAuth, getCurrentUser } from '../services/fireinit'
import { Collection, Rol } from '../services/api'

export const state = () => ({
  user: {
    displayName: '',
    uid: null, // no null si está logueado
    role : null,
    email: null,
    phoneNumber: null
  },
  afterLogin: '/', // donde dirigirse una vez complete el login (si accedió y no tenía permiso)
  listeningAuth: false
})

export const getters = {
  logged: (state) => state.user.uid !== null,
  role: (state) => state.user.role,
  uid: (state) => state.user.uid,
  email: (state) => state.user.email,
  phoneNumber: (state) => state.user.phone,
  path: (state) => state.afterLogin
}

export const mutations = {
  setUser(state, user) {
    console.log("User dentro del set: ", user)
    if (user) {
      state.user.displayName = user.displayName
      state.user.uid = user.uid
      state.user.role = user.role
      state.user.email = user.email
      state.user.phoneNumber = user.phone
    } else {
      // clearUserState
      state.user.displayName = ''
      state.user.uid = null
      state.user.role = null
      state.user.email = null
      state.user.phoneNumber = null
    }
  },
  setListeningAuth(state, listening) {
    state.listeningAuth = listening
  },
  setAfterLogin(state, payload) {
    state.afterLogin = payload
  }
}

export const actions = {
  async initAuth({ state, commit, dispatch, rootGetters }) {
    if (!state.listeningAuth) {
      commit('setListeningAuth', true)
      const auth = await getAuth()
      auth.onAuthStateChanged( user => {
        dispatch('dataset/listenCol', Collection.User, { root:true })
        dispatch('dataset/listenDoc', { kind: Collection.User, id: user.uid }, { root:true })
        const localUser = rootGetters['dataset/getUser'](user.uid)
        commit('setUser', { displayName: user.displayName, uid: user.uid, role: localUser.role, email: user.email, phone: user.phoneNumber })
        const path = createPathByRole(localUser.role)
        commit('setAfterLogin', path)
      })
      const user = await getCurrentUser() // Obtiene el usuario si no se cerrá sesión
      const prevUid = state.user.uid
      const newUid = user ? user.uid : null
      if (prevUid !== newUid){
        dispatch('dataset/listenCol', Collection.User, { root:true })
        dispatch('dataset/listenDoc', newUid, { root:true })
        const localUser = rootGetters['dataset/getUser'](newUid)
        console.log("localUser: ", localUser)
        commit('setUser', { displayName: user.displayName, uid: user.uid, role: localUser.role, email: user.email, phone: user.phoneNumber })
        const path = createPathByRole(localUser.role)
        commit('setAfterLogin', path)
      }
    }
  },
  async setUser({ state, dispatch, commit }, user) {
    if(user === null && state.user.uid !== null){
      await commit('setUser', null)
    } else if (user !== null) {
      await commit('setUser', user)   // cuidado con ese user, debe tener la estructura que tenemos si no, mal vamos
    }
  },
  async logout({ commit }) {
    await commit('setUser', null)
  },
  async login( { commit, dispatch, rootGetters }, credentials){
    const auth = await getAuth()
    auth.signInWithEmailAndPassword(credentials.email, credentials.password).then((user) =>{
      console.log(user.user)
      dispatch('dataset/listenCol', Collection.User, { root:true })
      dispatch('dataset/listenDoc', { kind: Collection.User, id: user.user.uid }, { root:true })
      const localUser = rootGetters['dataset/getUser'](user.user.uid)
      // console.log(localUser)
      commit('setUser', {  displayName: user.user.displayName === null ? '' : user.user.displayName,
        uid: user.user.uid,
        role : localUser.role,
        email: user.user.email,
        phoneNumber: user.user.phoneNumber === null ? '' : user.user.phoneNumber }, localUser)
      const path = createPathByRole(localUser.role)
      commit('setAfterLogin', path)
      commit('setListeningAuth', true)
      dispatch('dataset/unlistenCol', Collection.User, { root:true })
      dispatch('dataset/unlistenDoc', { kind: Collection.User, id: user.user.uid }, { root:true })
      return path
    })
  }
}

export const createPathByRole  = (role) => {
  switch (role) {
    case Rol.User:
      return '/'
    case Rol.Superadmin:
      return '/users'
    case Rol.Employee:
      return '/articles'
    case Rol.Admin:
      return '/articles'
    default:
      return '/'
  }
}


