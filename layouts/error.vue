<template>
    <div class="four-oh-four container">
      <div  class="content formatted-content inner">
        <h1>404</h1>
        <p class="all-caps-header">
          We couldn't find the page you were looking for.
        </p>

        <p>
          You can return to our homepage by <a href="/">clicking here</a>, or you
          can try searching for the content you are seeking by clicking the search
          icon above.
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {},
  };
  </script>
  
  <style lang="scss">
  .four-oh-four {
    width: 100%;
    position: relative;
  
    .inner {
      width: 100%;
      max-width: 900px;
      margin: 0 auto;
      padding: 11.8vw 0 8vw;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
  
      @include breakpoint(small) {
        padding-top: 75px;
      }
  
      ul {
        list-style: disc;
        list-style-position: inside;
        margin-bottom: 2em;
  
        li {
          margin: 1em;
        }
      }
  
      a {
        text-decoration: underline;
      }
    }
  }
  </style>