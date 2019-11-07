<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      src="/no_disponible.png"
    >
      <v-card-title>Articulo A</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">categoria</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>Descripción articulo</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange"
        text
      >
        Comprar
      </v-btn>

      <v-btn
        color="orange"
        text
      >
        Detalles
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'articlecard'

}
</script>

<style scoped>

</style>
