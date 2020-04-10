<template>
  <article-profile v-if="userIsLogin || !logged"></article-profile>
  <failed-view v-else></failed-view>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../../../services/api'
import ArticleProfile from '../../../components/article/articleProfile'
import FailedView from '../../../components/failedView'

export default {
  components: { FailedView, ArticleProfile },
  computed: {
    ...mapGetters('dataset', ['getListCol']),
    ...mapGetters('session', ['userIsLogin', 'logged'])
  },
  mounted() {
    this.listenCol(Collection.Shop)
    this.listenCol(Collection.Article)
    this.initAuth()
  },
  destroyed() {
    this.unlistenCol(Collection.Shop)
    this.unlistenCol(Collection.Article)
  },
  methods: {
    ...mapActions('dataset', ['listenCol', 'unlistenCol']),
    ...mapActions('session', ['initAuth']),
  }
}
</script>

<style scoped>

</style>
