<template>
  <v-list-tile-content style="margin-bottom:0px">
    <v-list-tile-title>PRECIO</v-list-tile-title>
    <v-list-tile-action>
      <v-row>
        <v-col>
          <v-range-slider
            style="margin: 35px 20px 0px 20px"
            :max="500"
            :min="0"
            :step="1"
            thumb-label="always"
            hint="€"
            persistent-hint
          ></v-range-slider>
        </v-col>
      </v-row>
    </v-list-tile-action>
  </v-list-tile-content>
</template>

<script>
export default {
  name: 'filterbyprice'
}
</script>

<style scoped>

</style>
