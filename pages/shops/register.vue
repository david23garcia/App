<template>
  <v-card v-if="userIsLogin || superadminIsLogin">
    <v-card-title>Nuevo Comercio</v-card-title>
    <v-container>
      <shop-form></shop-form>
    </v-container>
  </v-card>
  <failed-view v-else></failed-view>
</template>
<script>
import { mapGetters } from 'vuex'
import ShopForm from '../../components/shop/shopForm'
import FailedView from '../../components/failedView'

export default {
  name: "register",
  components: { FailedView, ShopForm },

  computed: {
    ...mapGetters('session', ['userIsLogin', 'superadminIsLogin']),
  },
}
</script>
<style scoped>

</style>
