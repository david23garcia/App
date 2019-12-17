<template>
  <v-card align="center" cols="10">
    <v-card align="center" cols="5">
      <v-radio-group v-model="type" row align="center">
        <v-radio label="Usuarios" value="user"></v-radio>
        <v-radio label="Comercios" value="shop"></v-radio>
        <v-radio label="Articulos" value="article"></v-radio>
      </v-radio-group>
    </v-card>
    <v-card>
      <listdefault
        v-if="type === 'user'"
        :headers="headersUser"
        :type="user"
        :title="userTitle"
      ></listdefault>
      <listdefault
        v-else-if="type === 'shop'"
        :headers="headersShop"
        :type="shop"
        :title="shopTitle"
      ></listdefault>
      <listdefault
        v-else-if="type === 'article'"
        :headers="headersArticles"
        :type="article"
        :title="articleTitle"
      ></listdefault>
    </v-card>
  </v-card>
</template>

<script>
import Listdefault from '../components/listdefault'
import { Collection } from '../services/api'
export default {
  name: 'Admin',
  components: { Listdefault },
  data() {
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

<style scoped></style>
