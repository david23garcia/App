<template>
  <v-card
    class="mx-auto"
    tile
  >
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
      <v-btn :id="localUser.id" text @click="isUpdateUser=true">Modificar Perfil</v-btn>
      <v-btn text @click="remove()">Eliminar</v-btn>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../../services/api'

export default {
  data () {
    return {
      isUpdateUser: false
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
    items () {
      return this.getListCol(Collection.Article).filter((item) => {
        return !item.isRemoved && this.$route.params.id === item.shopId
      })
    },
    shop () {
      return this.getShop(this.$route.params.id)
    },
    photo() {
      return [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ]
    },
    remove(){
      this.logout()
      // inhabilitar cuenta del usuario para que no pueda volver a hacer login
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
