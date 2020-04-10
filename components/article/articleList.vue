<template>
  <v-card>
    <v-row>
      <v-col>
        <v-card-title>ARTICULOS</v-card-title>
      </v-col>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-col v-if="adminIsLogin" align-self="right">
        <v-btn icon @click="register()">
          <v-icon>mdi-tag-plus</v-icon>
          Nuevo Articulo
        </v-btn>
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
        <template v-slot:item.action="{ item }">
          <v-icon
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-account-edit
          </v-icon>
          <v-icon
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../../services/api'

export default {

  name: "articleList",
  data() {
    return {
      title: 'Articulos',
      isRegister: false,
      isUpdate: false,
      idUpdate: ''
    }
  },
  computed: {
    ...mapGetters('dataset', ['getListCol', 'getShop']),
    ...mapGetters('session', ['localUser', 'adminIsLogin']),
  },
  mounted() {
    this.listenCol(Collection.Shop)
    this.listenCol(Collection.Article)
    this.listenCol(Collection.User)
    this.initAuth()
  },
  destroyed() {
    this.unlistenCol(Collection.Shop)
    this.listenCol(Collection.Article)
    this.listenCol(Collection.User)
  },
  methods: {
    ...mapActions('dataset', ['listenCol', 'unlistenCol', 'updateModel']),
    ...mapActions('session', ['initAuth']),
    register(){
      this.$router.replace('/articles/register')
    },
    editItem(item){
      this.$router.replace('/articles/'+item.id+'/update')
    },
    deleteItem(item){
      this.updateModel({ collection: Collection.Article, data:  {
          isRemoved: true
        }, id: item.id })
    },
    items(){
      return this.getListCol(Collection.Article).filter((article) => {
        return this.adminIsLogin ? article.shopId === this.localUser.shopId && !article.isRemoved : !article.isRemoved
      }).map((article) => ({ shop: this.getShop(article.shopId).name, ...article }))
    },
    headers(){
      if(this.adminIsLogin){
        return [
          { text: 'Codigo de Barras', value: 'barcode' },
          { text: 'Nombre', value: 'name' },
          { text: 'Cantidad', value: 'quantity' },
          { text: 'Precio', value: 'price' },
          { text: 'Acciones', value: 'action', sortable: false }
        ]
      } else {
        return [
          { text: 'Codigo de Barras', value: 'barcode' },
          { text: 'Nombre', value: 'name' },
          { text: 'Cantidad', value: 'quantity' },
          { text: 'Precio', value: 'price' },
          { text: 'Comercio', value: 'shop' },
          { text: 'Acciones', value: 'action', sortable: false }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
