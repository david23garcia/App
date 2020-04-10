<template>
  <v-card>
    <v-card-title>ERROR</v-card-title>
    <v-card-subtitle>Se ha producido un Error en el sistema. Vuelva a la página principal</v-card-subtitle>
    <v-container><v-btn @click="submit()">OK</v-btn></v-container>
  </v-card>

</template>

<script>
import { mapGetters } from 'vuex'

export default {

  computed: {
    ...mapGetters('session', ['path'])
  },
  methods: {
    submit(){
      this.$router.replace(this.path)
    }
  }
}
</script>

<style>

</style>
