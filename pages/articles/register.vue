<template>
  <v-card v-if="adminIsLogin || superadminIsLogin">
    <v-card-title>Registrar Nuevo Artículo</v-card-title>
    <v-container>
      <article-form></article-form>
    </v-container>
  </v-card>
  <failed-view v-else></failed-view>
</template>

<script>
import { mapGetters } from 'vuex'
import ArticleForm from '../../components/article/articleForm'
import FailedView from '../../components/failedView'


export default {
  name: "register",
  components: { FailedView, ArticleForm },
  computed: {
    ...mapGetters('session', ['adminIsLogin', 'superadminIsLogin']),
  }
}
</script>

<style scoped>

</style>
