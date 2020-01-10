<template>
  <v-row v-if="adminIsLogin && !isUpdateShop && !isUpdateUser">
    <shop-profile :id="this.$route.params.id"></shop-profile>
    <user-profile :id="uid"></user-profile>
  </v-row>
  <v-col v-else-if="!isUpdateUser && !isUpdateShop">
    <br/>
    <h1>{{ shop().name }}</h1>
    <br/>
    <v-carousel>
      <v-carousel-item
        v-for="(item,i) in photo()"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
    <br/>
    {{ contactInfo() }}
    <br>
    Direccion: {{ address() }}
    <br/>
    <articles-view :id="this.$route.params.id"></articles-view>
  </v-col>
  <user-update-form v-else-if="isUpdateUser"></user-update-form>
  <shop-update-form v-else-if="isUpdateShop"></shop-update-form>
  <v-col v-else></v-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../../services/api'
import UserUpdateForm from '../../components/userUpdateForm'
import ShopUpdateForm from '../../components/shopUpdateForm'
import ArticlesView from '../../components/articlesView'
import ShopProfile from '../../components/shopProfile'
import UserProfile from '../../components/userProfile'

export default {
  components: {
    UserProfile,
    ShopProfile,
    ArticlesView,
    ShopUpdateForm,
    UserUpdateForm
  },
  data () {
    return {
      isUpdateShop: false,
      isUpdateUser: false
    }
  },
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
    ...mapActions('session', ['initAuth', 'logout']),
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
    shop () {
      return this.getShop(this.$route.params.id)
    },
  }
}
</script>

<style scoped>

</style>
