<template>
  <div v-if="content" id="page-exhibition">
    <section class="hero">
      <div class="container img-intro">
        <div class="image-title">
          <div v-if="content.featuredImage" class="img">
            <FadeImage v-bind:src="content.featuredImage.node.sourceUrl" />
          </div>
        </div>
        <div class="content">
          <div class="intro">
            <div class="exhibition-title">
              <div class="info">
                <div class="title">{{content.title}}</div>

                <ul v-bind:class="content.artists.nodes.length > 1 ? 'artists list' : 'artists'" v-if="content.artists" >
                  <li v-for="artist in content.artists.nodes" v-bind:key="artist.slug">{{artist.name}}</li>
                </ul>             
                <div v-if="content.ExhibitionFields.startDate || content.ExhibitionFields.endDate" class="date">
                  <span v-html="content.ExhibitionFields.startDate" /> — <span v-html="content.ExhibitionFields.endDate" />
                </div>
                <div class="opening" v-if="content.ExhibitionFields.openingReceptionDate || content.ExhibitionFields.openingReceptionTime">
                  Opening Reception: <span v-html="content.ExhibitionFields.openingReceptionDate" /> @ <span v-html="content.ExhibitionFields.openingReceptionTime" />
                </div>                
              </div>             
            </div>   
          </div>
          <ul class="links" v-if="content.ExhibitionFields.links">
            <li v-for="(link, index) in content.ExhibitionFields.links" v-bind:key="'link'+index">
              <a v-if="link.link && link.link.url" v-bind:href="link.link.url" v-bind:target="link.link.target" >{{link.link.title}}</a>
            </li>
          </ul>
        </div>
      </div>   
    </section>

    <section class="additonal-content container">
        <div class="content formatted-content" v-html="content.content" />
    </section>
    <section v-if="content.ExhibitionFields.images" class="gallery container">
      <div class="gallery-wrap grid">
        <div class="gallery-item" v-for="(image, index) in content.ExhibitionFields.images" v-bind:key="image.sourceUrl + index" >
          <div v-if="image.sourceUrl" @click="launchLightbox(index)">
            <FadeImage v-bind:src="image.sourceUrl" />
            <div class="caption" v-html="image.caption" />
          </div>
        </div>
      </div>
    </section>
    <Lightbox v-if="showLightbox" :imageArray="content.ExhibitionFields.images" :startingIndex="lightboxIndex" @closeLightbox="closeLightbox" />
  </div>  
</template>

<script>

import Lightbox from '~/components/Lightbox'
import FadeImage from '~/components/FadeImage'

export default {
  props: {
    content: Object
  },
  data() {
    return {
      lightboxIndex: 0,
      showLightbox: null
    }
  },
  components: {
    FadeImage,
    Lightbox
  },
  mounted() {
  },
  methods: { 
    launchLightbox(index) {
      this.showLightbox = true;
      this.lightboxIndex = index;
    },
    closeLightbox() {
      this.showLightbox = false;
    }
  }
}
</script>



<style lang="scss" scoped>
  .hero {
    margin-top: $factor;
    @include breakpoint(small) {
      display: flex;
      flex-direction: column-reverse;
    }    
  }
  .img-intro {
    position: relative;
    width: 100vw;
    margin-bottom: $factor;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .image-title {
      width: 50%;
      @include breakpoint(small) {
        width: 100%;
        margin-bottom: $factor;
      }
      .img {
        position: relative;
        padding-bottom: 65%;
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
    }
    .content {
      width: calc(50% - 50px);
      @include breakpoint(small) {
        width: 100%;

      }      
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .intro {
        @include breakpoint(small) {
          margin-bottom: $factor;
        }        
      }
      .links {
        font-size: 1.5em;
        text-transform: uppercase;
        font-weight: bold;
        display: block;
        li {
          display: block;
          a {
            color: $dark;
          }
        }
      }
    }
  }

  .exhibition-title {
    margin-bottom: $factor * 3;
    @include breakpoint(small) {
      margin-bottom: $factor;
    }        
    .info {
      font-size: 1.5rem;
      @include breakpoint(small) {
        margin-bottom: $factor;
        width: 100%;
      }          
      h1, .title {
        //font-size: 1em;
        font-weight: bold;
        text-transform: unset;
      }
      .date {
        //font-size: 0.75em;
        font-weight: normal;
        //margin-bottom: 1em;
        font-size: 1rem;
      }
      .opening {
        //font-size: 0.75em;
        font-weight: normal;
      }
      .artists {
        width: 50%;
        font-weight: bold;
        &.list {
          //font-size: 0.5em;
          display: block;
          margin-bottom: 1em;
          li {
            display: inline;
            &:after {
              content: " / ";
              opacity: 0.5;
            }
            &:last-of-type {
              &:after {
                display: none;
              }
            }
          }
        }
      }
    }
  }

  .gallery {
    margin-bottom: $factor;
  }
  .gallery-wrap {
    display: grid;
    width: 100%;
    overflow: hidden;
    grid-template-columns: repeat(4, 25fr);
    grid-auto-rows: minmax(min-content, max-content);
    grid-auto-flow: dense;
    gap: $factor * 2;
    @include breakpoint(small) {
      grid-template-columns: repeat(2, 25fr);
      gap: $factor;
    }      
  }
  .additonal-content {
    margin-bottom: $factor;
    .content {
      //width: 75%;
      display: block;
      @include breakpoint(small) {
        width: 100%;
      }      
    }
  }
  .lightbox {
    position: fixed;
    z-index: 100000;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background:white;
    img {
      top: 5vw;
      bottom: 5vw;
      left: 5vw;
      right: 5vw;
      height: calc(100vh - 10vw);
      width: calc(100vw - 10vw);
      object-fit: contain;
      position: absolute;
    }
    .close {
      position: absolute;
      top: $factor;
      right: $factor;
      cursor: pointer;
      z-index: 100;

    }
    .controls {
      position: absolute;
      bottom: $factor;
      right: $factor;
      display: flex;
      z-index: 100;
      > div {
        margin: 0 10px;
        cursor: pointer;
      }
    }
  }
</style>