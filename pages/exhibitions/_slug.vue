
<template>
  <div v-if="exhibition">
    <PageBuilder v-if="exhibition.ProjectBuilder.project.length" v-bind:content="exhibition"/>
    <ExhibitionProjectClassic v-else v-bind:content="exhibition"/>    
  </div>
</template>
<script>

import { gql } from 'nuxt-graphql-request'
import ExhibitionProjectClassic from '~/components/ExhibitionProjectClassic'
import PageBuilder from '~/components/PageBuilder'
import meta, {metaGql} from '~/plugins/meta.js'

export default {
  components: {
    ExhibitionProjectClassic,
    PageBuilder
  },
  head () {
    if (this.exhibition && this.exhibition.seo) {
      return {
        title: this.exhibition.seo.title,
        meta: meta(this.exhibition.seo)
      }    
    }
  },    
  updated() {
  },
  mounted() {
  },
  async asyncData({ $graphql, route }) {
    const post_uri = route.params.slug

    const query = gql`
      query PortfolioSingleQuery ($uri: ID!) {
        exhibition(id: $uri, idType: URI) {
          id
          title
          content
          ${metaGql}
          featuredImage {
            node {
              sourceUrl(size: LARGE)
            }
          }
          ProjectBuilder {
            project {
              ... on Exhibition_Projectbuilder_Project_Row {
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
          artists {
            nodes {
              ArtistFields {
                instagramHandle
                link
                siteLink
                hideInArtistList
              }
              name
              slug
            }
          }                
        }
      }              
    `;
    const variables = { uri: post_uri }
    const { exhibition } = await $graphql.default.request(query, variables)
    return { exhibition }
  } 
}
</script>
