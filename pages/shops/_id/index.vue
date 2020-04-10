<template>
  <shop-profile v-if="adminIsLogin"></shop-profile>
  <shop-view v-else></shop-view>
</template>

<script>
import { mapGetters } from 'vuex'
import ShopProfile from '../../../components/shop/shopProfile'
import ShopView from '../../../components/shop/shopView'

export default {
  components: {
    ShopView,
    ShopProfile,
  },
  computed: {
    ...mapGetters('session', ['adminIsLogin'])
  }
}
</script>

<style scoped>

</style>

