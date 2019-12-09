import { getCurrentUser, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '../services/fireinit'

export const state = () => ({
  user: {
    uid: null, // no null si está logueado
    role : null
  },
  afterLogin: '/', // donde dirigirse una vez complete el login (si accedió y no tenía permiso)
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
      console.log("ESTOY DENTRO DEL SET CON VALORES: ")
      console.log(user)
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
    console.log("ESTOY DENTRO DE LA FUNCION initAuth")
    if (!state.listeningAuth) {
      commit('setListeningAuth', true)
      console.log("VOY A LLAMAR A onAuthStateChanged")
      onAuthStateChanged().then(user => {
        console.log("estoy dentro del then y voy a llamar a set con ")
        console.log(user)
        commit('setUser', { uid: user.uid, role: null })
      })
      const user = await getCurrentUser()  // Obtiene el usuario si no se cerrá sesión
      console.log("ACABO DE LLAMAR A getCurrentUser y su resultado es ")
      console.log(user)
      const prevUid = state.user.uid
      const newUid = user ? user.uid : null
      if (prevUid !== newUid){
        commit('setUser', { uid: user.uid, role: null })
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
