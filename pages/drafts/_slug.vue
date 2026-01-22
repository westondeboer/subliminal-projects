
<template>
  <div v-if="draft">
    <PageBuilder v-if="draft.ProjectBuilder.project.length" v-bind:content="draft"/>
    <ExhibitionProjectClassic v-else v-bind:content="draft"/>
  </div>
</template>
<script>

import { gql } from 'nuxt-graphql-request'
import ExhibitionProjectClassic from '~/components/ExhibitionProjectClassic'
import PageBuilder from '~/components/PageBuilder'

export default {
  components: {
    ExhibitionProjectClassic,
    PageBuilder
  },
  mounted() {
  },
  async asyncData({ $graphql, route }) {
    const post_uri = route.params.slug

    const query = gql`
      query PortfolioSingleQuery ($uri: ID!) {
        draft(id: $uri, idType: URI) {
          id
          title
          content
          featuredImage {
            node {
              sourceUrl(size: LARGE)
            }
          }
          ProjectBuilder {
            project {
              ... on Draft_Projectbuilder_Project_Row {
                fieldGroupName
                columns {
                  type
                  imageFit
                  imageCaption
                  content
                  verticalAlign
                  imageLink {
                    url
                    title
                    target
                  }  
                  image {
                    altText
                    sourceUrl(size: LARGE)
                    srcSet(size: LARGE)
                    mediaDetails {
                      width
                      height
                    }                        
                  }
                }
              }
            }
          }               
          ExhibitionFields {
            startDate
            endDate
            openingReceptionDate
            openingReceptionTime
            links {
              link {
                url
                title
                target
              }
            }                    
            images {
              caption
              description(format: RENDERED)
              altText                  
              sourceUrl(size: MEDIUM)
              mediaDetails {
                sizes {
                  sourceUrl
                  name
                }
              }                  
            }      
          }  
        }
      }           
    `
    const variables = { uri: post_uri }
    const { draft } = await $graphql.default.request(query, variables)
    return { draft }
  }  
}
</script> 