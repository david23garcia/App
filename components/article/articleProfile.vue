<template>
  <v-card>
    <v-card-title>{{this.getArticle(this.$route.params.id).name}}</v-card-title>
    <v-container>
      <v-col>
        <v-row>
          <v-col cols="5"><v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"></v-img></v-col>
          <v-col>
            <v-card-subtitle>Descripción</v-card-subtitle>
            <v-card-text>{{this.getArticle(this.$route.params.id).description}}</v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-card-title>
            <v-col>{{'Precio: ' + this.getArticle(this.$route.params.id).price + ' €'}}</v-col>
            <v-col>Cantidad:</v-col>
            <v-col><v-select
              v-model="quantity"
              :items="items"
              readonly
            ></v-select></v-col>
            <v-col><v-btn :disabled="quantity<1 || !logged" @click="submit()">Comprar</v-btn></v-col>
          </v-card-title>
        </v-row>
      </v-col>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../../services/api'

export default {
  name: "articleView",
  data () {
    return {
      quantity: 0,
      items: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    }
  },
  computed: {
    ...mapGetters('dataset', ['getArticle']),
    ...mapGetters('session', ['localUser', 'logged']),
  },
  mounted() {
    this.listenCol(Collection.Article)
  },
  destroyed() {
    this.unlistenCol(Collection.Article)
  },
  methods: {
    ...mapActions('dataset', ['listenCol', 'unlistenCol', 'updateModel']),
    submit(){
      const user = this.localUser()
      if (!this.isRepeat(user.basket)) {
        this.updateModel({
          collection: Collection.User, data: {
            basket: [{
              quantity: this.quantity,
              articleId: this.id,
            }, ...user.basket]
          }, id: this.uid
        })
      }
    },
    isRepeat(basket){
      for (const item of basket) {
        if (item.articleId === this.id) {
          return true
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
