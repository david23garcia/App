import Vue from 'vue'
import { addDocument, Collection } from '../services/api'
import {
  syncJsonCol,
  listenCollection,
  listenDocument,
  SnapshotOptions
} from '~/services/api'

export const state = () => ({
  listening: {
    col: {
      user: 0,
      shop: 0,
      article: 0,
      commentary: 0,
      assessment: 0,
      order: 0
    },
    doc: {
      // collection: { id: counter }
      user: {},
      shop: {},
      article: {},
      commentary: {},
      assessment: {},
      order: {},
      basket: {},
      articleBasket: {},
      address: {},
      card: {},
      shippingMethod: {},
      articleOrder: {}

    }
  },
  listener: {
    col: {
      user: null,
      shop: null,
      article: null,
      commentary: null,
      assessment: null,
      order: null
    },
    doc: {
      // collection: { id: listener }
      user: {},
      shop: {},
      article: {},
      commentary: {},
      assessment: {},
      order: {},
      basket: {},
      articleBasket: {},
      address: {},
      card: {},
      shippingMethod: {},
      articleOrder: {}
    }
  },
  data: {
    col: {
      user: {},
      shop: {},
      article: {},
      commentary: {},
      assessment: {},
      order: {}
    },
    doc: {
      // collection: { id: data }
      user: {},
      shop: {},
      article: {},
      commentary: {},
      assessment: {},
      order: {},
      basket: {},
      articleBasket: {},
      address: {},
      card: {},
      shippingMethod: {},
      articleOrder: {}
    }
  },
  title: 'Comercio Local',
  listUserLogin: [
    {
      title: 'Pedidos',
      to: '/admin'
    },
    {
      title: 'Perfil',
      to: '/admin'
    }
  ],
  listUserLogout: [
    {
      title: 'Iniciar Sesion',
      to: '/login'
    },
    {
      title: 'Registrarse',
      to: '/register'
    }
  ],
  isLogin: false,
  roleUser: null
})

export const getters = {
  // getCol: (state, getters) => kind => state.data.col[kind],
  getCol: state => (kind) => {
    return state.data.col[kind]
  },
  getLang: state => state.defaultLang,
  getDoc: state => ({ kind, id }) => {
    if (state.listening.col[kind] && state.data.col[kind].hasOwnProperty(id)) {
      // from collection data
      return state.data.col[kind][id]
    } else if (
      state.listening.doc[kind].hasOwnProperty(id) &&
      state.data.doc[kind].hasOwnProperty(id)
    ) {
      // from doc
      return state.data.doc[kind][id]
    } else {
      return null
    }
  },
  getModel: (state, getters) => (id) => {
    return getters.getDoc({ kind: Collection.Model, id })
  },
  getDataset: (state, getters) => (id) => {
    return getters.getDoc({ kind: Collection.Dataset, id })
  },
  getRegion: (state, getters) => (id) => {
    return getters.getDoc({ kind: Collection.Region, id })
  },
  getUser : (state, getters) => (id) => {
    return getters.getDoc( {kind: Collection.User, id})
  },
  getListCol: state => kind => {
    const data = state.data.col[kind]
    const keys = Object.keys(data)
    return keys.map(id => ({ id, ...data[id] }))
  },
  getDataDoc: state => (kind, idDoc) => {
    const data = state.data.col[kind]
    const keys = Object.keys(data)
    const col = keys.map(id => ({ id, ...data[id] }))
    return col.filter(id => id === idDoc)
  },
  getIsLogin: state => () =>{
    return state.isLogin
  },
  getRoleUser: state => () => {
    return state.roleUser
  },
  getListUser: state => () => {
    if(state.isLogin) {
      return state.listUserLogin
    } else {
      return state.listUserLogout
    }
  },
  getTitle: state => () => {
    return state.title
}

}

export const mutations = {
  addColListening (state, key) {
    state.listening.col[key] = state.listening.col[key] + 1
  },
  removeColListening (state, key) {
    state.listening.col[key] = state.listening.col[key] - 1
  },
  syncCol (state, { collection, snapshot }) {
    syncJsonCol(snapshot, state.data.col[collection])
  },
  setColListener (state, { key, listener }) {
    state.listener.col[key] = listener
  },
  clearCol (state, key) {
    state.data.col[key] = {}
  },
  addDocListening (state, { kind, id }) {
    const target = state.listening.doc[kind]
    const current = target.hasOwnProperty(id) ? target[id] : 0
    Vue.set(target, id, current + 1)
  },
  removeDocListening (state, { kind, id }) {
    const target = state.listening.doc[kind]
    const current = target.hasOwnProperty(id) ? target[id] : 0
    if (current === 1) {
      Vue.delete(target, id)
    } else {
      Vue.set(target, id, current - 1)
    }
  },
  syncDoc (state, { kind, id, snapshot }) {
    const doc = snapshot.exists ? snapshot.data(SnapshotOptions) : null
    const target = state.data.doc[kind]
    Vue.set(target, id, doc)
  },
  setDocListener (state, { kind, id, listener }) {
    const target = state.listener.doc[kind]
    if (listener) {
      Vue.set(target, id, listener)
    } else {
      Vue.delete(target, id)
    }
  },
  clearDoc (state, { kind, id }) {
    const target = state.data.doc[kind]
    Vue.delete(target, id)
  },
}

export const actions = {
  async listenCol ({ state, dispatch, commit }, collection) {
    if (state.listening.col[collection] === 0) {
      const listener = await listenCollection(collection, snapshot =>
        commit('syncCol', { collection, snapshot })
      )
      commit('setColListener', { key: collection, listener })
    }
    commit('addColListening', collection)
  },
  unlistenCol ({ state, dispatch, commit }, collection) {
    if (state.listening.col[collection] === 1) {
      const listener = state.listener.col[collection]
      listener() // unsubscribe
      commit('setColListener', { key: collection, listener: null })
      commit('clearCol', collection)
    }
    commit('removeColListening', collection)
  },
  async listenDoc ({ state, dispatch, commit }, { kind, id }) {
    const target = state.listening.doc[kind]
    const current = target.hasOwnProperty(id) ? target[id] : 0
    if (current === 0) {
      const listener = await listenDocument(kind, id, snapshot =>
        commit('syncDoc', { kind, id, snapshot })
      )
      commit('setDocListener', { kind, id, listener })
    }
    commit('addDocListening', { kind, id })
  },
  unlistenDoc ({ state, dispatch, commit }, { kind, id }) {
    const target = state.listening.doc[kind]
    const current = target.hasOwnProperty(id) ? target[id] : 0
    if (current === 1) {
      const t = state.listener.doc[kind]
      if (t.hasOwnProperty(id)) {
        t[id]() // unsubscribe
      }
      commit('setDocListener', { kind, id, listener: null })
      commit('clearDoc', { kind, id })
    }
    commit('removeDocListening', { kind, id })
  },

  updateModel ({ state, dispatch, commit }, { collection, data }) {
    return addDocument(collection, data)
  },
  setIsLogin({ state, dispatch, commit }, login){
    state.isLogin = login
  }
}
