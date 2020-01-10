<template>
  <articles-view :shopId="null"></articles-view>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../services/api'
import ArticlesView from '../components/articlesView'

export default {
  components: { ArticlesView },
  computed: {
    ...mapGetters('dataset', ['getListCol']),
    ...mapGetters('session', ['logged', 'localUser', 'uid'])
  },
  mounted() {
    this.listenCol(Collection.User)
    this.listenCol(Collection.Shop)
    this.listenCol(Collection.Article)
    this.initAuth()
  },
  destroyed() {
    this.unlistenCol(Collection.User)
    this.unlistenCol(Collection.Shop)
    this.unlistenCol(Collection.Article)
  },
  methods: {
    ...mapActions('dataset', ['listenCol', 'unlistenCol']),
    ...mapActions('session', ['initAuth']),
  }
}
</script>
