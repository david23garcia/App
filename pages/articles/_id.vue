<template>
  <v-col>
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="4">
        <v-img
          class="white--text align-end"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title>{{ article() ? article().title : 'Undefined' }}</v-card-title>
        </v-img>
      </v-col>
      <v-col cols="4">
        <v-row>
          <v-card-text>
            {{ article() ? article().description : 'undefined'}}
          </v-card-text>
        </v-row>
        <v-row>
          <v-col><v-card-subtitle class="pb-0"> PRECIO: {{ article() ? article().price+' €' : 'undefined' }}</v-card-subtitle></v-col>
          <v-col  v-if="logged">
            <v-card-actions>
              Cantidad
              <v-select
                v-model="quantity"
                :items="items"
                readonly
              ></v-select>
              <v-btn
                text
                icon
                @click="addToBasket()"
              >
                <v-icon>mdi-cart</v-icon>
                Añadir a la Cesta
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../../services/api'

export default {
  data () {
    return {
      quantity: 0,
      items: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    }
  },
  computed: {
    ...mapGetters('dataset', ['getArticle', 'getUser']),
    ...mapGetters('session', ['localUser', 'uid', 'logged'])
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
    article () {
      return this.getArticle(this.$route.params.id)
    },
    addToBasket () {
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
              quantity: this.quantity,
              articleId: this.id
            }, ...user.basket]
          }, id: this.uid
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
