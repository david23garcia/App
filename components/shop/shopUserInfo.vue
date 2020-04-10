<template>
  <v-container>
      <v-card-subtitle>Propietario</v-card-subtitle>
      <v-card-text>
        <v-col>
          <v-row>
            <v-col cols="2"><v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img></v-col>
            <v-col>
              <v-row>{{'Nombre: '+ this.getUser(this.userId).name + ' ' +  this.getUser(this.userId).surname1 +
                ' ' + this.getUser(this.userId).surname2}}</v-row>
              <v-row>{{'Email: '+ this.getUser(this.userId).email}}</v-row>
              <v-row>{{'Telefono: '+ this.getUser(this.userId).phone}}</v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-card-text>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { Collection } from '../../services/api'

  export default {
    name: "shopUserInfo",
    props: ['userId'],
    computed: {
      ...mapGetters('dataset', ['getUser']),
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
