<template>
  <div  v-if="exhibitions">
      <div class="container search-title">
        <h1>Search Results for: {{this.$route.params.term}}</h1>
      </div>
      <div class="container grid">
        <ExhibitionThumb v-for="item in exhibitions.edges" v-bind:key="item.node.slug" v-bind:exhibition="item.node" />
      </div>
      <div class="pagination">
        <div v-if="exhibitions.pageInfo.hasNextPage" class="load-more">
          <div v-if="$fetchState.pending" class="loading">Loading...</div>
          <div v-else @click="fetchMore()" class="primary-button">Load More</div>
        </div>    
        <div v-else class="all-loaded">
          <div v-if="exhibitions.edges.length == 0" class="none-found">Sorry, we couldn't find any articles matching this criteria.</div>
          <div v-else>{{exhibitions.edges.length}} exhibition<span v-if="exhibitions.edges.length > 1">s</span> found</div>
        </div>
      </div>      
  </div>
</template>

<script>
import { gql } from 'nuxt-graphql-request'
import ExhibitionThumb from  '~/components/ExhibitionThumb'
const exhibitions_per_load = 18
const query = gql`
    query SearchEx (
      $term: String
      $first: Int
      $after: String          
    ){
    exhibitions(first: $first, after: $after, where: {search: $term}) {
      edges {
        node {
          slug
          title
          featuredImage {
            node {
              sourceUrl(size: MEDIUM)
              altText
              srcSet(size: MEDIUM)
              mediaDetails {
                width
                height
              }                      
            }
          }
          artists {
            nodes {
              name
              slug
            }
          }                                  
          ExhibitionFields {
            startDate
            endDate
          }                            
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }          
    }
  }     
`

export default {
  components: {
    ExhibitionThumb
  },

  methods: {
    async fetchMore() {
      const variables = { first: exhibitions_per_load, after: this.exhibitions.pageInfo.endCursor, term: this.searchTerm }
      const data = await this.$graphql.default.request(query, variables)
      console.log(data)
      this.exhibitions.edges = [...this.exhibitions.edges, ...data.exhibitions.edges]
      this.exhibitions.pageInfo.endCursor = data.exhibitions.pageInfo.endCursor;
    } 
  },
  async asyncData({ $graphql, route }) {
    const variables = { 
      first: exhibitions_per_load, 
      after: null,
      term: route.params.term 
    }
    const data = await $graphql.default.request(query, variables)
    const exhibitions = data.exhibitions;
    return { exhibitions }
  }
}
</script>

<style lang="scss" scoped>
  .exhibition-thumb {
    @include thirds;
  }
  .search-title {
    margin: $factor * 2 auto;
    text-align: center;
    h1 {
      font-size: 2em;
    }
  }
</style>
