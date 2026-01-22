<template>
  <nuxt-link v-if="exhibition" :to="'/exhibitions/'+exhibition.slug" class="exhibition-thumb">
    <div class="labels" v-if="categories.length">
      <li v-for="label in categories" v-bind:key="label.slug">{{label.name}}</li>
    </div>  
    <div class="feature-img">
      <FadeImage v-if="featuredImageUrl" v-bind:src="featuredImageUrl" />
    </div>
    <h2 v-html="exhibition.title"></h2>

    <ul class="artists"  v-if="artists.length && artists.length < 3" >
      <li v-for="artist in artists" v-bind:key="artist.slug">{{artist.name}}</li>
    </ul>


    <div class="date">
      <span v-html="startDate" /> — <span v-html="endDate" />
    </div>

  </nuxt-link>
</template>
<script>
import FadeImage from '~/components/FadeImage'

export default {
  props: {
    exhibition: Object
  },
  components: {
    FadeImage
  },
  computed: {
    featuredImageUrl() {
      // Safely access nested properties
      if (this.exhibition && this.exhibition.featuredImage && this.exhibition.featuredImage.node) {
        return this.exhibition.featuredImage.node.sourceUrl;
      }
      return null;
    },
    categories() {
      if (this.exhibition && this.exhibition.exhibitionCategories && this.exhibition.exhibitionCategories.nodes) {
        return this.exhibition.exhibitionCategories.nodes;
      }
      return [];
    },
    artists() {
      if (this.exhibition && this.exhibition.artists && this.exhibition.artists.nodes) {
        return this.exhibition.artists.nodes;
      }
      return [];
    },
    startDate() {
      return (this.exhibition && this.exhibition.ExhibitionFields) ? this.exhibition.ExhibitionFields.startDate : '';
    },
    endDate() {
      return (this.exhibition && this.exhibition.ExhibitionFields) ? this.exhibition.ExhibitionFields.endDate : '';
    }
  }
}
</script>

<style lang="scss" scoped>
  .exhibition-thumb {
    display: block;
    margin-bottom: $factor;
    color: $dark;
    text-decoration: none;
  	&:hover {
		  .feature-img  img {
        transform: scale(1.03);
        transform-origin: center;
		  }
	  }   
    .feature-img {
      width: 100%;
      padding-bottom: 57%;
      position: relative;
      margin-bottom: $factor * 0.25;
      overflow: hidden;
      img {
    		transition: all 0.3s ease-out;
        position: absolute;
        height: 100%;
        width: 100%;
        object-fit: cover;
			  transform: scale(1);
      }
    }
    .subtitle {
      margin-bottom: $factor * 0.125;
      @include sans;
    }
    h2 {
      font-weight: bold;
    }
    .artists {
      display: block;
      li {
        display: inline-block;
        //margin-right: 20px;
        /* &:before {
          content: "  ";
        }
        &:first-of-type:before {
          content: " ";
        } */
        &:after {
          content: ',';
          margin-right: 0.5em;
        }
        &:last-of-type {
          &:after {
            display: none;
          }
        }        
      }
    }
    .labels {
      position: absolute;
      z-index: 1;
      top: 0;
      right: 0;
      display: flex;
      li {
        @include badge;
        margin-left: 5px;
      }
    }
  }
</style>