<template>
  <shop-list v-if="superadminIsLogin"></shop-list>
  <failed-view v-else></failed-view>
</template>

<script>
import { mapGetters } from 'vuex'
import ShopList from '../../components/shop/shopList'
import FailedView from '../../components/failedView'

export default {
  components: { FailedView, ShopList },

  computed: {
    ...mapGetters('session', ['superadminIsLogin']),
  },
}
</script>

<style scoped>

</style>
