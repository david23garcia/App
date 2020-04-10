<template>
  <v-container>
      <v-row><v-card-subtitle>Datos de Contacto</v-card-subtitle></v-row>
      <v-card-text>
        <v-row>{{'Telefono: ' + this.getShop(this.$route.params.id).phone}}</v-row>
        <v-row>{{'Email: ' + this.getShop(this.$route.params.id).email}}</v-row>
        <v-row>{{'Direccion: '+this.getShop(this.$route.params.id).address}}</v-row>
      </v-card-text>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../../services/api'

export default {
  name: "shopContactInfo",
  computed: {
    ...mapGetters('dataset', ['getShop']),
  },
  mounted() {
    this.listenCol(Collection.Shop)
  },
  destroyed() {
    this.unlistenCol(Collection.Shop)
  },
  methods: {
    ...mapActions('dataset', ['listenCol', 'unlistenCol']),
  }
}
</script>

<style scoped>

</style>
