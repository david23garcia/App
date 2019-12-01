<template>
  <v-row justify="center" align="center">
    <search />
    <filters />
  </v-row>
</template>

<script>
import search from '../components/search'
import filters from '../components/filters'

export default {
  components: {
    search,
    filters
  }
}
</script>
