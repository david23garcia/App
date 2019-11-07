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
    items: ['Destacados', 'Precio ↑', 'Precio ↓', 'A→Z', 'Z→A', 'Valoración'],
    value: ['Destacados', 'Precio ↑', 'Precio ↓', 'A→Z', 'Z→A', 'Valoración'],
    active: false
  }),
  name: 'orderby'
}
</script>
