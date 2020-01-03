<template>
  <form>
    <v-card-title>Actualizar Articulo</v-card-title>
    <v-spacer></v-spacer>
    <v-text-field
      v-model="price"
      type="number"
      label="Precio"
    ></v-text-field>
    <v-text-field
      v-model="quantity"
      type="number"
      label="Cantidad"
    ></v-text-field>
    <v-btn class="mr-4" @click="submit">Actualizar</v-btn>
    <v-btn @click="clear">Cancelar</v-btn>
  </form>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../services/api'

export default {
  name: 'ArticleUpdateForm',
  props: ['id'],
  data: () => ({
    price: null,
    quantity: null,
  }),
  computed: {
    ...mapGetters('dataset', ['getListCol']),
  },
  mounted() {
    this.listenCol(Collection.Shop)
    this.listenCol(Collection.User)
    this.initAuth()
  },
  destroyed() {
    this.unlistenCol(Collection.Shop)
    this.unlistenCol(Collection.User)
  },
  methods: {
    ...mapActions('dataset', ['updateModel','listenCol', 'unlistenCol']),
    ...mapActions('session', ['initAuth']),
    submit () {
      if(this.quantity === null && this.price !== null) {
        this.updateModel({ collection: Collection.Article, data:  {
          price: this.price
          }, id: this.id })
      } else if (this.quantity !== null && this.price === null) {
        this.updateModel({ collection: Collection.Article, data:  {
            quantity: this.quantity
          }, id: this.id })
      } else if (this.quantity !== null && this.price !== null)
      this.updateModel({ collection: Collection.Article, data:  {
          quantity: this.quantity,
          price: this.price
        }, id: this.id })
      this.$parent.isUpdate = false
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.description = ''
      this.price = ''
      this.quantity = ''
      this.barcode = ''
      this.$parent.isUpdate = false
    },
    // items(){
    //   this.getListCol(Collection.Shop).filter(item => !(item.isBlocked || item.isRemoved))
    // },
  }
}
</script>

<style scoped>

</style>
