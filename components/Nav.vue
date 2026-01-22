<template>
  <nav :class="'main-nav main-nav--' + ' ' + isVisible + ' ' + isSticky + ' ' + isStickyVisible">
    <div class="logo" v-on:click="close">
      <nuxt-link to="/" tabindex="0">
        <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55">
          <path fill="#fff" d="M27.5,55h0L8.054,46.945,0,27.5,8.054,8.054,27.5,0,46.945,8.054,55,27.5,46.945,46.945,27.5,55ZM40.252,19.98c-3.313,0-5.54,1.867-5.54,4.647a4.245,4.245,0,0,0,2.174,3.6,4.116,4.116,0,0,0-2.62,3.607c0,2.557,2.272,4.083,6.079,4.083,3.292,0,5.774-2.028,5.774-4.718,0-1.771-.948-3.062-2.984-4.062,1.732-.861,2.538-1.934,2.538-3.38C45.674,21.534,43.444,19.98,40.252,19.98ZM12.517,25.333l0,0,8.286,10.219h2.5V24.923c0-2.163.091-2.922,1.878-3.143l.192-.023V20.344H19v1.418l.2.019c2.027.192,2.383,1.166,2.383,3.142v4.684l-7.51-9.264H8.565v1.433l.213.005c1.768.043,2.011.936,2.011,1.9v7.164c0,2.222-.28,2.946-2.03,3.143l-.194.022V35.42H14.92V34l-.2-.018c-1.9-.178-2.206-.9-2.206-3.143V25.333ZM26.6,29.721h0l-.62.906,2.287,2.614a1.392,1.392,0,0,0,1,.6,1.412,1.412,0,0,0,1-.6l2.285-2.612-.6-.91-2.689,1.734L26.6,29.721Zm2.671-7.667c-2.284,0-3.759,1.343-3.759,3.423S26.985,28.9,29.269,28.9s3.759-1.344,3.759-3.424S31.553,22.054,29.269,22.054ZM40.2,34.277a2.643,2.643,0,0,1-2.748-2.654A3.123,3.123,0,0,1,38.7,29.111a2.611,2.611,0,0,0,.363.122c2.659.9,3.557,1.622,3.557,2.858A2.123,2.123,0,0,1,40.2,34.277ZM29.269,27.248c-1.16,0-1.333-1.11-1.333-1.772,0-1.175.448-1.771,1.333-1.771,1.159,0,1.332,1.11,1.332,1.771C30.6,26.652,30.153,27.248,29.269,27.248Zm12.071-.81h0c-2.277-.848-3.248-1.706-3.248-2.868a1.837,1.837,0,0,1,2-1.949,2.225,2.225,0,0,1,2.443,2.255,3.063,3.063,0,0,1-1.19,2.562Z" />
        </svg>
      </nuxt-link>
    </div>
    <ul class="buttons">
      <li v-on:click="close"><nuxt-link to="/exhibitions" exact tabindex="0">Exhibitions</nuxt-link></li>
      <li v-on:click="close"><nuxt-link to="/info" exact tabindex="0">Info</nuxt-link></li>
      <li v-on:click="close"><nuxt-link to="/artists" exact tabindex="0">Artists</nuxt-link></li>      
    </ul>
    <div class="burger-btn" v-on:click="toggle"><div></div><div></div><div></div></div>
    <div class="close-btn" v-on:click="toggle"></div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      sticky: false,
      stickyVisible: false,
      prevScrollPos: 0,
      currScrollPos: 0
    };
  },
  computed: {
    isVisible () {
      if (this.open) {
        return 'open'
      } else {
        return ''
      }
    },
    isSticky () {
      if (this.sticky) {
        return 'sticky'
      } else {
        return ''
      }
    },
    isStickyVisible () {
      if (this.stickyVisible) {
        return 'sticky-visible'
      } else {
        return ''
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', () => this.onPageScroll())
  },
  methods: {
    toggle: function() {
      this.open = !this.open
    },
    close: function () {
      this.open = false
    },
  }
}
</script>

<style lang="scss" scoped>
  .main-nav {
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: 100%;
    z-index: 1000;

    @include breakpoint(medium) {
      position: fixed;
      height: 80px;
      background-color: transparent;
      transition: all 0.25s;
    }

    .logo {
      position: relative;
      left: 24px;
      top: 16px;
      width: 55px;

      a {
        svg {
          width: 55px;
          height: 55px;

          @include breakpoint(medium) {
            width: 49px;
            height: 49px;
          }
        }
      }

      @include breakpoint(medium) {
        width: 49px;
        height: 49px;
      }

      @include breakpoint(small) {
        left: 5vw;
      }
    }

    .buttons {
      position: relative;
      display: flex;
      list-style: none;
      right: 40px;

      @include breakpoint(medium) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        flex-direction: column;
        background-color: black;
        padding-top: 110px;
        padding-bottom: 70px;
        z-index: -1;
        display: none;
      }

      li {

        a {
          position: relative;
          display: block;
          padding: 27px 45px;
          font-size: 20rem;
          color: $white;

          @include breakpoint(medium) {
            font-size: 29rem;
            padding: 10px 45px;
          }

          &:hover, &:focus {
            &:after {
              transform: scaleX(1);
            }
          }

          &:after {
            content: '';
            display: block;
            position: relative;
            top: 2px;
            width: 100%;
            height: 2px;
            background-color: white;
            transform: scaleX(0);
            transform-origin: left;
            transition: 0.5s all;

            @include breakpoint(medium) {
              display: none;
            }
          }

          &.nuxt-link-active {
            &:after {
              transform: scaleX(1);
            }
          }
        }
      }
    }

    .burger-btn {
      display: none;
      flex-direction: column;
      justify-content: space-between;
      position: absolute;
      top: 26px;
      right: 15px;
      width: 50px;
      height: 34px;
      cursor: pointer;

      @include breakpoint(medium) {
        display: flex;
      }

      > div {
        width: 100%;
        height: 5px;
        background-color: $white;
      }
    }

    .close-btn {
      display: none;
      position: absolute;
      top: 26px;
      right: 15px;
      width: 50px;
      height: 34px;
      cursor: pointer;

      &:before, &:after {
        content: '';
        display: block;
        position: absolute;
        width: 80%;
        height: 4px;
        background-color: $white;
        transform: rotate(45deg);
        top: 50%;
        left: 60%;
        margin-top: -2px;
        margin-left: -25px;
      }

      &:after {
        transform: rotate(-45deg);
      }
    }

    &--black {
      .logo svg path {
        fill: $black;
      }

      .buttons li a {
        color: $black;

        &:after {
          background-color: black;
        }
      }

      .burger-btn {
        > div {
          background-color: $black;
        }
      }
    }

    &.sticky {
      @include breakpoint(medium) {
        transform: translateY(-80px);
        background-color: $white;
        transition: all 0.25s;

        .logo svg path {
          fill: $black;
          transition: all 0.25s;
        }

        .buttons li a {
          color: $black;
          transition: all 0.25s;

          &:after {
            background-color: black;
            transition: all 0.25s;
          }
        }

        .burger-btn {
          > div {
            background-color: $black;
            transition: all 0.25s;
          }
        }
      } 
    }

    &.sticky-visible {
      transform: translateY(0px);
    }

    &.open {
      @include breakpoint(medium) {
        position: fixed;
        height: 100vh !important;
        background-color: $white;

        .logo svg path {
          fill: $white;
        }

        .buttons {
          display: flex;

          li {
            a {
              color: $white;

              &:after {
                background-color: $white;
              }
            }
          }
        }

        .burger-btn {
          display: none;
        }

        .close-btn {
          display: block;
        }
      } 
    }
  }

</style>