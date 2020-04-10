<template>
  <v-card>
    <v-row>
      <v-col>
        <v-card-title>COMERCIOS</v-card-title>
      </v-col>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-col align-self="right">
        <v-btn icon @click="register">
          <v-icon>mdi-account-plus</v-icon>
          Nuevo Comercio
        </v-btn>
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
      >
        <template v-slot:item.action="{ item }">
          <v-icon
            @click="updateItem(item)"
          >
            mdi-pencil
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
        </template>
      </v-data-table>
    </v-card>
  </v-card>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { Collection } from '../../services/api'

  export default {
    name: "shopList",
    data() {
      return {
        title: 'Comercios',
        headers: [
          { text: 'Nombre', value: 'name' },
          { text: 'Administrador', value: 'user' },
          { text: 'Email', value: 'email' },
          { text: 'Phone', value: 'phone' },
          { text: 'Acciones', value: 'action', sortable: false }
        ]
      }
    },
    computed: {
      ...mapGetters('dataset', ['getListCol', 'getUser']),
      ...mapGetters('session', ['superadminIsLogin']),
    },
    mounted() {
      this.listenCol(Collection.Shop)
    },
    destroyed() {
      this.unlistenCol(Collection.Shop)
    },
    methods: {
      ...mapActions('dataset', ['listenCol', 'unlistenCol', 'updateModel']),
      items() {
        return this.getListCol(Collection.Shop).filter((shop) => {
          return !shop.isRemoved
        }).map((shop) => ({user: this.getUser(shop.userId).email, ...shop}))
      },
      register(){
        this.$router.replace('/shops/register')
      },
      deleteItem(item){
        this.updateModel({ collection: Collection.Shop, data:  {
            isRemoved: true
          }, id: item.id })
      },
      bloquedItem(item){
        this.updateModel({ collection: Collection.Shop, data:  {
            isBlocked: true
          }, id: item.id })
      },
      desbloquedItem(item){
        this.updateModel({ collection: Collection.Shop, data:  {
            isBlocked: false
          }, id: item.id })
      },
      updateItem(item){
        this.$router.replace('/shops/'+item.id+'/update')
      }
    }
  }
</script>

<style scoped>

</style>
