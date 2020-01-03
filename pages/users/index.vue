<template>
  <v-card v-if="!isRegister">
      <v-row>
        <v-col>
          <v-card-title>USUARIOS</v-card-title>
        </v-col>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-col align-self="right">
<!--          <v-btn icon @click="isRegister=true">-->
<!--            <v-icon>mdi-account-plus</v-icon>-->
<!--            Nuevo Usuario-->
<!--          </v-btn>-->
        </v-col>
      </v-row>
      <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items()"
        :search="search"
      >
        <template v-slot:item.action="{ item }">
          <v-icon
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-account-edit
          </v-icon>
          <v-icon v-if="!item.isBlocked"
            @click="bloquedItem(item)"
          >
            mdi-account-off-outline
          </v-icon>
          <v-icon v-else
                  @click="desbloquedItem(item)"
          >
            mdi-account-outline
          </v-icon>
          <v-icon
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
          <v-icon
            @click="updatePassword(item)"
          >
            mdi-lock-reset
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-card>
  <userform v-else></userform>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../../services/api'
import Userform from '../../components/userForm'

export default {
  components: { Userform },
  data() {
    return {
      title: 'Usuarios',
      headers: [
        { text: 'Nombre', value: 'name' },
        { text: 'Apellido 1', value: 'surname1' },
        { text: 'Apellido 2', value: 'surname2' },
        { text: 'Rol', value: 'role' },
        { text: 'Email', value: 'email' },
        { text: 'Telefono', value: 'phone' },
        { text: 'Acciones', value: 'action', sortable: false }
      ],
      isRegister: false
    }
  },
  computed: {
    ...mapGetters('dataset', ['getListCol']),
    ...mapGetters('session', ['role']),
  },
  mounted() {
    this.listenCol(this.user)
  },
  destroyed() {
    this.unlistenCol(this.user)
  },
  methods: {
    ...mapActions('dataset', ['listenCol', 'unlistenCol', 'updateModel']),
    ...mapActions('session', ['ressetPassword']),
    items(){
      // return this.getListCol(Collection.User).filter((item) => {
      //   if(this.role === Rol.Admin) {
      //     return (item.role === Rol.employee) && !((item.isBlocked === true) || (item.isRemoved === true))
      //   } else {
      //     return !item.isRemoved === true
      //   }
      // })
      return this.getListCol(Collection.User).filter((item) => {
        return !item.isRemoved
      })
    },
    editItem(item){
      console.log(item)
    },
    deleteItem(item){
      this.updateModel({ collection: Collection.User, data:  {
          isRemoved: true
        }, id: item.id })
    },
    bloquedItem(item){
      this.updateModel({ collection: Collection.User, data:  {
          isBlocked: true
        }, id: item.id })
    },
    desbloquedItem(item){
      this.updateModel({ collection: Collection.User, data:  {
          isBlocked: false
        }, id: item.id })
    },
    updatePassword(item){
      this.ressetPassword(item.email)
    }
  }
}
</script>

<style scoped>

</style>
