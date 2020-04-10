<template>
  <v-card>
    <v-card-title>ERROR</v-card-title>
    <v-card-subtitle>No tienes permisos suficientes</v-card-subtitle>
    <v-card-text>El usuario con el que desea acceder no tiene los permisos suficientes</v-card-text>
    <v-container><v-btn @click="submit">OK</v-btn></v-container>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "failedView",

  computed: {
    ...mapGetters('session', ['path']),
  },
  methods: {
    submit(){
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>

</style>
