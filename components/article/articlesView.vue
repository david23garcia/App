<template>
  <v-col cols="10">
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Buscar"
      single-line
      hide-details
    ></v-text-field>
    <br/>
    <v-row>
      <article-card v-for="(item, i) in items()" :id="item.id" :key="i"></article-card>
    </v-row>
  </v-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../../services/api'
import ArticleCard from './articleCard'

export default {
  name: 'ArticlesView',
  components: { ArticleCard },
  props: ['id'],
  data () {
    return {
      search: ''
    }
  },
  computed: {
    ...mapGetters('dataset', ['getListCol']),
    ...mapGetters('session', ['logged', 'localUser', 'uid'])
  },
  mounted() {
    this.listenCol(Collection.User)
    this.listenCol(Collection.Shop)
    this.listenCol(Collection.Article)
    this.initAuth()
  },
  destroyed() {
    this.unlistenCol(Collection.User)
    this.unlistenCol(Collection.Shop)
    this.unlistenCol(Collection.Article)
  },
  methods: {
    ...mapActions('dataset', ['listenCol', 'unlistenCol']),
    ...mapActions('session', ['initAuth']),
    items() {
      return this.getListCol(Collection.Article).filter((item) => {
        if(typeof this.id === 'undefined'){
          return this.search === '' ? !item.isRemoved : !item.isRemoved && (item.title.toLowerCase().includes(this.search.toLowerCase())
            ||item.description.toLowerCase().includes(this.search.toLowerCase()))
        } else {
          return this.search === '' ? !item.isRemoved && this.id === item.shopId : !item.isRemoved && this.id === item.shopId
            && (item.title.toLowerCase().includes(this.search.toLowerCase()) ||item.description.toLowerCase().includes(this.search.toLowerCase()))
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
