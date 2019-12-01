<template>
  <v-card v-if="!isForm">
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
      <v-btn icon @click="isForm=true"><v-icon>mdi-plus-thick</v-icon></v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items=this.getListCol(type)
      :search="search"
    ></v-data-table>
  </v-card>
  <v-card v-else>
    <shopform v-if="type===shop" :toReturn="'admin'"></shopform>
    <userform v-else-if="type===user" :toReturn="'admin'"></userform>
    <shopform v-else-if="type===article" :toReturn="'admin'"></shopform>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Collection } from '../services/api'
import Shopform from './shopform'
import Userform from './userform'
export default {
  name: 'listdefault',
  components: { Userform, Shopform },
  data() {
    return {
      search: '',
      isForm: false,
      shop: Collection.Shop,
      article: Collection.Article,
      user: Collection.User
    }
  },
  props: ['headers', 'type', 'title'],
  mounted() {
    this.listenCol(this.shop)
    this.listenCol(this.article)
    this.listenCol(this.user)
  },
  destroyed() {
    this.unlistenCol(this.shop)
    this.unlistenCol(this.article)
    this.unlistenCol(this.user)
  },
  computed: {
    ...mapGetters('dataset', ['getListCol']),
  },
  methods: {
    ...mapActions('dataset', ['listenCol', 'unlistenCol']),
  }
}
</script>

<style scoped></style>
