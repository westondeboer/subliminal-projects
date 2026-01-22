<template>
  <div>
    <section v-if="page" class="featured-project container">

      <nuxt-link :to="'/projects/' + page.ProjectPageFields.featuredProject.slug" class="thumb">
        <div class="img">
          <FadeImage :src="page.ProjectPageFields.featuredProject.featuredImage.node.sourceUrl" :srcset="page.ProjectPageFields.featuredProject.featuredImage.node.srcSet" :alt="page.ProjectPageFields.featuredProject.featuredImage.node.altText" />
        </div>
        <h2 v-html="page.ProjectPageFields.featuredProject.title" />
      </nuxt-link>


      <div class="info" v-html="page.content" />

    </section>
    <section v-if="page" class="projects container grid">
      <nuxt-link :to="'/projects/'+project.slug" class="project" v-for="project in page.ProjectPageFields.projects" v-bind:key="project.slug" >
        <div class="img" v-if="project.featuredImage">
          <FadeImage :src="project.featuredImage.node.sourceUrl" :srcset="project.featuredImage.node.srcSet" :alt="project.featuredImage.node.altText" />
        </div>
        <div class="details">
          <h3>{{project.title}}</h3>
        </div>
      </nuxt-link>
    </section>


    
  </div>
</template>




<script>
import { gql } from 'nuxt-graphql-request'
import FadeImage from '~/components/FadeImage'
import meta, {metaGql} from '~/plugins/meta.js'
const query = gql`
  query Projects {
    page(id: "71102", idType: DATABASE_ID) {
      id
      title
      content
      ${metaGql}              
      ProjectPageFields {
        featuredProject {
          ... on Project {
            id
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
          }
        } 
        projects {
          ... on Project {
            id
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
          }
        }                                
      }
    }            
  }
`
export default {
  components: {
    FadeImage
  },
  data() {
    return {
      foundPosts: null,
      queryCursor: null,
      displayedPosts: [],
      page: null
    };
  },
  head () {
    if (this.page && this.page.seo) {
      return {
        title: this.page.seo.title,
        meta: meta(this.page.seo)
      }    
    }
  },    
  mounted() {
    
  },
  async asyncData({ $graphql, route }) {
    const { page } = await $graphql.default.request(query)
    return { page }
  },
  
}  
// https://hackernoon.com/how-to-build-a-load-more-button-with-vue-js-and-graphql-5e6de1b61a6b
</script>



<style lang="scss" scoped>


  .exhibition-thumb,
  .past-exhibition {
    @include thirds;
  }
  .pagination {
    margin: $factor;
    text-align: center;
  }
  .load-more {
    min-height: $factor * 2;
  }


  .featured-project {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: $factor * 3;
    .thumb {
      width: 46%;
      color: $dark;
      text-decoration: none;
      @include breakpoint(small) {
        width: 100%;
        margin-bottom: $factor;
      }
      h2 {
        font-size: 1.5rem;
      }   
    }
    &:hover {
      .img  img {
        transform: scale(1.03);
        transform-origin: center;
      }      
    }       
    .img {
      padding-bottom: 88%;
      position: relative;
      margin-bottom: $factor * 0.5;
      overflow: hidden;      
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.3s ease-out;
        transform: scale(1);           
      }
    }
    
    .info {
      width: 50%;
      font-size: 2vw;
      line-height: 1.5em;
      font-weight: bold;
      position: relative;
      text-align: justify; 
      @include breakpoint(small) {
        width: 100%;
        font-size: 2em;
      }        
    }
  }
  .projects {
    margin-bottom: $factor * 2;
    .project {
      @include thirds;
      color: $dark;
      text-decoration: none;
      display: block;
      margin-bottom: $factor * 2;
      @include breakpoint(small) {
        margin-bottom: $factor;
      }
      &:hover {
        .img  img {
          transform: scale(1.03);
          transform-origin: center;
        }      
      }      
      .img {
        position: relative;
        padding-bottom: 100%;
        margin-bottom: $factor * 0.5;
        overflow: hidden;
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.3s ease-out;
          transform: scale(1);          
        }        
      }
    }
  }
</style>