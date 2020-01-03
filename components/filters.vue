<template>
  <v-col cols="2">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="500"
      right>
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          dark
          v-on="on"
        >
          <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
        </template>
            <v-card>
              <v-card-title>Filtro</v-card-title>
              <v-divider></v-divider>
              <order-by />
              <v-divider></v-divider>
              <category />
              <v-divider></v-divider>
              <filter-by-price />
              <v-divider></v-divider>
            </v-card>
    </v-menu>
  </v-col>
</template>

<script>
import orderBy from './orderBy'
import category from '../components/category'
import filterByPrice from './filterByPrice'
export default {
  name: 'Filters',
  components: {
    orderBy,
    category,
    filterByPrice
  }
}
</script>

<style scoped>

</style>
