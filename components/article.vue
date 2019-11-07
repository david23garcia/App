<template>
    <v-layout>
      <v-row>
        <v-col>
          <v-img src="./static/img/no_disponible.png"></v-img>
        </v-col>
        <v-col>
          <v-card-title>TITULO</v-card-title>
          <v-textarea>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.</v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn>Añadir al Carrito</v-btn>
        </v-col>
        <v-col>
<!--          valoración v-icons en funcion de la valoración decidir numero de iconos de un tipo u otro-->
        </v-col>
      </v-row>
      <v-row>
<!--        comentarios v-list cada item es un comentario, con un titulo, autor y descrp (incluir boton de add comentario)-->
      </v-row>
    </v-layout>
</template>

<script>
  export default {
    name: 'article'
  }
</script>

<style scoped>

</style>
