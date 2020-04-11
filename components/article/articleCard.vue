<template>
  <v-card class="mx-auto" max-width="344">
    <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"></v-img>
    <v-card-title>{{ this.getArticle(this.id).name }}</v-card-title>
    <v-card-subtitle>{{ this.getArticle(this.id).price +' €'}}</v-card-subtitle>
    <v-card-actions>
      <v-btn  v-if="logged" icon text @click="addToBasket">
        <v-icon>mdi-cart</v-icon>Comprar
      </v-btn>
      <v-btn text @click="moreInfo()">Mas Información</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <v-container v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          {{ this.getArticle(this.id).description }}
        </v-card-text>
      </v-container>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../../services/api'

export default {
  name: 'ArticleCard',
  props: ['id'],
  data: () => ({
    show: false,
  }),
  computed: {
    ...mapGetters('dataset', ['getArticle']),
    ...mapGetters('session', ['localUser', 'logged', 'uid'])
  },
  mounted() {
    this.listenCol(Collection.Article)
  },
  destroyed() {
    this.unlistenCol(Collection.Article)
  },
  methods: {
    ...mapActions('dataset', ['listenCol', 'unlistenCol', 'updateModel']),
    addToBasket(){
      const user = this.localUser
      console.log(user)
      if (!this.isRepeat()) {
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
    isRepeat(basket){
      if(typeof basket === 'undefined') return false
      for (const item of basket) {
        if (item.articleId === this.id) {
          return true
        }
      }
    },
    moreInfo(){
      this.$router.replace("/articles/"+this.id)
    }
  }
}
</script>

<style scoped>

</style>
