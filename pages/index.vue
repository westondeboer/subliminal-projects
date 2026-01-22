<template>
  <div v-if="page && slides.length" id="page-home">
    <section v-if="slides.length" class="hero container">
      <Carousel v-bind:slides="slides" />
    </section>
    <section class="features container">
      <div class="feature" v-for="(feature, index) in page.HomeFields.features" :key="feature.title +index">
        <div class="img-wrap">
          <div class="img">
            <img v-bind:src="feature.image.sourceUrl" :alt="feature.title">
          </div>
        </div>
        <div class="info">
          <h5>{{feature.title}}</h5>
          <div class="content" v-html="feature.blurb"></div>
          <div v-if="feature.link" class="link">
            <a v-bind:target="feature.linkInNewWindow ? '_blank' : '_self'" v-bind:href="feature.link">{{feature.linkText}}</a>
          </div>
        </div>
      </div>
    </section>
  </div> 
</template>

<script>
import { gql } from 'nuxt-graphql-request'
import meta, {metaGql} from '~/plugins/meta.js'
import Carousel from '~/components/Carousel'

export default {
  components: {
    Carousel
  },
  data () {
    return {
      slides: null
    }
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
      query HomeQuery {
        page(id: "/", idType: URI) {
          id
          title
          ${metaGql}              
          HomeFields {
            hero {
              ... on Exhibition {
                id
                slug
                title             
                featuredImage {
                  node {
                    sourceUrl(size: LARGE)
                  }
                }
                ExhibitionFields {
                  startDate
                  endDate
                }
                artists {
                  nodes {
                    name
                    slug
                  }
                }                   
              }
            }
            features {
              title
              blurb
              image {
                id
                sourceUrl(size: MEDIUM)
              }
              link
              linkInNewWindow
              linkText
            }
          }       
        }
      }
    `
    const { page } = await $graphql.default.request(query)
    const slides = page.HomeFields.hero
    return { page, slides }
  }
}
</script>


<style lang="scss">

$carouselHeight: 56vw;

.hero {
  position: relative;
  margin-bottom: $factor * 1.5;
}

.features {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: $factor;
  .feature {
    @include thirds;
    margin-bottom: $factor * 2;
    .img-wrap {
      margin-bottom: 1em;
    }
    .img {
      width: 100%;
      padding-bottom: 60%;
      position: relative;
      align-self: flex-start;
      img {
        position: absolute;
        height: 100%;
        width: 100%;
        object-fit: cover;
      }      
    }
    .info {
      /* width: 35%;
      padding-left: 20px; */
      .link {
        margin-top: 10px;
        text-transform: uppercase;
        text-align: right;
        a {
          color: $dark;
          text-decoration: none;
          border-bottom: 2px solid $black;
          transition: all 0.2s ease-out;
          &:hover {
            color: $grey;
            border-bottom: 2px solid $grey;
          }
        }
      }
    }
  }
}
</style>