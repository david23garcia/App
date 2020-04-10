<template>
  <shop-profile v-if="adminIsLogin"></shop-profile>
  <shop-view v-else></shop-view>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
import ShopProfile from '../../../components/shop/shopProfile'
import ShopView from '../../../components/shop/shopView'
import { Collection } from '../../../services/api'

export default {
  components: { ShopView, ShopProfile, },
  computed: {
    ...mapGetters('dataset', ['getListCol']),
    ...mapGetters('session', ['adminIsLogin'])
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

