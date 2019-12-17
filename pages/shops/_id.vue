<template>
  <v-card v-if="!this.isUserShop()" align="center" cols="10">
    <v-toolbar-title>ESTAMOS DENTRO CON EL ID {{ typeof this.id !== 'undefined' ? this.id : 'unidefined' }}</v-toolbar-title>
    <v-card align="center" cols="5">
      <v-radio-group v-model="type" row align="center">
        <v-radio label="Empleados" value="employee"></v-radio>
        <v-radio label="Articulos" value="article"></v-radio>
        <v-radio label="Pedidos" value="order"></v-radio>
      </v-radio-group>
    </v-card>
    <v-card>
      <listdefault
        v-if="type === 'employee'"
        :headers="headersUser"
        :type="user"
        :title="'Empleados'"
      ></listdefault>
      <listdefault
        v-else-if="type === 'article'"
        :headers="headersArticle"
        :type="article"
        :title="'Articulos'"
      ></listdefault>
      <listdefault
        v-else-if="type === 'order'"
        :headers="headersOrder"
        :type="order"
        :title="'Pedidos'"
      ></listdefault>
    </v-card>
  </v-card>
  <v-card v-else>
    <v-card-title>TONTITO QUE NO ES TU COMERCIO</v-card-title>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../../services/api'
import Listdefault from '../../components/listdefault'

export default {
  name: "_id",
  data () {
    return {
      employee: Collection.User,
      article: Collection.Article,
      order: Collection.Order,
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
      ]
    }
  },
  props: ['id'],
  components: { Listdefault },
  mounted() {
    this.listenCol(Collection.Shop)
    this.listenCol(Collection.User)
    this.listenCol(Collection.Order)
    this.listenCol(Collection.Article)
    this.listenDoc(Collection.Shop, this.id)
    this.listenDoc(Collection.User, this.uid)
    this.initAuth()
  },
  destroyed() {
    this.unlistenCol(Collection.Shop)
    this.unlistenCol(Collection.User)
    this.unlistenCol(Collection.Order)
    this.unlistenCol(Collection.Article)
    this.unlistenDoc(Collection.Shop, this.id)
    this.unlistenDoc(Collection.User, this.uid)
  },
  computed: {
    ...mapGetters('dataset', ['getListCol', 'getShop', 'getUser']),
    ...mapGetters('session', ['logged', 'uid'])
  },
  methods: {
    ...mapActions('dataset', ['listenCol', 'unlistenCol', 'listenDoc', 'unlistenDoc']),
    ...mapActions('session', ['initAuth']),
    isUserShop(){
      const user = this.getUser(this.uid)
      const list = user.shopsId.filter((shopId) => { return shopId === this.id })
      return list.isEmpty()
    }
  }
}
</script>

<style scoped>

</style>
