import { getAuth, getCurrentUser } from '../services/fireinit'
import { Rol } from '../services/api'

export const state = () => ({
  user: {
    displayName: '',
    uid: null, // no null si está logueado
    email: null,
    phoneNumber: null
  },
  listeningAuth: false,
  role: null,
  path: null
})

export const getters = {
  logged: (state) => state.user.uid !== null,
  // role: (state, getters, rootState, rootGetters) => {
  //   const localUser = rootGetters['dataset/getUser'](state.user.uid)
  //   console.log(localUser)
  //   return !localUser ? localUser.role : Rol.Anonymous
  //   return Rol.User
  // },
  role: (state) => state.role,
  uid: (state) => state.user.uid,
  email: (state) => state.user.email,
  phoneNumber: (state) => state.user.phone,
  // path: (state, dispatch, getters, rootState, rootGetters) => {
  //   dispatch('dataset/listenCol', { kind: Collection.User }, { root:true })
  //   const localUser = rootGetters['dataset/getUser'](state.user.uid)
  //   console.log(localUser)
  //   return createPathByRole(!localUser ? localUser.role : Rol.Anonymous)
  // },
  path: (state, getters) =>{
    const user = getters.localUser
    return getters.logged ? createPathByRole(user.role) : '/'
  },
  localUser: (state, getters, rootState, rootGetters) => state.user.uid ? rootGetters['dataset/getUser'](state.user.uid) : null,
  userIsLogin: (state, getters) =>{
    const user = getters.localUser
    return getters.logged ? user.role === Rol.User : false
  },
  adminIsLogin: (state, getters) =>{
    const user = getters.localUser
    return getters.logged ? user.role === Rol.Admin : false
  },
  superadminIsLogin: (state, getters) =>{
    const user = getters.localUser
    return getters.logged ? user.role === Rol.Superadmin : false
  }
}

export const mutations = {
  setUser(state, user) {
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
  },
  setEmail(state, email){
    state.user.email = email
  },
  setRole(state, role){
    state.role = role
  },
  setPath(state, path) {
    state.path = path
  }
}

export const actions = {
  async initAuth({ state, commit, dispatch, rootGetters }) {
    if (!state.listeningAuth) {
      commit('setListeningAuth', true)
      const auth = await getAuth()
      auth.onAuthStateChanged( user => commit('setUser', user))
      const user = await getCurrentUser() // Obtiene el usuario si no se cerrá sesión
      const prevUid = state.user.uid
      const newUid = user ? user.uid : null
      if (prevUid !== newUid) commit('setUser', user)
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
    const auth = await getAuth()
    await auth.signOut()
    commit('setUser', null)
    // await commit('setRole', Rol.Anonymous)
    // await commit('setPath', '/')
  },
  async login( { commit }, credentials){
    const auth = await getAuth()
    const user = await auth.signInWithEmailAndPassword(credentials.email, credentials.password)
    await commit('setUser', user.user)
  },
  async ressetPassword( { commit, dispatch }, email ){
    const auth = await getAuth()
    return auth.sendPasswordResetEmail(email)
  },
  async setRole({ commit }, role){
    await commit('setRole', role)
  },
  async setPath({ commit }, path){
    await commit('setPath', path)
  },
  async registerUser({ state, commit, dispatch }, credentials) {
    const auth = await getAuth()
    const user = await auth.createUserWithEmailAndPassword(
      credentials.email,
      credentials.password
    )
    await auth.signOut()
    return user
  },
  async sendVerificationEmail({ state, dispatch }) {
    const auth = await getAuth()
    await auth.currentUser.sendEmailVerification()
    return true
  },
}

export const createPathByRole  = (role) => {
  switch (role) {
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


