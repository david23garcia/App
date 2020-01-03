<template>
  <v-card v-if="!isRegister && !isUpdate">
    <v-row>
      <v-col>
        <v-card-title>ARTICULOS</v-card-title>
      </v-col>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-col align-self="right">
        <v-btn icon @click="isRegister=true">
          <v-icon>mdi-account-plus</v-icon>
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
        :headers="headers"
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
  <article-form v-else-if="isRegister && !isUpdate"></article-form>
  <article-update-form v-else-if="isUpdate && !isRegister" :id="idUpdate"></article-update-form>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { Collection, Rol } from '../../services/api'
  import ArticleForm from '../../components/articleForm'
  import ArticleUpdateForm from '../../components/articleUpdateForm'

  export default {
    components: { ArticleUpdateForm, ArticleForm },
    data() {
      return {
        title: 'Articulos',
        headers: [
          { text: 'Codigo de Barras', value: 'barcode' },
          { text: 'Nombre', value: 'title' },
          { text: 'Cantidad', value: 'quantity' },
          { text: 'Precio', value: 'price' },
          { text: 'Comercio', value: 'shop' },
          { text: 'Acciones', value: 'action', sortable: false }
        ],
        isRegister: false,
        isUpdate: false,
        idUpdate: ''
      }
    },
    computed: {
      ...mapGetters('dataset', ['getListCol', 'getShop']),
      ...mapGetters('session', ['localUser']),
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
      editItem(item){
        this.idUpdate = item.id
        this.isUpdate = true
      },
      deleteItem(item){
        this.updateModel({ collection: Collection.Article, data:  {
            isRemoved: true
          }, id: item.id })
      },
      items(){
        return this.getListCol(Collection.Article).filter((item) => {
          return this.adminIsLogin() ? item.shopId === this.localUser.shopId && !item.isRemoved : !item.isRemoved
        }).map((item) => ({ shop: this.getShop(item.shopId).name, ...item }))
      },
      adminIsLogin(){
        return this.logged ? this.localUser.role === Rol.Admin : false

      }
    }
  }
</script>

<style scoped>

</style>
