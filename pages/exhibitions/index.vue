<template>
  <div v-if="page">

    <section class="current-show container">
      <div v-for="exhibition in page.ExhibitionsLandingFields.featuredExhibition" class="featured-exhibition" v-bind:key="exhibition.slug">
        <nuxt-link v-bind:to="'/exhibitions/' + exhibition.slug" class="current-show-wrap">
          <div class="feature-img">
            <div class="wrap">
              <FadeImage v-bind:src="exhibition.featuredImage.node.sourceUrl" />
            </div>
          </div>
          <div class="lockdown">
            <div class="title" v-html="exhibition.title"></div>

            <ul class="artists" v-if="exhibition.artists && exhibition.artists.nodes.length < 3" >
              <li v-for="artist in exhibition.artists.nodes" v-bind:key="artist.slug">{{artist.name}}</li>
            </ul>
            <div class="dates">
              <span v-html="exhibition.ExhibitionFields.startDate" /> — <span v-html="exhibition.ExhibitionFields.endDate" />
            </div>              
          </div>
        </nuxt-link>          
      </div>
    </section>
    <AllExhibitions />
  </div>
</template>

<script>
import { gql } from 'nuxt-graphql-request'
import FadeImage from '~/components/FadeImage'
import ExhibitionThumb from '~/components/ExhibitionThumb'
import AllExhibitions from '~/components/AllExhibitions'
import meta, {metaGql} from '~/plugins/meta.js'

export default {
  components: {
    FadeImage,
    ExhibitionThumb,
    AllExhibitions
  },
  head () {
    if (this.page && this.page.seo) {
      return {
        title: this.page.seo.title,
        meta: meta(this.page.seo)
      }    
    }
  },
  async asyncData({ $graphql, params }) {
    const query = gql`
        query ExhibitionsQuery {
          page(id: "71006", idType: DATABASE_ID) {
            id
            title
            ${metaGql}              
            ExhibitionsLandingFields {
              featuredExhibition {
                ... on Exhibition {
                  title
                  slug
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
                  ExhibitionFields {
                    startDate
                    endDate
                  }                  
                  featuredImage {
                    node {
                      sourceUrl(size: MEDIUM)
                    }
                  }
                }
              }
              upcomingExhibitions {
                ... on Exhibition {      
                  title
                  slug
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
                  featuredImage {
                    node {
                      sourceUrl(size: MEDIUM)
                    }
                  }
                }
              }
            }
          }
        }          
    `
    const { page } = await $graphql.default.request(query)
    return { page }
  }
}
</script>

<style lang="scss" scoped>
  .current-show {
    margin-bottom: $factor * 2;
  }
  .featured-exhibition {
    &:nth-last-of-type(even) {
      .current-show-wrap{
        flex-direction: row-reverse;
      }
    }
  }
  .current-show-wrap {
    position: relative;
    margin-bottom: $factor * 2.5;
    display: block;
    color: $dark; 
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    text-decoration: none;
    .feature-img {
      width: 66%;
      @include breakpoint(small) {
        width: 100%;
        margin-bottom: 1em;
      }
      .wrap {
        width: 100%;
        padding-bottom: 57%;
        position: relative;
        overflow: hidden;
      }  
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(1);
        transition: all 0.2s ease-in;
      }      
    }
    &:hover {
      img {
        transform: scale(1.03);
      }
    }
  }
  .lockdown {
    width: 33%;
    font-size: 1.5rem;
    font-weight: bold;
    align-items: center;
    text-align: center;
    @include breakpoint(small) {
      display: block;
      width: 100%;
    }       
    .dates {
      margin-top: 0.5rem;
      font-weight: normal;
      font-size: 1rem
    }
    .artists {
      text-align: center;
      display: block;
      li {
        display: inline-block;
        &:after {
          content: ',';
          margin-right: 0.5rem;
        }
        &:last-of-type {
          &:after {
            display: none;
          }
        }
      }
    }
  }
  .upcoming-shows {
    .upcoming-shows-title {
      text-align: left;
      font-size: 2em;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: $factor * 0.5;
    }
    .exhibition-thumb {
      @include thirds;
    }
  }  
</style>