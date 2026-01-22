<template>
  <div class="carousel">
    <transition-group tag="div" :name="transitionName" class="carousel-view">
      <nuxt-link :to="'/exhibitions/' + slides[current].slug" v-if="show" :key="current" :class="'slide ' + displayClass">
        <div class="feature-img">
          <div v-if="slides[current].featuredImage" class="wrap">
            <img v-bind:src="slides[current].featuredImage.node.sourceUrl" alt="">      
          </div>
        </div>
        <div class="lockdown">
            <div class="title" v-html="slides[current].title"></div>
            <ul class="artists" v-if="slides[current].artists && slides[current].artists && slides[current].artists.nodes.length < 3" >
              <li v-for="(artist, index) in slides[current].artists.nodes" v-bind:key="artist.slug+index">{{artist.name}}</li>
            </ul>
            <div class="dates">
              <span v-html="slides[current].ExhibitionFields.startDate" /> — <span v-html="slides[current].ExhibitionFields.endDate" />
            </div>
        </div>   
      </nuxt-link>
    </transition-group>
    <div class="carousel-controls__button prev" aria-label="Previous" @click="slideIt(-1, true)">
      <svg xmlns="http://www.w3.org/2000/svg" width="32.826" height="57.653" viewBox="0 0 32.826 57.653">
        <path id="Path_11" data-name="Path 11" d="M407.739,614.292l-28,26,28,26" transform="translate(-377.739 -611.466)" fill="none" stroke="#b3b3b3" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="4"/>
      </svg>     
    </div>
    <div class="carousel-controls__button next" aria-label="Next" @click="slideIt(1, true)">
      <svg xmlns="http://www.w3.org/2000/svg" width="32.827" height="57.653" viewBox="0 0 32.827 57.653">
        <path id="Path_12" data-name="Path 12" d="M1509.739,666.292l28-26-28-26" transform="translate(-1506.912 -611.466)" fill="none" stroke="#b3b3b3" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="4"/>
      </svg>  
    </div>
  </div>
</template>

<script>
import ExhibitionThumb from '~/components/ExhibitionThumb'

export default {
  props: {
    slides: Array
  },
  data () {
    return {
      cycleSlides: null,
      current: 0,
      direction: 1,
      transitionName: "fade",
      show: false,
      displayClass: "even",
    }
  },
  components: {
    ExhibitionThumb
  },
  methods: {
    startCycle() {
      this.cycleSlides = setInterval(() => {
        this.slideIt(1)
      }, 5000)
    },
    stopCycle() {
      clearInterval(this.cycleSlides)
    },
    slideIt(dir, user) {
      this.direction = dir;
      if (user) {
        this.stopCycle()
      }
      dir === 1
        ? (this.transitionName = "fade")
        : (this.transitionName = "fade")
      var len = this.slides.length;
      this.current = (this.current + dir % len + len) % len
      if (this.current%2 == 0) {
        this.displayClass = "even"
      } else {
        this.displayClass = "odd"
      }
    }    
  },
  mounted() {
    this.startCycle()
    this.show = true
  },
  beforeDestroy() {
    this.stopCycle()
  }
}
</script>


<style lang="scss" scoped>

.carousel-view {
  width: 100%;
  flex-wrap: wrap;  
  position: relative;
  padding-bottom: 39%;
  @include breakpoint(small) {
  padding-bottom: 80%;
  }    

}

  .slide{
    position: relative;
    margin-bottom: $factor * 2.5;
    display: block;
    color: $dark; 
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    text-decoration: none;
    position: absolute;
    top: 0;
    width: 100%;
    &.even {
      flex-direction: row-reverse;
    }
    .feature-img {
      width: 66%;
      transition: all 1.5s ease-out;
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
  }
  .lockdown {
    width: 33%;
    font-size: 1.5rem;
    font-weight: bold;
    align-items: center;
    text-align: center;
    transition: all 1.3s ease-in 0.3s;
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




/*
.slide {
  position: absolute;
  top: 0;
  width: 100%;
  //transition: transform 1.2s ease-in-out;
  display: block;
  color: $dark;
  display: flex;
  text-decoration: none;
  align-items: center;
  justify-content: space-between;
  &:hover {
    .img-wrap .img {
      img {
        //transform: scale(1.03);
      }
    }
  }
  @include breakpoint(small) {
    display: block;
  }  
  .img-wrap {
    width: 67%;
    transition: all 1.5s ease-out;
    @include breakpoint(small) {
      width: 100%;
    }    
    .img {
      padding-bottom: 57%;
      width: 100%;
      position: relative;
      overflow: hidden;
      img {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-color: $dark;
        object-position: center;
        transition: all 0.5s ease-out;
      }   
    }
  }
  .lockup {
    width: 33%;
    transition: all 1.3s ease-in 0.3s;
    background: $light;
    padding: $factor * 0.5;
    font-weight: bold;
    text-align: center;
    h2, h3 {
      font-size: 1.5rem;
    }
    @include breakpoint(small) {
      width: 100%;
    }
    .artists {
      display: block;
    }
    .dates {
      font-weight: 200;
      font-size: 1.2rem;

    }
  }
}
*/


.carousel-controls {
  &__button {
    color: $dark;
    cursor: pointer;
    font-size: 3em;
    position: absolute;
    width: 10%;
    height: 100%;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.6s ease-out;
    opacity: 0;
    &:hover {
      opacity: 1;
      &.prev {
        transform: translateX(0);
      }
      &.next {
        transform: translateX(0);
      }      
    }
    &.prev {
      transform: translateX(10px);
      left: 0;
    }
    &.next {
      transform: translateX(-10px);
      right: 0;
    }
  }
}


 
/* FADE IN */
.fade-enter-active {
  transition: all 0.2s;
  .feature-img {
    opacity: 0;
  }
  .lockdown {
    transform: translateY(5px);
    opacity: 0;
  }    
}
.fade-enter {
  opacity: 0;
}


</style>