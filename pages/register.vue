<template>
  <v-row align="center">
    <v-radio-group v-model="type" row>
      <v-radio label="Registrar Usuario" value="user"></v-radio>
      <v-radio label="Registrar Comercio" value="shop"></v-radio>
    </v-radio-group>
    <userform v-if="type === 'user'" cols="6" :isActive="false"></userform>
    <shopform v-else col="6" :toReturn="''">
    </shopform>
  </v-row>
</template>

<script>
import userform from '../components/userform'
import shopform from '../components/shopform'
export default {
  components: {
    userform,
    shopform
  },
  data: () => ({
    type: 'user'
  })
}
</script>

<style scoped>

</style>
