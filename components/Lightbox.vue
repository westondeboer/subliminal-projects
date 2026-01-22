<template>
  <div class="lightbox"
      v-on:keyup.left="prev"
      v-on:keyup.right="next"
      v-on:keyup.down="close"
      v-on:keyup="(a) => {
        console.log('LIGHTBOX KEY', a);
      }"
  >
    <a class="close" @click="close">Close</a>
    <div :class="'image '+ swipeClass"
      ref="lightboxImg"
      @click="next"
      v-touch:start="touchStart"
      v-touch:moving="touchMove"
      v-touch:end="touchEnd"
    >
      <FadeImage v-if="url" v-bind:src="url" />
    </div>
    <div class="controls">
      <div @click="prev" :class="(prevIndex != null) ? 'active prev' : 'prev'">Prev</div>
      <div @click="next" :class="(nextIndex != null) ? 'active next' : 'next'">Next</div>
    </div>
  </div>  
</template>

<script>
import FadeImage from '~/components/FadeImage'

export default {
  props: {
    startingIndex: Number,
    imageArray: Array
  },
  data() {
    return {
      currentIndex: null,
      theLightbox: null,
      url: null,
      prevIndex: null,
      nextIndex: null,
      swipeData: {},
      swipeClass: null,
    }
  },
  components: {
    FadeImage
  },
  mounted() {
    this.updateLightbox(this.startingIndex)
      window.addEventListener('keyup', event => {
        if (event.keyCode === 37) { 
          this.prev()
        }
        if (event.keyCode === 39) { 
          this.next()
        }  
        if (event.keyCode === 40 || event.keyCode == 27) { 
          this.close()
        }            
      })
  },
  methods: {
    touchStart(a) {
      if (a.changedTouches) {
        this.swipeData.startX = a.changedTouches[0].clientX
        this.swipeData.startY = a.changedTouches[0].clientY
      }
    },
    touchMove(a) {
      if (a.changedTouches) {
        const movedX = a.changedTouches[0].clientX
        const movedY = a.changedTouches[0].clientY
        const deltaX = movedX - this.swipeData.startX
        const deltaY = movedY - this.swipeData.startY
        if (Math.abs(deltaX) > 30) {
          if (deltaX > 0) {
            if(this.prevIndex != null) {
              this.swipeClass = "right"
            } else {
              this.swipeClass = "naw"
            }
          } else {
            if(this.nextIndex) {
              this.swipeClass = "left"
            } else {
              this.swipeClass = "naw"
            }
          }
        } else if (Math.abs(deltaY) > 80) {
          if (deltaY > 0) this.swipeClass = "down"
          else this.swipeClass = "up"
        } else {
          this.swipeClass = null
        }
      }
    },
    touchEnd() {

      if (this.swipeClass == "left") {
        this.next()
      }

      if (this.swipeClass == "right") {
        this.prev()
      }

      if (this.swipeClass == "down") {
        this.close()   
      }      
      this.swipeClass = null
      this.swipeData = {}
    },   
    close() {
      this.$emit('closeLightbox', true)
    },
    prev() {
      if(this.prevIndex != null) {
        this.updateLightbox(this.prevIndex)
      }       
    },
    next() {
      if(this.nextIndex) {
        this.updateLightbox(this.nextIndex)
      }      
    },
    updateLightbox(index) {

      if (index == 0) {
        this.prevIndex = null
      } else {
        this.prevIndex = index-1
      }

      if (index == this.imageArray.length - 1) {
        this.nextIndex = null
      } else {
        this.nextIndex = index+1
      }

      const imageSizeArray = this.imageArray[index].mediaDetails.sizes
      this.url = null

      if (imageSizeArray) {
        imageSizeArray.forEach(size => {
          if (size.name == 'large') {
            this.url = size.sourceUrl
          } else {
            this.url = this.imageArray[index].sourceUrl
          } 
        })       
      } else {
        this.url = this.imageArray[index].sourceUrl
      }
    }
  }
}

/* 
TODO: maybe remove Vue2TouchEvents and just use event listners
TODO: Do data wrangling in parent component, right now we're looking for large version of the thumb here: imageSizeArray
TODO: add alt text and caption
*/
</script>


<style lang="scss" scoped>
  $swipeMove: 55px;
  .lightbox {
    position: fixed;
    z-index: 100000;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: $light;
    overflow: hidden;
    .image {
      &.down img {
        transform: scale(0.9) translateY($swipeMove) translatex(0px);
      }
      &.left img {
        transform: scale(0.96) translateY(0px) translateX(-$swipeMove);
      }  
      &.right img {
        transform: scale(0.96) translateY(0px) translateX($swipeMove);
      }
      &.naw img {
        opacity: 0.2;
      }                  
    }
    img {
      top: 5vw;
      bottom: 5vw;
      left: 5vw;
      right: 5vw;
      height: calc(100vh - 10vw);
      width: calc(100vw - 10vw);
      object-fit: contain;
      position: absolute;
      transition: all 0.2s ease-in;
      transform: scale(1) translateY(0px);
      transform-origin: center center;      
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
        cursor: not-allowed;
        opacity: 0.9;
        &.active {
          opacity: 1;
          cursor: pointer;
        }
      }
    }
  }
</style>