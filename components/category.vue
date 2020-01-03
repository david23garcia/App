<template>
  <v-select
    v-model="value"
    :items="items"
    attach
    chips
    label="Categorias"
    multiple
  ></v-select>
</template>

<script>
export default {
  data: () => ({
    items: ['Textil', 'Deportes', 'Calzado', 'Multimedia', 'Electronica', 'Electrodomesticos'],
    value: ['Textil', 'Deportes', 'Calzado', 'Multimedia', 'Electronica', 'Electrodomesticos'],
    active: false
  }),
  name: 'Category'

}
</script>

<style scoped>

</style>
