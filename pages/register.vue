<template>
  <v-col v-if="!logged"><user-form></user-form></v-col>
  <v-col v-else-if="userIsLogin()"><shop-form></shop-form></v-col>
  <v-col v-else></v-col>
<!--  <userform v-if="!this.logged"></userform>-->
<!--  <shopform v-if="userIsLogin()" col="6"></shopform>-->
<!--  <div v-else>NO PUEDES REGISTRAR NADA</div>-->
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UserForm from '../components/userForm'
import ShopForm from '../components/shopForm'
import { Collection, Rol } from '../services/api'

export default {
  components: {
    UserForm,
    ShopForm
  },
  data: () => ({
    type: 'user',
    isRegister: false
  }),
  computed: {
    ...mapGetters('session', ['logged'])
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
    userIsLogin(){
      return this.logged ? this.localUser.role === Rol.User : false
    }
  },
}
</script>

<style scoped>

</style>
