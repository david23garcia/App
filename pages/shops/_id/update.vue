<template>
  <v-card v-if="adminIsLogin || superadminIsLogin">
    <v-card-title>Actualizar Información del Usuario</v-card-title>
    <v-container>
      <shop-update-form></shop-update-form>
    </v-container>
  </v-card>
  <failed-view v-else></failed-view>
</template>

<script>
import { mapGetters } from 'vuex'
import ShopUpdateForm from '../../../components/shop/shopUpdateForm'
import FailedView from '../../../components/failedView'

export default {

  components: { FailedView, ShopUpdateForm },
  computed: {
    ...mapGetters('session', ['adminIsLogin', 'superadminIsLogin']),
  },
}
</script>

<style scoped>

</style>
