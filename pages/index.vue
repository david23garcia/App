<template>
  <v-layout justify-center align-center>
    <search />
    <filters />
  </v-layout>
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
