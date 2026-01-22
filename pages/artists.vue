<template>
  <div>
    <section v-if="page" class="intro container">
      <div class="img" v-if="page.featuredImage">
        <FadeImage v-bind:src="page.featuredImage.node.sourceUrl" v-bind:alt="page.featuredImage.node.altText" v-bind:srcset="page.featuredImage.node.srcSet" />
      </div>
      <div class="content" v-if="page.content" v-html="page.content" />
    </section>
    <section class="artists-list">
      <div v-if="artistData.artists">
        <div class="container">
          <div class="artists">
            <div  class="artist" v-for="item in artistData.artists" v-bind:key="item.name">
              <h4>{{item.name}}</h4>
              <div v-if="item.instagramHandle || item.link" class="links">
                  <a target="_blank" v-if="item.link" v-bind:href="item.link"> 
                    <span v-if="item.linkText" v-html="item.linkText" />
                    <span v-else v-html="item.link">Website </span>
                  </a>
                  <a target="_blank" v-if="item.instagramHandle" v-bind:href="'https://instagram.com/' + item.instagramHandle"> 
                    @{{item.instagramHandle}}
                  </a>                
              </div>
              <div v-else-if="item.siteLink">
                <a target="_blank" v-bind:href="item.siteLink">Website</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="loader" v-else>
        <h1>Loading Artists...</h1>
      </div>       
    </section>
  </div>
 
</template>




<script>
import FadeImage from '~/components/FadeImage'
import ArtistsStatic from '~/components/ArtistsStatic'
import { gql } from 'nuxt-graphql-request'
export default {
  components: {
    FadeImage,
    ArtistsStatic
  },
  data: () => {
    return {
      gotArtists: true,
      artistData: {}
    }
  },
  methods: {     
  }, 
  mounted() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  computed: {
    filteredArtists() {
      const filteredGuys = []
      for (let i = 0; i < this.artists.edges.length; i++) {
        const element = this.artists.edges[i];
        if (!element.node.ArtistFields.hideInArtistList) {
          filteredGuys.push(element)
        } else {
          console.log('not showing', element.node.name);
        }
      }
      return filteredGuys;
    }
  },
  async asyncData({ $graphql, route }) {


    const query = gql`
        query Artists {          
          page(id: "67427", idType: DATABASE_ID) {
            id
            title
            content(format: RENDERED)
            featuredImage {
              node {
                sourceUrl(size: LARGE)
                srcSet(size: LARGE)
                altText
              }
            }
          }          
        }    
    `
    const { page } = await $graphql.default.request(query)

    const artistData = await fetch(
      'https://wp.subliminalprojects.com/wp-json/api/v1/data'
    ).then(res => res.json())

    return { page, artistData }
  }
}
</script>


<style lang="scss" scoped>
  .intro {
    .img {
      padding-bottom: 38%;
      position: relative;
      margin-bottom: $factor;
      img {
        position: absolute;
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
    .content {
      margin-bottom: $factor * 2;
      font-size: 1.2em;
    }
  }
  .artists-list {
    .loader {
      text-align: center;
      opacity: 0.5;
    }
  }
  .artists {    
    column-count: 4;
    column-gap: $factor;
    margin-bottom: $factor;
    @include breakpoint(small) {
      column-count: 2;
    }
  }
  .artist {
    break-inside: avoid;
    margin-bottom: $factor;
    h4 {
      @include type-regs-plus;
      text-transform: uppercase;
    }
  }
</style>