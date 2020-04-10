<template>
    <v-card>
      <v-card-title>{{ this.getUser(this.$route.params.id).name + ' ' +  this.getUser(this.$route.params.id).surname1 +
        ' ' + this.getUser(this.$route.params.id).surname2}}</v-card-title>
      <v-container>
        <v-col>
          <v-row>
            <v-col cols="4"><v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img></v-col>
            <v-col>
                <v-row>{{ 'Email: ' + this.getUser(this.$route.params.id).email }}</v-row>
                <v-row>{{ 'Telefono: ' + this.getUser(this.$route.params.id).phone }}</v-row>
                <v-row>{{ 'Direccion:'}}</v-row>
              <v-row>
                <v-card-text v-if="hasError">Se ha producido un error al Elimnar el Usuario pruebe de nuevo</v-card-text>
                <v-col><v-btn @click="update()">Modificar Perfil</v-btn></v-col>
                <v-col><v-btn @click="remove()">Eliminar Perfil</v-btn></v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-container>
    </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../../services/api'

export default {
  name: "userProfile",
  data: () => ({
    hasError: false
  }),
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
    ...mapActions('dataset', ['listenCol', 'unlistenCol', 'updateModel']),
    ...mapActions('session', ['disableUser', 'logout']),
    update(){
      this.$router.replace('/users/'+this.$route.params.id+'/update')
    },
    async remove(){
      try{
        await this.disableUser(this.$route.params.id)
        this.logout()
      } catch (e) {
        this.hasError = true;
      }
    }
  }
}
</script>

<style scoped>

</style>
