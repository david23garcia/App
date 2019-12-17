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
              <orderby />
              <v-divider></v-divider>
              <category />
              <v-divider></v-divider>
              <filterbyprice />
              <v-divider></v-divider>
            </v-card>
    </v-menu>
  </v-col>
</template>

<script>
import orderby from '../components/orderby'
import category from '../components/category'
import filterbyprice from '../components/filterbyprice'
export default {
  name: 'filters',
  components: {
    orderby,
    category,
    filterbyprice
  }
}
</script>

<style scoped>

</style>
