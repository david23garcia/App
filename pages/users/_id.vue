<template>
  <user-profile :id="this.uid"></user-profile>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../../services/api'
import UserProfile from '../../components/userProfile'

export default {
  components: { UserProfile },
  data () {
    return {
      isUpdateUser: false
    }
  },
  computed: {
    ...mapGetters('dataset', ['getListCol', 'getShop']),
    ...mapGetters('session', ['localUser', 'logged', 'adminIsLogin', 'uid'])
  },
  mounted() {
    this.listenCol(Collection.Shop)
    this.listenCol(Collection.User)
    this.listenCol(Collection.Article)
    this.initAuth()
  },
  destroyed() {
    this.unlistenCol(Collection.Shop)
    this.unlistenCol(Collection.User)
    this.unlistenCol(Collection.Article)
  },
  methods: {
    ...mapActions('dataset', ['listenCol', 'unlistenCol', 'updateModel']),
    ...mapActions('session', ['initAuth', 'logout']),
    remove(){
      this.logout()
      // inhabilitar cuenta del usuario para que no pueda volver a hacer login
      this.updateModel({ collection: Collection.User, data:  {
          isRemoved: true
        }, id: this.localUser.id })
      if(this.adminIsLogin){
        this.updateModel({ collection: Collection.Shop, data:  {
            isRemoved: true
          }, id: this.$route.params.id })
      }
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped>

</style>
