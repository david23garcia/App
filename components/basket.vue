<template>
  <v-card v-if="items().length !== 0">
    <v-container>
      <v-data-table v-if="items().length !== 0"
                    :headers="headers"
                    :items="items()"
                    hide-default-footer
                    class="elevation-1"
      >
        <template v-slot:item.action="{ item }">
          <v-icon
            class="mr-2"
            @click="plusQuantity(item.articleId)"
          >
            mdi-plus
          </v-icon>
          <v-icon
            @click="minusQuantity(item.articleId)"
          >
            mdi-minus
          </v-icon>
          <v-icon
            @click="deleteArticle(item.articleId)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-container>
    <v-container >
      <v-card-text>
        Precio Total: {{ totalPrice }}
        <v-btn text icon @click="this.buy"><v-icon>mdi-credit-card</v-icon>Pagar</v-btn>
      </v-card-text>
    </v-container>
  </v-card>
  <v-card v-else>
    <v-card-title>No Existen Productos en el Carrito</v-card-title>
  </v-card>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../services/api'

export default {
  name: 'Basket',
  data: () => ({
    headers: [
      { text: 'Cantidad', value: 'quantity' },
      { text: 'Nombre Artículo', value: 'name' },
      { text: 'Precio', value: 'price' },
      { text: 'Acciones', value: 'action', sortable: false },
    ],
    totalPrice: 0
  }),
  computed: {
    ...mapGetters('dataset', ['getArticle', 'getUser', 'getArticle']),
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
    ...mapActions('dataset', ['listenCol', 'unlistenCol', 'updateModel', 'createModel', 'buy']),
    ...mapActions('session', ['initAuth']),
    items () {
      let totalPrice = 0
      const items =  this.getUser(this.uid).basket.map((item) => {
        const article = this.getArticle(item.articleId)
        totalPrice = totalPrice + item.quantity*article.price
        return  {quantity: item.quantity, name: article.name, price: (item.quantity*article.price).toFixed(2) +' €', articleId: item.articleId}
      })
      this.totalPrice = totalPrice.toFixed(2)
      return items
    },
    plusQuantity (id) {
      const basket = this.getUser(this.uid).basket
      this.updateModel({
        collection: Collection.User, data: {
          basket: basket.map((item) => {
            if(id === item.articleId) return { quantity: item.quantity+1, articleId: item.articleId }
            else return item
          })
        }, id: this.uid
      })
    },
    minusQuantity (id) {
      const basket = this.getUser(this.uid).basket
      this.updateModel({
        collection: Collection.User, data: {
          basket: basket.map((item) => {
            if(id === item.articleId && item.quantity > 1) return { quantity: item.quantity-1, articleId: item.articleId }
            else return item
          })
        }, id: this.uid
      })
    },
    deleteArticle (id) {
      const basket = this.getUser(this.uid).basket
      this.updateModel({
        collection: Collection.User, data: {
          basket: basket.filter((item) => {
            return item.articleId !== id
          })
        }, id: this.uid
      })
    },
  }
}
</script>

<style scoped>

</style>
