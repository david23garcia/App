<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      {{ article().title }}
    </v-card-title>

    <v-card-subtitle>
      {{ article().price +' €'}}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn  v-if="logged" icon text @click="addToBasket">
        <v-icon>mdi-cart</v-icon>
        Comprar
      </v-btn>

      <v-btn text @click="moreInfo()">
        Mas Información
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ article().description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../services/api'

export default {
  name: 'ArticleCard',
  props: ['id'],
  data: () => ({
    show: false,
  }),
  computed: {
    ...mapGetters('dataset', ['getArticle', 'getUser']),
    ...mapGetters('session', ['localUser', 'logged', 'uid'])
  },
  mounted() {
    this.listenCol(Collection.User)
    this.listenCol(Collection.Shop)
    this.listenCol(Collection.Article)
    this.initAuth()
  },
  destroyed() {
    this.unlistenCol(Collection.User)
    this.unlistenCol(Collection.Shop)
    this.unlistenCol(Collection.Article)
  },
  methods: {
    ...mapActions('dataset', ['listenCol', 'unlistenCol', 'updateModel']),
    ...mapActions('session', ['initAuth']),
    article() {
      return this.getArticle(this.id)
    },
    addToBasket(){
      const user = this.getUser(this.uid)
      let isRepeat = false
      for (const item of user.basket) {
        if (item.articleId === this.id) {
          isRepeat = true
          break
        }
      }
      if (!isRepeat) {
        this.updateModel({
          collection: Collection.User, data: {
            basket: [{
              quantity: 1,
              articleId: this.id,
            }, ...user.basket]
          }, id: this.uid
        })
      }
    },
    moreInfo(){
      window.location.href='articles/'+this.id
    }
  }
}
</script>

<style scoped>

</style>
