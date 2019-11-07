<template>
  <v-row>
    <v-col cols="6">
      Registrar Usuario
      <userform />
    </v-col>
    <v-col cols="6">
      Registrar Comercio
      <shopform />
    </v-col>
  </v-row>
</template>

<script>
import userform from '../components/userform'
import shopform from '../components/shopform'
export default {
  components: {
    userform,
    shopform
  }
}
</script>

<style scoped>

</style>
