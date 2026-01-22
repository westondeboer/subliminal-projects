<template>
  <div>
    <div class="header-push"></div>
    <Header />
    <div class="page-wrapper">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header';
import Footer from '~/components/Footer';

export default {
  components: {
    Header,
    Footer
  },  
}
</script>


<style lang="scss" scoped>
  .header-push {
    padding-top: 105px;
    @include breakpoint(small) {
      padding-top: 78px;
    }
  }
  .page-wrapper {
    min-height: 100vh;
    position: relative;
    width: 100%;
    overflow-x: hidden;
  }
</style>