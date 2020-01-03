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
        :items="getListShops()"
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
        </template>
      </v-data-table>
    </v-card>
  </v-card>
  <shop-form v-else></shop-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Collection, Rol } from '../../services/api'
import ShopForm from '../../components/shopForm'

export default {
  components: { ShopForm },
  data() {
    return {
      shop: Collection.Shop,
      user: Collection.User,
      admin: Rol.Admin,
      employee: Rol.Employee,
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
    this.listenCol(this.shop)
    this.listenCol(this.user)
  },
  destroyed() {
    this.unlistenCol(this.shop)
    this.listenCol(this.user)
  },
  methods: {
    ...mapActions('dataset', ['listenCol', 'unlistenCol', 'updateModel']),
    editItem(item){
      console.log(item)
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
    getListShops() {
      return this.getListCol(this.shop).filter((item) => {
        return !((item.isBlocked === true) || (item.isRemoved === true))
      })
      // console.log(data)
      // return data.map((shop) => {
      //   console.log(shop.userId)
      //   const user = this.getUser(shop.userId)
      //   console.log(user)
      //   return { user: user.name + user.surname1 + user.surname2, ...shop }
      // })
    }
  }
}
</script>

<style scoped>

</style>
