<template>
  <v-card v-if="!isRegister">
    <v-row>
      <v-col>
        <v-card-title>USUARIOS</v-card-title>
      </v-col>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-col align-self="right">
<!--        <v-btn icon @click="isRegister=true">-->
<!--          <v-icon>mdi-account-plus</v-icon>-->
<!--          Nuevo Comercio-->
<!--        </v-btn>-->
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
  <shop-form v-else></shop-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../../services/api'
import ShopForm from '../../components/shopForm'

export default {
  components: { ShopForm },
  data() {
    return {
      title: 'Comercios',
      headers: [
        { text: 'Nombre', value: 'name' },
        { text: 'Descripción', value: 'description' },
        { text: 'Administrador', value: 'user' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone' },
        { text: 'Acciones', value: 'action', sortable: false }
      ],
      isRegister: false
    }
  },
  computed: {
    ...mapGetters('dataset', ['getListCol', 'getUser']),
    ...mapGetters('session', ['role']),
  },
  mounted() {
    this.listenCol(Collection.Shop)
    this.listenCol(Collection.User)
  },
  destroyed() {
    this.unlistenCol(Collection.shop)
    this.listenCol(Collection.user)
  },
  methods: {
    ...mapActions('dataset', ['listenCol', 'unlistenCol', 'updateModel']),
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
    items() {
      return this.getListCol(this.shop).filter((item) => {
        return !((item.isBlocked === true) || (item.isRemoved === true))
      })
    }
  }
}
</script>

<style scoped>

</style>
