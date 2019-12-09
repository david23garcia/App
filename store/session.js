import { getCurrentUser, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '../services/fireinit'

export const state = () => ({
  user: {
    uid: null, // no null si está logueado
    role : null
  },
  afterLogin: '/users', // donde dirigirse una vez complete el login (si accedió y no tenía permiso)
  listeningAuth: false
})

export const getters = {
  logged: (state) => state.user.uid !== null,
  role: (state) => state.user.role,
  uid: (state) => state.user.uid
}

export const mutations = {
  setUser(state, user) {
    if (user) {
      state.user.uid = user.uid
      state.user.role = user.role
    } else {
      // clearUserState
      state.user.uid = null
      state.user.role = null
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
  async initAuth({ state, commit }) {
    if (!state.listeningAuth) {
      commit('setListeningAuth', true)
      const user = onAuthStateChanged()
      // const localUser = getters.getUser(user.uid)
      commit('setUser', { uid: user.uid, role: null })
      const currentUser = await getCurrentUser()  // Obtiene el usuario si no se cerrá sesión
      const prevUid = state.user.uid
      const newUid = currentUser ? currentUser.uid : null
      if (prevUid !== newUid){
        // const localUser = getters.getUser(currentUser.uid)
        commit('setUser', { uid: currentUser.uid, role: null })
      }
    }
  },
  async logout({ commit, dispatch }) {
    commit('setUser', null)
    await signOut()
  },

  async login( { commit, dispath, getters }, credentials){
    const user = await signInWithEmailAndPassword(credentials.email, credentials.password)
    commit('setUser', { uid: user.uid, role: null })
  }
}
