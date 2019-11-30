<template>
  <v-card>
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
      <v-btn icon><v-icon>mdi-plus-thick</v-icon></v-btn>
    </v-card-title>
    <v-data-table
      :headers="this.headers"
      :items="items"
      :search="this.search"
    ></v-data-table>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'listdefault',
  data() {
    return {
      search: ''
    }
  },
  props: ['headers', 'desserts', 'type', 'title'],
  mounted() {
    this.listenCol(this.type)
  },
  computed: {
    ...mapGetters('dataset', ['getCol']),
    items() {
      const data = this.getCol(this.type)
      const keys = Object.keys(data)
      return keys.map(id => ({ id, ...data[id] }))
    }
  },
  methods: {
    ...mapActions('dataset', ['listenCol'])
  }
}
</script>

<style scoped></style>
