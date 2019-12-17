<template>
  <v-col>
    <v-subheader inset>COMERCIOS</v-subheader>
    <v-divider></v-divider>
    <v-list-item
      v-for="(item, i) in this.getListCol(shop).filter((s) => {
              return !((s.isBlocked === true) || (s.isRemoved === true))
             })"
      :key="i"
      :to="'/shops/'+item.title"
      router
      exact
    >
      <v-list-item-action>
        <v-icon>mdi-playstation</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title v-text="item.id" />
      </v-list-item-content>
    </v-list-item>
  </v-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../services/api'

export default {
  name: "userlayout",
  data () {
    return {
      shop: Collection.Shop
    }
  },
  mounted() {
    this.listenCol(this.shop)
  },
  destroyed() {
    this.unlistenCol(this.shop)
  },
  computed: {
    ...mapGetters('dataset', ['getListCol'])
  },
  methods: {
    ...mapActions('dataset', ['listenCol', 'unlistenCol'])
  }
}

</script>

<style scoped>

</style>
