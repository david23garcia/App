import { getAuth, getCurrentUser } from '../services/fireinit'
import {
  addDocumentById,
  Collection,
  disableUser,
  registerUser,
  registerUserByBackend,
  Rol,
  updateDocument
} from '../services/api'

export const state = () => ({
  user: {
    displayName: '',
    uid: null, // no null si está logueado
    email: null,
    phoneNumber: null
  },
  listeningAuth: false
})

export const getters = {
  logged: (state) => state.user.uid !== null,
  role: (state) => state.role,
  uid: (state) => state.user.uid,
  email: (state) => state.user.email,
  phoneNumber: (state) => state.user.phone,
  path: (state, getters) =>{
    if(getters.logged) {
      return createPathByRole(getters.localUser.role)
    }
    return  createPathByRole('undefined')
  },
  localUser: (state, getters, rootState, rootGetters) => state.user.uid ? rootGetters['dataset/getUser'](state.user.uid) : null,
  userIsLogin: (state, getters) =>{
    if(getters.logged) return getters.localUser.role === Rol.User
    return false
  },
  adminIsLogin: (state, getters) =>{
    if(getters.logged) return getters.localUser.role === Rol.Admin
    return false
  },
  superadminIsLogin: (state, getters) =>{
    if(getters.logged) return getters.localUser.role === Rol.Superadmin
    return false
  }
}

export const mutations = {
  setUser(state, user) {
    if (user) {
      state.user.displayName = user.displayName
      state.user.uid = user.uid
      state.user.email = user.email
      state.user.phoneNumber = user.phone
    } else {
      // clearUserState
      state.user.displayName = ''
      state.user.uid = null
      state.user.email = null
      state.user.phoneNumber = null
    }
  },
  setListeningAuth(state, listening) {
    state.listeningAuth = listening
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
    console.log(user)
    if(user === null && state.user.uid !== null){
      await commit('setUser', null)
    } else if (user !== null) {
      await commit('setUser', user)   // cuidado con ese user, debe tener la estructura que tenemos si no, mal vamos
    }
  },
  async logout({ commit }) {
    const auth = await getAuth()
    await auth.signOut()
    await commit('setUser', null)
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
  async registerUser({ commit, dispatch, getters }, user, isSuperadmin) {
    let userAuth
    if(isSuperadmin) userAuth = await registerUserByBackend(user.email, user.password)
    else userAuth = await registerUser(user.email, user.password)
    await addDocumentById(Collection.User, userAuth.user.uid, user)
    if(!isSuperadmin) {
      await dispatch('logout')
      await dispatch('login',{ email: user.email, password: user.password })
    }
  },
  async disableUser({state}, user, isRemoved){
    try {
      await disableUser(user.id)
    } catch (e) {
      return false
    }
    await updateDocument(Collection.User,  user.id, {isBlocked: !isRemoved, isRemoved})
  }
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


