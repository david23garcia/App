<template>
  <v-card
    class="mx-auto"
    max-width="1000"
    tile
  >
    <v-card-title>PERFIL DEL PROPIETARIO</v-card-title>
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
              <v-list-item-title class="title">{{ localUser.name+''+localUser.surname1+' '+localUser.surname2}}</v-list-item-title>
              <v-list-item-subtitle>Contacto: {{ localUser.email+' / '+localUser.phone }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-img>
    <v-row>
      <v-btn :id="this.id" text @click="this.$parent.isUpdateUser">Modificar</v-btn>
      <v-btn text @click="remove()">Eliminar</v-btn>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../services/api'

export default {
  name: 'UserProfile',
  data () {
    return {
      isUpdate: false
    }
  },
  props: ['id'],
  computed: {
    ...mapGetters('dataset', ['getListCol', 'getShop']),
    ...mapGetters('session', ['localUser', 'logged', 'adminIsLogin', 'uid'])
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
    ...mapActions('session', ['initAuth', 'logout', 'disableUser']),
    remove(){
      // this.disableUser()
      this.logout()
      this.updateModel({ collection: Collection.User, data:  {
          isRemoved: true
        }, id: this.localUser.id })
      if(this.adminIsLogin){
        this.updateModel({ collection: Collection.Shop, data:  {
            isRemoved: true
          }, id: this.$route.params.id })
      }
      window.location.href='/'
    }
  }
}
</script>

<style scoped>

</style>
