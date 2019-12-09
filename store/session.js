import { getCurrentUser, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '../services/fireinit'

export const state = () => ({
  user: {
    displayName: '',
    uid: null, // no null si está logueado
    email: null,
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
      state.user.displayName = user.displayName
      state.user.uid = user.uid
      state.user.email = user.email
      state.user.role = user.role
    } else {
      // clearUserState
      state.user.displayName = ''
      state.user.uid = null
      state.user.email = null
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
  async initAuth({ state, commit, dispatch, getters }) {
    if (!state.listeningAuth) {
      commit('setListeningAuth', true)
      const user = await onAuthStateChanged()
      const uid = user.user.uid
      const localUser = getters.getUser(uid)
      const sessionUser = {
        displayName: user.displayName,
        uid: user.uid,
        email: user.email,
        role : localUser.role
      }
      commit('setUser', sessionUser)
      const currentUser = await getCurrentUser() // Obtiene el usuario si no se cerrá sesión
      const prevUid = state.currentUser.uid
      const newUid = currentUser ? currentUser.uid : null
      if (prevUid !== newUid){
        const uid = currentUser.uid
        const localUser = getters.getUser(uid)
        const sessionUser = {
          displayName: currentUser.displayName,
          uid: currentUser.uid,
          email: currentUser.email,
          role : localUser.role
        }
        commit('setUser', sessionUser)
      }
    }
  },
  async logout({ commit, dispatch }) {
    commit('setUser', null)
    await signOut()
  },

  async loginSession( { commit, dispath, getters }, credentials){
    const user = await signInWithEmailAndPassword(credentials.email, credentials.password)
      if(user) {
        const uid = user.user.uid
        const localUser = getters.getUser(uid)
        const sessionUser = {
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          role : localUser.role
        }
        commit('setUser', sessionUser)
      } else {
        commit('setUser', null)
      }
    }
}
