<template>
  <v-row v-if="adminIsLogin() && !isUpdateShop && !isUpdateUser">
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
        <v-btn text :id="$route.params.id" @click="isUpdateShop=true">Modificar</v-btn>
        <v-btn text @click="remove()">Eliminar</v-btn>
      </v-row>
    </v-card>
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
        <v-btn text :id="localUser.id" @click="isUpdateUser=true">Modificar</v-btn>
        <v-btn text @click="remove()">Eliminar</v-btn>
      </v-row>
    </v-card>
  </v-row>
  <v-col v-else-if="!isUpdateUser && !isUpdateShop">
    <v-row>
      <h1>{{ shop().name }}</h1>
        <v-carousel>
          <v-carousel-item
            v-for="(item,i) in photo()"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      <v-spacer></v-spacer>
      <v-row>{{ contactInfo() }}</v-row>
      <v-row>Direccion: {{ address() }}</v-row>
    </v-row>
    <v-spacer></v-spacer>
    <!--    <v-row justify="center" align="center">-->
    <!--      <search />-->
    <!--      <filters />-->
    <!--    </v-row>-->
    <v-row>
      <article-card v-for="(item, i) in items()" :id="item.id" :key="i"></article-card>
    </v-row>
  </v-col>
  <user-update-form v-else-if="isUpdateUser"></user-update-form>
  <shop-update-form v-else-if="isUpdateShop"></shop-update-form>
  <v-col v-else></v-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Collection, Rol } from '../../services/api'
import ArticleCard from '../../components/articleCard'
import UserUpdateForm from '../../components/userUpdateForm'
import ShopUpdateForm from '../../components/shopUpdateForm'

export default {
  components: {
    ShopUpdateForm,
    UserUpdateForm,
    ArticleCard,
    // search,
    // filters
  },
  data () {
    return {
      headersUser: [
        { text: 'Nombre', value: 'name' },
        { text: 'Apellidos', value: 'surnames' },
        { text: 'Email', value: 'email' },
        { text: 'Telefono', value: 'phone' }
      ],
      headersArticle: [
        { text: 'Codigo de Barras', value: 'barcode' },
        { text: 'Nombre', value: 'title' },
        { text: 'Cantidad', value: 'quantity' },
        { text: 'Precio', value: 'price' }
      ],
      headersOrder: [
        { text: 'Id', value: 'id' },
        { text: 'Usuario', value: 'userId' },
        { text: 'Precio', value: 'price' },
        { number: 'Numero Articulos', value: 'articles' },
        { number: 'Direccion', value: 'address' },
        { text: 'Estado', value: 'state' }
      ],
      isUpdateShop: false,
      isUpdateUser: false
    }
  },
  computed: {
    ...mapGetters('dataset', ['getListCol', 'getShop']),
    ...mapGetters('session', ['localUser', 'logged'])
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
    adminIsLogin () {
      return this.logged ? this.localUser.role === Rol.Admin : false
    },
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
    address(){
      const address = this.shop().address
      return address.type+' '+address.street+' '+address.number+ ' '+address.floor+address.letter+'. '+address.city+
        +', '+address.province+'. '+address.state+' ('+address.cv+')'
    },
    contactInfo(){
      const shop = this.shop()
      return 'Telefono: '+shop.phone+' Email: '+shop.email
    },
    remove(){
      this.logout()
      // inhabilitar cuenta del usuario para que no pueda volver a hacer login
      this.updateModel({ collection: Collection.User, data:  {
          isRemoved: true
        }, id: this.localUser.id })
      this.updateModel({ collection: Collection.Shop, data:  {
          isRemoved: true
        }, id: this.$route.params.id })
      window.location.href='/'
    }
  }
}
</script>

<style scoped>

</style>
