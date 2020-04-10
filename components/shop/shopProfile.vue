<template>
  <v-card>
    <v-card-title>{{ this.getShop(this.$route.params.id).name }}</v-card-title>
    <v-col>
      <v-row>
        <v-col cols="5"><v-img src="https://picsum.photos/id/11/100/60"></v-img></v-col>
        <v-col>
          <v-card-subtitle>Descripción</v-card-subtitle>
          <v-card-text>{{this.getShop(this.$route.params.id).description}}</v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col><shop-contact-info></shop-contact-info></v-col>
        <v-col><shop-user-info :userId="this.getShop(this.$route.params.id).userId"></shop-user-info></v-col>
      </v-row>
      <v-row v-if="hasError">Ha existido un problema al eliminar el comercio. Vuelva a intentarlo</v-row>
      <v-row>
        <v-col><v-btn @click="updateShop()">Modificar Comercio</v-btn></v-col>
        <v-col><v-btn @click="updateUser()">Modificar Usuario</v-btn></v-col>
        <v-col><v-btn @click="remove()">Eliminar Comercio</v-btn></v-col>
      </v-row>
    </v-col>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../../services/api'
import ShopUserInfo from './shopUserInfo'
import ShopContactInfo from './shopContactInfo'

export default {
  name: 'ShopProfile',
  components: { ShopContactInfo, ShopUserInfo },
  data () {
    return {
      hasError: false
    }
  },
  computed: {
    ...mapGetters('dataset', ['getListCol', 'getShop', 'getUser']),
    ...mapGetters('session', ['path'])
  },
  mounted() {
    this.listenCol(Collection.Shop)
  },
  destroyed() {
    this.unlistenCol(Collection.Shop)
  },
  methods: {
    ...mapActions('dataset', ['listenCol', 'unlistenCol']),
    ...mapActions('session', ['logout', 'dis']),
    updateShop(){
      this.$router.replace('/shops/'+this.$route.params.id+'/update')
    },
    updateUser(){
      this.$router.replace('/users/'+this.getShop(this.$route.params.id).userId+'/update')
    },
    async remove () {
      try{
        this.updateModel({
          collection: Collection.Shop, data: {
            isRemoved: true
          }, id: this.$route.params.id
        })
        await this.disableUser(this.$route.params.id)
        this.logout()
        await this.$router.replace(this.path)
      } catch (e) {
        this.hasError = true;
      }
    }
  },
  updateShop(){
    this.$router.replace('/shops/'+this.$route.params.id+'/update')
  }
}
</script>

<style scoped>

</style>
