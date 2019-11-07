<template>
  <v-flex xs6>
    <v-text-field
      v-model="Buscar"
      @keyup="updateData()"
      label="Buscar"
      append-icon=mdi-magnify
    ></v-text-field>
  </v-flex>
</template>

<script>
export default {
  name: 'search'
}
</script>

<style scoped>

</style>
