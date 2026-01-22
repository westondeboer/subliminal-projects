<template>
  <footer v-if="globalContent">
    <div class="container footer-row">
      <div v-if="globalContent" v-html="globalContent.GlobalFields.footerContent" class="address footer-content" />
      <div class="forms">
        <form class="form" v-on:submit.prevent="searchIt">
          <div class="input">
            <input id="search" v-model="inputTerm"  placeholder="search" type="text">
          </div>
          <input type="submit">
        </form>


    <form class="newsletter" action="https://obeygiant.us19.list-manage.com/subscribe/post?u=8f0a9fb5f4fb8db04b8004379&amp;id=3cab23a91b" method="POST" accept-charset="utf-8" target="_blank">
      <div class="newsletter-form-input input">
        <input type="text" name="EMAIL" id="email" class="required email"  placeholder="Email Address">
      </div>
      <input type="hidden" name="list" value="17zwLGUQk8OEGeH763YlIseQ">
      <input type="submit" name="submit" id="submit" value="Subscribe" class="button-standard">
    </form>
      </div>
    </div>
    <div class="container footer-row">
      <ul class="legal-menu">
        <li><nuxt-link to="/terms-of-use">Terms of Use</nuxt-link></li>
        <li><nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link></li>
      </ul>
      <div class="copyright" v-if="globalContent">
        {{globalContent.GlobalFields.footerCopyright}}
      </div>
    </div>
  </footer>  
</template>

<script>
import Logo from '~/components/Logo';
import { gql } from 'nuxt-graphql-request'
const query = gql`
  query GlobalQuery {
    globalContent {
      GlobalFields { 
        footerContent
        footerCopyright
      }
    }
  } 
`
export default {
  data() {
    return {
      inputTerm: null,
      globalContent: null
    }
  }, 
  methods: {
    searchIt() {
      window.scrollTo(0,0)
      this.$router.push("/search/" + this.inputTerm)
      this.inputTerm = null;
    }    
  },
  async fetch() {
    const data = await this.$graphql.default.request(query)
    this.globalContent = data.globalContent;
  }    
}
</script>

<style lang="scss" scoped>

  footer {
    overflow: hidden;
    padding-top: $factor;
    border-top: 2px solid $dark;
    .footer-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: $factor;
      @include breakpoint(small) {
        width: 100%;
        display: block;
      }      
    }
    .address {
      @include breakpoint(small) {
        margin-bottom: $factor;
      }      
    }
    .forms {
      display: flex;
      @include breakpoint(small) {
        width: 100%;
        display: block;
      }        
      form:first-of-type {
        margin-right: $factor;
        @include breakpoint(small) {
          margin-bottom: $factor * 0.25;
        }          
      };
      form {
        display: flex;
      }
      .input {
        margin-right: 5px;
      }
    }
    .copyright, 
    .legal-menu {
      @include type-tiny;
      li {
        margin-right: 10px;
      }
    }
  }
</style>