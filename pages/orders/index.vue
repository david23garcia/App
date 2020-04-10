<template>
  <order-list v-if="logged"></order-list>
  <failed-view v-else></failed-view>
</template>

<script>
import { mapGetters } from 'vuex'
import OrderList from '../../components/order/orderList'
import FailedView from '../../components/failedView'

export default {
  components: { FailedView, OrderList },
  computed: {
    ...mapGetters('session', ['logged']),
  },
}
</script>

<style scoped>

</style>
