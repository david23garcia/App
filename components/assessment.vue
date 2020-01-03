<template>
  <v-row v-if="this.value<=0.5 && this.value>0">
    <v-icon>mdi-star-half</v-icon>
    <v-icon>mdi-star-outline</v-icon>
    <v-icon>mdi-star-outline</v-icon>
    <v-icon>mdi-star-outline</v-icon>
    <v-icon>mdi-star-outline</v-icon>
  </v-row>
  <v-row v-else-if="this.value<=1 && this.value>0.5 ">
    <v-icon>mdi-star</v-icon>
    <v-icon>mdi-star-outline</v-icon>
    <v-icon>mdi-star-outline</v-icon>
    <v-icon>mdi-star-outline</v-icon>
    <v-icon>mdi-star-outline</v-icon>
  </v-row>
  <v-row v-else-if="this.value<=1.5 && this.value>1">
    <v-icon>mdi-star</v-icon>
    <v-icon>mdi-star-half</v-icon>
    <v-icon>mdi-star-outline</v-icon>
    <v-icon>mdi-star-outline</v-icon>
    <v-icon>mdi-star-outline</v-icon>
  </v-row>
  <v-row v-else-if="this.value<=2 && this.value>1.5">
    <v-icon>mdi-star</v-icon>
    <v-icon>mdi-star</v-icon>
    <v-icon>mdi-star-outline</v-icon>
    <v-icon>mdi-star-outline</v-icon>
    <v-icon>mdi-star-outline</v-icon>
  </v-row>
  <v-row v-else-if="this.value<=2.5 && this.value>2">
    <v-icon>mdi-star</v-icon>
    <v-icon>mdi-star</v-icon>
    <v-icon>mdi-star-half</v-icon>
    <v-icon>mdi-star-outline</v-icon>
    <v-icon>mdi-star-outline</v-icon>
  </v-row>
  <v-row v-else-if="this.value<=3 && this.value>2.5">
    <v-icon>mdi-star</v-icon>
    <v-icon>mdi-star</v-icon>
    <v-icon>mdi-star</v-icon>
    <v-icon>mdi-star-outline</v-icon>
    <v-icon>mdi-star-outline</v-icon>
  </v-row>
  <v-row v-else-if="this.value<=3.5 && this.value>3">
    <v-icon>mdi-star</v-icon>
    <v-icon>mdi-star</v-icon>
    <v-icon>mdi-star</v-icon>
    <v-icon>mdi-star-half</v-icon>
    <v-icon>mdi-star-outline</v-icon>
  </v-row>
  <v-row v-else-if="this.value<=4 && this.value>3.5">
    <v-icon>mdi-star</v-icon>
    <v-icon>mdi-star</v-icon>
    <v-icon>mdi-star</v-icon>
    <v-icon>mdi-star</v-icon>
    <v-icon>mdi-star-outline</v-icon>
  </v-row>
  <v-row v-else-if="this.value<=4.5 && this.value>4">
    <v-icon>mdi-star</v-icon>
    <v-icon>mdi-star</v-icon>
    <v-icon>mdi-star</v-icon>
    <v-icon>mdi-star</v-icon>
    <v-icon>mdi-star-half</v-icon>
  </v-row>
  <v-row v-else-if="this.value<=5 && this.value>4.5">
    <v-icon>mdi-star</v-icon>
    <v-icon>mdi-star</v-icon>
    <v-icon>mdi-star</v-icon>
    <v-icon>mdi-star</v-icon>
    <v-icon>mdi-star</v-icon>
  </v-row>
  <v-row v-else>
    <v-icon>mdi-star-outline</v-icon>
    <v-icon>mdi-star-outline</v-icon>
    <v-icon>mdi-star-outline</v-icon>
    <v-icon>mdi-star-outline</v-icon>
    <v-icon>mdi-star-outline</v-icon>
  </v-row>
</template>

<script>
  export default {
    name: "A",
    props: ['value']
  }
</script>

<style scoped>

</style>
