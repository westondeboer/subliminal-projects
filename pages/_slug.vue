<template>
  <div>
    <div v-if="page" class="container">
      <h1>{{ page.title }}</h1>
      <div class="content formatted-content" v-html="page.content" />
    </div>
  </div>
</template>
<script>
import FadeImage from '~/components/FadeImage'
import { gql } from 'nuxt-graphql-request'
import meta, { metaGql } from '~/plugins/meta.js'
const gql_content = `
  id
  title
  ${metaGql}
  content(format: RENDERED)
  featuredImage {
    node {
      sourceUrl(size: LARGE)
      srcSet(size: LARGE)
      altText
    }
  }
`
export default {
  components: {
    FadeImage
  },
  head() {
    if (this.page && this.page.seo) {
      return {
        title: this.page.seo.title,
        meta: meta(this.page.seo)
      }
    }
  },
  async asyncData({ $graphql, route, $router, error }) {
    const post_uri = route.params.slug;
    const is_preview = (route.query && route.query.preview) ? true : false;

    const query = gql`
      query PageQuery($uri: ID = "", $asPreview: Boolean = false) {
        page(id: $uri, asPreview: $asPreview, idType: URI) {
          ${gql_content}
        }
      }
    `;
    const variables = { uri: post_uri, asPreview: is_preview };

    let { page } = await $graphql.default.request(query, variables);
    if (is_preview && page.preview) {
      page = page.preview.node;
    }
    if (page == null) {
      error({ statusCode: 404, message: "Page Not Found" });
    }
    return { page };
  }
}
</script>
<style lang="scss" scoped>
section {
  margin-bottom: $factor;
}

.hero {
  align-items: center;
  margin-bottom: $factor * 2;
  justify-content: space-between;

  .quote-wrap {
    width: 47%;
    font-size: 2vw;
    line-height: 1.5em;
    font-weight: bold;
    position: relative;
    text-align: justify;

    @include breakpoint(small) {
      width: 100%;
      margin-bottom: $factor;
      font-size: 2em;
    }

    .quote {
      padding-top: 2em;
      margin-bottom: $factor * 0.5;

      &:before {
        content: "\201C";
        font-size: 3em;
        position: absolute;
        margin-top: -30px;
      }

      &:after {
        content: "\201D";
      }
    }
  }

  .img {
    width: 50%;
    padding-bottom: 50%;
    position: relative;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @include breakpoint(small) {
      width: 100%;
    }
  }
}

.about {
  font-size: 1.2em;
  margin-bottom: $factor * 2;
  text-align: justify;

}

.contact {
  justify-content: space-between;

  .contact-deets {

    h5,
    .email {
      font-size: 1.2em;

      a {
        color: $dark;
      }
    }

    h5 {
      text-transform: uppercase;
      margin-bottom: $factor * 0.25;
    }

    @include breakpoint(small) {
      margin-bottom: $factor;
    }
  }

  .collabs {
    text-align: left;

    .icons {
      display: flex;
      align-items: center;
      margin-top: $factor * 0.25;

      li {
        a {
          display: block;
        }
      }

      img {
        width: 60px;
        display: block;
      }
    }
  }
}
</style>