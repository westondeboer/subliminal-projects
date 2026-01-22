<template>
  <div id="page-info" class="container" v-if="page">
    <section class="hero grid">
      <div class="quote-wrap">
        <div class="quote" v-html="page.InfoFields.quote"/>
        <div class="attr">– {{page.InfoFields.quoteAttribute}}</div>
      </div>
      <div class="img">
        <FadeImage v-bind:src="page.featuredImage.node.sourceUrl" v-bind:alt="page.featuredImage.node.altText" v-bind:srcset="page.featuredImage.node.srcSet" />
      </div>
    </section>
    <section class="about">
      <div class="content" v-html="page.content" />
    </section>
    <section class="contact grid">
      <div class="contact-deets" v-html="page.InfoFields.contactSection">

      </div>
      <div class="collabs">
        <h5>In Collaboration With</h5>
        <ul class="icons">
          <li v-for="collab in page.InfoFields.collabs" v-bind:key="collab.link">
            <a v-bind:href="collab.link" target="_blank">
              <img v-bind:src="collab.image.sourceUrl" alt="">
            </a>   
          </li>
        </ul>
      </div>
    </section>
    <!-- <section class="feed">
    </section> -->
  </div>
</template>
<script>
//import IgFeed from "~/components/IgFeed"
import FadeImage from '~/components/FadeImage'
import { gql } from 'nuxt-graphql-request'
import meta, {metaGql} from '~/plugins/meta.js'

export default {
  components: {
    // IgFeed,
    FadeImage
  },
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
        page(id: "67432", idType: DATABASE_ID) {
          id
          title
          ${metaGql}              
          content(format: RENDERED)
          featuredImage {
            node {
              sourceUrl(size: LARGE)
              srcSet(size: LARGE)
              altText
            }
          }
          InfoFields {
            quote
            quoteAttribute
            contactSection              
            collabs {
              image {
                sourceUrl
              }
              link
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
  section {
    margin-bottom: $factor;
  }
  .hero {
    align-items: center;
    margin-bottom: $factor * 2;
    justify-content: space-between;
    .quote-wrap {
      width: 47%;
      font-size: 2vw;
      line-height: 1.5em;
      font-weight: bold;
      position: relative;
      text-align: justify;
      @include breakpoint(small) {
        width: 100%;
        margin-bottom: $factor;
        font-size: 2em;
      }
      .quote {
        padding-top: 2em;
        margin-bottom: $factor * 0.5;
       &:before {
          content: "\201C";
          font-size: 3em;
          position: absolute;
          margin-top: -30px;
        }        
        &:after {
          content: "\201D";
        }
      }
    }
    .img {
      width:50%;
      padding-bottom: 50%;
      position: relative;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      @include breakpoint(small) {
        width: 100%;
      }      
    }
  }
  .about {
    font-size: 1.2em;
    margin-bottom: $factor * 2;
    text-align: justify;

  }
  .contact {
    justify-content: space-between;
    .contact-deets {
      h5, .email {
        font-size: 1.2em;
        a {
          color: $dark;
        }
      }
      h5 {
        text-transform: uppercase;
        margin-bottom: $factor * 0.25;
      }
      @include breakpoint(small) {
        margin-bottom: $factor;
      }       
    }
    .collabs {
      text-align: left;
      .icons {
        display: flex;
        align-items: center;
        margin-top: $factor * 0.25;
        li {
          a {
            display: block;
          }
        }
        img {
          width: 60px;
          display: block;
        }
      }
    }
  }
</style>