<template>
  <v-card
    class="mx-auto"
    max-width="1000"
    tile
  >
    <v-card-title>PERFIL DEL COMERCIO</v-card-title>
    <v-img
      height="100%"
      src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
    >
      <v-row
        align="end"
        class="fill-height"
      >
        <v-col
          align-self="start"
          class="pa-0"
          cols="12"
        >
          <v-avatar
            class="profile"
            color="grey"
            size="164"
            tile
          >
            <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
          </v-avatar>
        </v-col>
        <v-col class="py-0">
          <v-list-item
            color="rgba(0, 0, 0, .4)"
            dark
          >
            <v-list-item-content>
              <v-list-item-title class="title">{{ shop().name }}</v-list-item-title>
              <v-list-item-subtitle>Contacto: {{ contactInfo() }}</v-list-item-subtitle>
              <v-list-item-subtitle>Dirección: {{ address() }}</v-list-item-subtitle>
              <!--                <v-list-item-subtitle>{{ shop().description }}</v-list-item-subtitle>-->
            </v-list-item-content>
          </v-list-item>
          <p class="py-0" color="rgba(0, 0, 0, .4)"> {{ shop().description}}</p>
        </v-col>
      </v-row>
    </v-img>
    <v-row>
      <v-btn :id="this.id" text @click=" this.$parent.isUpdateUser">Modificar</v-btn>
      <v-btn text @click="remove()">Eliminar</v-btn>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../services/api'

export default {
  name: 'ShopProfile',
  props: ['id'],
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('dataset', ['getListCol', 'getShop']),
    ...mapGetters('session', ['localUser', 'logged', 'adminIsLogin'])
  },
  mounted() {
    this.listenCol(Collection.Shop)
    this.listenCol(Collection.User)
    this.listenCol(Collection.Article)
    this.initAuth()
  },
  destroyed() {
    this.unlistenCol(Collection.Shop)
    this.unlistenCol(Collection.User)
    this.unlistenCol(Collection.Article)
  },
  methods: {
    ...mapActions('dataset', ['listenCol', 'unlistenCol', 'updateModel']),
    ...mapActions('session', ['initAuth', 'logout']),
    shop () {
      return this.getShop(this.id)
    },
    address () {
      const address = this.shop().address
      return address.type + ' ' + address.street + ' ' + address.number + ' ' + address.floor + address.letter + '. ' + address.city +
        +', ' + address.province + '. ' + address.state + ' (' + address.cv + ')'
    },
    contactInfo () {
      const shop = this.shop()
      return 'Telefono: ' + shop.phone + ' Email: ' + shop.email
    },
    remove () {
      this.logout()
      // inhabilitar cuenta del usuario para que no pueda volver a hacer login
      this.updateModel({
        collection: Collection.User, data: {
          isRemoved: true
        }, id: this.localUser.id
      })
      this.updateModel({
        collection: Collection.Shop, data: {
          isRemoved: true
        }, id: this.$route.params.id
      })
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped>

</style>
