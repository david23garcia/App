<template>
  <v-card v-if="adminIsLogin">
    <v-card-title>Actualizar Información del Artículo</v-card-title>
    <v-container>
      <article-update-form></article-update-form>
    </v-container>
  </v-card>
  <failed-view v-else></failed-view>
</template>

<script>
import { mapGetters } from 'vuex'
import ArticleUpdateForm from '../../../components/article/articleUpdateForm'
import FailedView from '../../../components/failedView'

export default {
  name: "update",
  components: { FailedView, ArticleUpdateForm },

  computed: {
    ...mapGetters('session', ['adminIsLogin']),
  }
}
</script>

<style scoped>

</style>
