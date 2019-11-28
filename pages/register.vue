<template>
  <v-container align="center" col="8">
    <v-radio-group v-model="type" row>
      <v-radio label="Registrar Usuario" value="user"></v-radio>
      <v-radio label="Registrar Comercio" value="shop"></v-radio>
    </v-radio-group>
    <v-flex v-if="type == 'user'" col="6">
       <userform />
    </v-flex>
    <v-flex v-else col="6">
       <shopform />
    </v-flex>
  </v-container>
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
