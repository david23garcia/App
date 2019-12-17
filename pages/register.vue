<template>
  <userform v-if="!this.logged" cols="6"></userform>
  <shopform v-else col="6">
  </shopform>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import userform from '../components/userform'
import shopform from '../components/shopform'

export default {
  components: {
    userform,
    shopform
  },
  data: () => ({
    type: 'user'
  }),
  mounted() {
    this.initAuth()
  },
  destroyed() {
  },
  computed: {
    ...mapGetters('session', ['logged'])
  },
  methods: {
    ...mapActions('session', ['initAuth']),
  },
}
</script>

<style scoped>

</style>
