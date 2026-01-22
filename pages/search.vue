<template>
  <div id="page-search" class="container">
    <div class="search-header">
      <form class="form" v-on:submit.prevent="getResults">
        <div class="input">
          <input id="search-page-form" v-model="inputTerm" :placeholder="(this.$route.params.term) ? this.$route.params.term : 'search...'" type="text">
        </div>
        <input type="submit">
      </form>
    </div>
    <NuxtChild v-if="$route.params.term" :key="$route.params.term" />
  </div>
</template>

<script>

export default {
  data() {
    return {
      inputTerm: null,
      submitTerm: null
    }
  },

  head () {
    return {
      title: 'Subliminal Projects Search: ' + this.submitTerm,
    }    
  },

  methods: {
    getResults() {
      this.submitTerm = this.inputTerm
      this.$router.push("/search/" + this.submitTerm)
      console.log('lets go, ', this.submitTerm,  this.$route.params.term,  this.$route.params);      
    }
  }
}
</script>

<style lang="scss" scoped>
  #search-page {
    text-align: center;
  }
  .search-header {
  }
  form {
    display: flex;
    justify-content: center;
    margin: $factor * 2 auto;
    input {
      font-size: 2em;
    }
  }  
</style>