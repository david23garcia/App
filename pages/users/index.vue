<template>
  <user-list v-if="superadminIsLogin"></user-list>
  <failed-view v-else></failed-view>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
import UserList from '../../components/user/userList'
import FailedView from '../../components/failedView'
import { Collection } from '../../services/api'

export default {
  components: { FailedView, UserList },
  computed: {
    ...mapGetters('session', ['superadminIsLogin', 'localUser', 'uid'])
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
