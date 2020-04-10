<template>
  <user-profile v-if="this.$route.params.id === this.uid"></user-profile>
  <failed-view v-else></failed-view>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UserProfile from '../../../components/user/userProfile'
import { Collection } from '../../../services/api'
import FailedView from '../../../components/failedView'

export default {
  components: { UserProfile, FailedView },
  computed: {
    ...mapGetters('dataset', ['getListCol']),
    ...mapGetters('session', ['uid'])
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

