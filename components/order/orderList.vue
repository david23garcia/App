<template>
  <v-card>
    <v-row>
      <v-col>
        <v-card-title>PEDIDOS</v-card-title>
      </v-col>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-col align-self="right">
      </v-col>
    </v-row>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers()"
        :items="items()"
      >
        <!--        <template v-if="adminIsLogin" v-slot:item.action="{ item }">-->
        <!--          <v-icon-->
        <!--            class="mr-2"-->
        <!--            @click="updateStatus(item)"-->
        <!--          >-->
        <!--            mdi-account-edit-->
        <!--          </v-icon>-->
        <!--        </template>-->
      </v-data-table>
    </v-card>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../../services/api'

export default {
  name: "orderList",
  data() {
    return {
      title: 'Articulos'
    }
  },
  computed: {
    ...mapGetters('dataset', ['getListCol', 'getUser', 'getShop']),
    ...mapGetters('session', ['localUser', 'uid', 'adminIsLogin', 'userIsLogin', 'superadminIsLogin']),
  },
  mounted() {
    this.listenCol(Collection.Shop)
    this.listenCol(Collection.User)
    this.listenCol(Collection.Order)
  },
  destroyed() {
    this.unlistenCol(Collection.Shop)
    this.unlistenCol(Collection.User)
    this.unlistenCol(Collection.Order)
  },
  methods: {
    ...mapActions('dataset', ['listenCol', 'unlistenCol', 'updateModel']),
    items(){
      return this.getListCol(Collection.Order).filter((order) => {
        if(this.userIsLogin){
          return order.userId === this.uid
        } else if(this.adminIsLogin){
          return order.shopId === this.localUser.shopId
        } else {
          return true
        }
      }).map((order) => ({shop: this.getShop(order.shopId).name, user: this.getUser(order.userId), products: order.items.length, ...order}))
    },
    headers(){
      if(this.superadminIsLogin){
        return [
          { text: 'Nº Pedido', value: 'id' },
          { text: 'Usuario', value: 'user' },
          { text: 'Comercio', value: 'shop' },
          { text: 'Estado', value: 'status' },
          { text: 'Id Pago', value: 'payId' },
          { text: 'Nº Productos', value: 'products' },
          { text: 'Precio', value: 'totalPrice' }
        ]
      }  else if(this.adminIsLogin) {
        return  [
          { text: 'Nº Pedido', value: 'id' },
          { text: 'Usuario', value: 'user' },
          { text: 'Estado', value: 'status' },
          { text: 'Id Pago', value: 'payId' },
          { text: 'Nº Productos', value: 'products' },
          { text: 'Precio', value: 'totalPrice' },
        ]
      } else {
        return  [
          { text: 'Nº Pedido', value: 'id' },
          { text: 'Comercio', value: 'shop' },
          { text: 'Estado', value: 'status' },
          { text: 'Id Pago', value: 'payId' },
          { text: 'Nº Productos', value: 'products' },
          { text: 'Precio', value: 'totalPrice' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
