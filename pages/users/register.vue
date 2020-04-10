<template>
  <v-card v-if="superadminIsLogin || !logged">
    <v-card-title>Nuevo Usuario</v-card-title>
    <v-container>
      <user-form></user-form>
    </v-container>
  </v-card>
  <failed-view v-else></failed-view>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
import UserForm from '../../components/user/userForm'
import FailedView from '../../components/failedView'
import { Collection } from '../../services/api'

export default {
  name: "register",
  components: { FailedView, UserForm },

  computed: {
    ...mapGetters('dataset', ['getListCol']),
    ...mapGetters('session', ['logged', 'superadminIsLogin'])
  },
  mounted() {
    this.listenCol(Collection.User)
  },
  destroyed() {
    this.unlistenCol(Collection.User)
  },
  methods: {
    ...mapActions('dataset', ['listenCol', 'unlistenCol']),
  }
}
</script>

<style scoped>

</style>
