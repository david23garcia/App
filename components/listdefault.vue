<template>
  <v-card>
    <v-card-title>
      {{ this.title }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon=mdi-magnify
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
      <v-btn icon><v-icon>mdi-plus-thick</v-icon></v-btn>
    </v-card-title>
    <v-data-table
      :headers=this.headers
      :items=this.getCol(this.type)
      :search=this.search
    ></v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'listdefault',
  data () {
    return {
      search: ''
    }
  },
  props: ['headers', 'desserts', 'type', 'title'],
  computed: {
    ...mapGetters(['getCol'])
  }
}
</script>

<style scoped>

</style>
