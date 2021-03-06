import Vue from 'vue'
import { addDocument, addDocumentById, Collection, pay, updateDocument } from '../services/api'
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
  countries : [
    'Alemania',
    'Andorra',
    'Argentina',
    'Austria',
    'Azerbaiyán',
    'Bélgica',
    'Bosnia y Herzegovina',
    'Brasil',
    'Bulgaria',
    'Canadá',
    'Chile',
    'China',
    'Chipre',
    'Colombia',
    'Croacia',
    'Dinamarca',
    'Ecuador',
    'Eslovaquia',
    'Eslovenia',
    'España',
    'Estados Unidos',
    'Estonia',
    'Etiopía',
    'Finlandia',
    'Francia',
    'Grecia',
    'Hungría',
    'Irlanda',
    'Islandia',
    'Israel',
    'Italia',
    'Jamaica',
    'Japón',
    'Letonia',
    'Lituania',
    'Marruecos',
    'México',
    'Noruega',
    'Países Bajos',
    'Polonia',
    'Portugal',
    'Gran Bretaña',
    'República Checa',
    'Rumanía',
    'Rusia',
    'Serbia',
    'Suecia',
    'Suiza',
    'Túnez',
    'Turquía',
    'Ucrania'
  ],
  provinces: [
    'A Coruña',
    'Álava',
    'Albacete',
    'Alicante',
    'Almería',
    'Asturias',
    'Ávila',
    'Badajoz',
    'Baleares',
    'Barcelona',
    'Burgos',
    'Cáceres',
    'Cádiz',
    'Cantabria',
    'Castellón',
    'Ciudad Real',
    'Córdoba',
    'Cuenca',
    'Girona',
    'Granada',
    'Guadalajara',
    'Gipuzkoa',
    'Huelva',
    'Huesca',
    'Jaén',
    'La Rioja',
    'Las Palmas',
    'León',
    'Lérida',
    'Lugo',
    'Madrid',
    'Málaga',
    'Murcia',
    'Navarra',
    'Ourense',
    'Palencia',
    'Pontevedra',
    'Salamanca',
    'Segovia',
    'Sevilla',
    'Soria',
    'Tarragona',
    'Santa Cruz de Tenerife',
    'Teruel',
    'Toledo',
    'Valencia',
    'Valladolid',
    'Vizcaya',
    'Zamora',
    'Zaragoza',
    'Ceuta',
    'Melilla'
  ]
})

export const getters = {
  // getCol: (state, getters) => kind => state.data.col[kind],
  getCol: state => (kind) => {
    return state.data.col[kind]
  },
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
  getUser : (state, getters) => (id) => {
    return  getters.getDoc({ kind: Collection.User, id })
  },
  getShop : (state, getters) => (id) => {
    return getters.getDoc( {kind: Collection.Shop, id})
  },
  getArticle : (state, getters) => (id) => {
    return getters.getDoc({kind: Collection.Article, id})
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
  getTitle: state => () => {
    return state.title
  },
  getListLogged: state => () => {
    return state.listUserLogin
  },
  getListDefault: state => () => {
    return state.listUserLogout
  },
  getRootGetter: (state, getters, rootState, rootGetters) => {
    return state.getters ? rootGetters['dataset/getters'](this.getters): null
  },
  getCountries: state => () => {
    return state.countries
  },
  getProvinces: state => () => {
    return state.provinces
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

  createModel ({ state, dispatch, commit }, { collection, data, id }) {
    id !== null ? addDocumentById(collection, id, data) : addDocument(collection, data)
  },
  updateModel ({ state, dispatch, commit }, { collection, data, id }) {
    return updateDocument(collection, id, data)
  },

  async buy({ dispatch, rootGetters, getters }){
    const uid = rootGetters['session/uid']
    const user = getters.getUser(uid)
    const basket = user.basket
    const date = new Date().getTime()

    await dispatch('updateModel', { collection: Collection.User, data: { basket: [] }, id: uid })

    await Promise.all(createOrders(getters, uid, basket, date).map(async (order) => {
      const orderId = btoa(date.toString().concat(order.totalPrice.toString()))
      await dispatch('createModel', { collection: Collection.Order, data: order, id: orderId })
      const data = await pay(orderId, order.totalPrice)
      await dispatch('updateModel', {
        collection: Collection.Order,
        data: { status: data.status ? "PAY" : "ERROR", payId: data.id },
        id: orderId
      })
      console.log(data)
      if (data.status) {
        await Promise.all(order.items.map(async (item) => {
          const article = getters.getArticle(item.articleId)
          console.log(article)
          console.log(item)
          await dispatch('updateModel', {
            collection: Collection.Article,
            data: { quantity:  article.quantity - item.quantity },
            id: item.articleId
          })
        }))
      }
    }))
  },
}

function createOrders (getters, uid, basket, date) {
  const orders = []
  basket.map((item)=> {
    let isItemInOrder = false
    const article = getters.getArticle(item.articleId)
    const shopId = article.shopId
    if(orders.length === 0) initOrder(item, uid, shopId, article.price, orders, date)
    else {
      orders.map((order)=>{
        if(order.shopId === shopId){
          addItemToOrder(item, order, article.price)
          isItemInOrder = true
        }
      })
      if(!isItemInOrder) initOrder(item, uid, shopId, article.price, orders, date)
    }
  })
  return orders
}

function initOrder (item, uid, shop, price, orders, dateCreation) {
  const priceOrder = item.quantity*price
  orders.push({
      userId: uid,
      shopId: shop,
      items: [item],
      status: "PENDING",
      shippingMethod: null,
      totalPrice: priceOrder,
      address: null,
      payId: "",
      date: dateCreation
    }
  )
}

function addItemToOrder(item, order, price){
  order.items.push(item)
  order.totalPrice = order.totalPrice + item.quantity*price
}





