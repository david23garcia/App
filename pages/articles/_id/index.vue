<template>
  <article-profile v-if="userIsLogin || !logged"></article-profile>
  <failed-view v-else></failed-view>
</template>

<script>
  import ArticleProfile from '../../../components/article/articleProfile'
  import FailedView from '../../../components/failedView'
  export default {
    components: { FailedView, ArticleProfile }
  }
</script>

<style scoped>

</style>
