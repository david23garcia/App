<template>
  <v-col cols="10">
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Buscar"
      single-line
      hide-details
    ></v-text-field>
    <v-row>
      <article-card v-for="(item, i) in items()" :id="item.id" :key="i"></article-card>
    </v-row>
  </v-col>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import search from '../components/search'
// import filters from '../components/filters'
import ArticleCard from '../components/articleCard'
import { Collection } from '../services/api'

export default {
  components: {
    ArticleCard,
    // search,
    // filters
  },
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
        if(this.search === ''){
          return !item.isRemoved
        } else {
          return !item.isRemoved && (item.title.toLowerCase().includes(this.search) ||item.description.toLowerCase().includes(this.search))
        }

      })

    }
  }
}
</script>
