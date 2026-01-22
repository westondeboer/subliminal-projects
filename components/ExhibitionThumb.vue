<template>
  <nuxt-link :to="'/exhibitions/'+exhibition.slug" class="exhibition-thumb">
    <div class="labels" v-if="exhibition.exhibitionCategories">
      <li v-for="label in exhibition.exhibitionCategories.nodes" v-bind:key="label.slug">{{label.name}}</li>
    </div>  
    <div class="feature-img">
      <FadeImage v-bind:src="exhibition.featuredImage.node.sourceUrl" />
    </div>
    <h2 v-html="exhibition.title"></h2>

    <ul class="artists"  v-if="exhibition.artists && exhibition.artists.nodes.length < 3" >
      <li v-for="artist in exhibition.artists.nodes" v-bind:key="artist.slug">{{artist.name}}</li>
    </ul>


    <div class="date">
      <span v-html="exhibition.ExhibitionFields.startDate" /> — <span v-html="exhibition.ExhibitionFields.endDate" />
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