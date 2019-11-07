<template>
  <v-layout>
    <v-col>
      <v-row>
        <articlecard />
      </v-row>
      <v-row>
        <articlecard />
      </v-row>
      <v-row>
        <articlecard />
      </v-row>
    </v-col>
    <v-col>
      <v-row>
        <articlecard />
      </v-row>
      <v-row>
        <articlecard />
      </v-row>
      <v-row>
        <articlecard />
      </v-row>
    </v-col>
    <v-col>
      <v-row>
        <articlecard />
      </v-row>
      <v-row>
        <articlecard />
      </v-row>
      <v-row>
        <articlecard />
      </v-row>
    </v-col>
  </v-layout>
</template>

<script>
import articlecard from './articlecard'
export default {
  comments: {
    articlecard
  },
  data: () => ({
    // items: [
    //   {
    //     src: '/img/no_disponible.png',
    //     title: 'Articulo 1',
    //     category: 'categoria',
    //     description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500',
    //     price: 'XX,XX €'
    //   },
    //   {
    //     src: '/img/no_disponible.png',
    //     title: 'Articulo 1',
    //     category: 'categoria',
    //     description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500',
    //     price: 'XX,XX €'
    //   },
    //   {
    //     src: '/img/no_disponible.png',
    //     title: 'Articulo 1',
    //     category: 'categoria',
    //     description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500',
    //     price: 'XX,XX €'
    //   },
    //   {
    //     src: '/img/no_disponible.png',
    //     title: 'Articulo 1',
    //     category: 'categoria',
    //     description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500',
    //     price: 'XX,XX €'
    //   },
    //   {
    //     src: '/img/no_disponible.png',
    //     title: 'Articulo 1',
    //     category: 'categoria',
    //     description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500',
    //     price: 'XX,XX €'
    //   },
    //   {
    //     src: '/img/no_disponible.png',
    //     title: 'Articulo 1',
    //     category: 'categoria',
    //     description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500',
    //     price: 'XX,XX €'
    //   },
    //   {
    //     src: '/img/no_disponible.png',
    //     title: 'Articulo 1',
    //     category: 'categoria',
    //     description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500',
    //     price: 'XX,XX €'
    //   },
    //   {
    //     src: '/img/no_disponible.png',
    //     title: 'Articulo 1',
    //     category: 'categoria',
    //     description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500',
    //     price: 'XX,XX €'
    //   },
    //   {
    //     src: '/img/no_disponible.png',
    //     title: 'Articulo 1',
    //     category: 'categoria',
    //     description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500',
    //     price: 'XX,XX €'
    //   }
    // ]
  }),
  name: 'listarticlescard'

}

</script>

<style scoped>

</style>
