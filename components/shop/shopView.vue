<template>
  <v-card>
    <v-card-title>{{this.getShop(this.$route.params.id).name }}</v-card-title>
    <v-card-subtitle>{{this.getShop(this.$route.params.id).address }} </v-card-subtitle>
    <v-container>
      <v-carousel>
        <v-carousel-item
          v-for="(item,i) in photo()"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
    </v-container>
    <v-card-text>{{this.getShop(this.$route.params.id).description }}</v-card-text>
    <v-container>
      <articles-view :id="this.$route.params.id"></articles-view>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../../services/api'
import ArticlesView from '../article/articlesView'

export default {
  name: "shopView",
  components: { ArticlesView },
  computed: {
    ...mapGetters('dataset', ['getListCol', 'getShop']),
    ...mapGetters('session', ['localUser', 'logged', 'adminIsLogin', 'uid'])
  },
  mounted() {
    this.listenCol(Collection.Shop)
    this.listenCol(Collection.Article)
  },
  destroyed() {
    this.unlistenCol(Collection.Shop)
    this.unlistenCol(Collection.Article)
  },
  methods: {
    ...mapActions('dataset', ['listenCol', 'unlistenCol']),
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
  }

}
</script>

<style scoped>

</style>
