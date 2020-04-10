<template>
  <v-card v-if="userIsLogin || superadminIsLogin ">
    <v-card-title>Actualizar Información del Usuario</v-card-title>
    <v-container>
      <user-update-form></user-update-form>
    </v-container>
  </v-card>
  <failed-view v-else></failed-view>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
import UserUpdateForm from '../../../components/user/userUpdateForm'
import FailedView from '../../../components/failedView'
import { Collection } from '../../../services/api'

export default {
  components: { FailedView, UserUpdateForm },

  computed: {
    ...mapGetters('dataset', ['getListCol']),
    ...mapGetters('session', ['logged', 'superadminIsLogin', 'userIsLogin'])
  },
  mounted() {
    this.listenCol(Collection.User)
    this.initAuth()
  },
  destroyed() {
    this.unlistenCol(Collection.User)
  },
  methods: {
    ...mapActions('dataset', ['listenCol', 'unlistenCol']),
    ...mapActions('session', ['initAuth']),
  }
}
</script>

<style scoped>

</style>
