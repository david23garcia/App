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
        :headers="headers"
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
import { Collection, Rol } from '../../services/api'

export default {
  data() {
    return {
      title: 'Articulos',
      headers: [
        { text: 'Nº Pedido', value: 'id' },
        { text: 'Estado', value: 'status' },
        { text: 'Precio', value: 'price' },
        { text: 'Acciones', value: 'action', sortable: false }
      ],
      isRegister: false
    }
  },
  computed: {
    ...mapGetters('dataset', ['getListCol', 'getUser']),
    ...mapGetters('session', ['localUser', 'uid']),
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
    // updateStatus(item){
    //   console.log(item)
    // },
    items(){
      return this.getListCol(Collection.Order).filter((item) => {
        if(this.userIsLogin()){
          return item.userId === this.uid
        } else if(this.adminIsLogin()){
          return item.shopId === this.localUser.shopId
        } else {
          return true
        }
      })
    },
    adminIsLogin(){
      return this.logged ? this.localUser.role === Rol.Admin : false

    },
    userIsLogin(){
      return this.logged ? this.localUser.role === Rol.User : false
    },
  }
}
</script>

<style scoped>

</style>
