<template>
  <div v-if="page" class="container">
    <h1>{{page.title}}</h1>
    <div class="content formatted-content" v-html="page.content"/>
  </div>
</template>

<script>
import { gql } from 'nuxt-graphql-request'
import meta, {metaGql} from '~/plugins/meta.js'

export default {
  head () {
    if (this.page && this.page.seo) {
      return {
        title: this.page.seo.title,
        meta: meta(this.page.seo)
      }    
    }
  },
  async asyncData({ $graphql, route }) {
    const query = gql`
      query InfoPageQuery {
        page(id: "69183", idType: DATABASE_ID) {
          id
          title
          content(format: RENDERED)
          ${metaGql}              
        }
      }    
    `
    const { page } = await $graphql.default.request(query)
    return { page }
  }
}
</script>

<style lang="scss" scoped>
  h1 {
    font-size: 2rem;
    text-align: center;
    padding: $factor 0 $factor*0.5;
  }
</style>