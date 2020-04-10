<template>
  <article-list v-if="adminIsLogin || superadminIsLogin"></article-list>
  <failed-view v-else></failed-view>
</template>

<script>
import { mapGetters } from 'vuex'
import ArticleList from '../../components/article/articleList'
import FailedView from '../../components/failedView'

export default {
  components: { FailedView, ArticleList },
  computed: {
    ...mapGetters('session', ['adminIsLogin', 'superadminIsLogin']),
  }
}
</script>

<style scoped>

</style>
