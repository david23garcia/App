<template>
  <v-container align="center" col="8">
    <v-radio-group v-model="type" row>
      <v-radio label="Usuarios" value="user"></v-radio>
      <v-radio label="Comercios" value="shop"></v-radio>
      <v-radio label="Articulos" value="article"></v-radio>
    </v-radio-group>
    <v-flex v-if="type == 'user'" col="6">
      <listdefault :headers = "headersUser" :type="user" :title='userTitle'> </listdefault>
    </v-flex>
    <v-flex v-else-if="type == 'shop'" col="6">
      <listdefault :headers = "headersShop" :type="shop" :title='shopTitle'> </listdefault>
    </v-flex>
    <v-flex v-else-if="type == 'article'" col="6">
      <listdefault :headers = "headersArticles" :type="article" :title='articleTitle'> </listdefault>
    </v-flex>
  </v-container>
</template>

<script>
import Listdefault from '../components/listdefault'
import { Collection } from '../services/api'
export default {
  name: 'admin',
  components: { Listdefault },
  data () {
    return {
      search: '',
      type: 'user',
      user: Collection.User,
      shop: Collection.Shop,
      article: Collection.Article,
      userTitle: 'Usuarios',
      shopTitle: 'Comercios',
      articleTitle: 'Articulos',
      headersUser: [
        { text: 'Id', value: 'id' },
        { text: 'Nombre', value: 'name' },
        { text: 'Apellidos', value: 'surnames' },
        { text: 'Email', value: 'email' },
        { text: 'Telefono', value: 'phone' },
        { text: 'Rol', value: 'role' }
      ],
      headersShop: [
        { text: 'Id', value: 'id' },
        { text: 'Nombre', value: 'name' },
        { text: 'Descripcion', value: 'description' },
        { text: 'Email', value: 'email' },
        { text: 'Telefono', value: 'phone' }
      ],
      headersArticles: [
        { text: 'Id', value: 'id' },
        { text: 'Id Comercio', value: 'idShop' },
        { text: 'Nombre', value: 'name' },
        { text: 'Descripcion', value: 'description' },
        { number: 'Precio', value: 'price' },
        { number: 'Cantidad', value: 'quantity' },
        { text: 'Codigo Barras', value: 'barcode' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
