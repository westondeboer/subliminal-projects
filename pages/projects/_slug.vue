
<template>
  <div v-if="project">
    <PageBuilder v-if="project.ProjectBuilder.project.length" v-bind:content="project"/>
    <ExhibitionProjectClassic v-else v-bind:content="project"/>
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
    if (this.project && this.project.seo) {
      return {
        title: this.project.seo.title,
        meta: meta(this.project.seo)
      }    
    }
  },  
  mounted() {
  },
  async asyncData({ $graphql, route }) {
    const post_uri = route.params.slug
    const query = gql`
      query PortfolioSingleQuery ($uri: ID!) {
        project(id: $uri, idType: URI) {
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
              ... on Project_Projectbuilder_Project_Row {
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
    const { project } = await $graphql.default.request(query, variables)
    return { project }
  }  
}
</script> 