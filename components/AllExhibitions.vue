<template>
  <div class="all-exhibitions" v-if="exhibitions">
    <!-- <div class="page-title">
        <h1>All Exhibitions</h1>
      </div> -->
    <div class="container grid">
      <ExhibitionThumb
        class="past-exhibition"
        v-for="item in exhibitions"
        v-bind:key="item.node.slug"
        v-bind:exhibition="item.node"
      />
    </div>
    <div class="pagination">
      <div v-if="pageInfo && pageInfo.hasNextPage" class="load-more">
        <div v-if="$fetchState.pending" class="loading">Loading...</div>
        <div v-else @click="fetchMore()" class="primary-button">Load More</div>
      </div>
      <div v-else class="all-loaded">
        <div v-if="exhibitions.length == 0" class="none-found">
          Sorry, we couldn't find any articles matching this criteria.
        </div>
        <div v-else>
          All {{ exhibitions.length }} exhibition<span
            v-if="exhibitions.length > 1"
            >s</span
          >
          loaded
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { gql } from "nuxt-graphql-request";
import ExhibitionThumb from "~/components/ExhibitionThumb";
const exhibitions_per_load = 30;
const query = gql`
  query L8estPosts($first: Int, $after: String) {
    exhibitions(first: $first, after: $after) {
      edges {
        node {
          slug
          title
          featuredImage {
            node {
              sourceUrl(size: MEDIUM)
              altText
              srcSet(size: MEDIUM)
              mediaDetails {
                width
                height
              }
            }
          }
          exhibitionCategories {
            nodes {
              slug
              name
            }
          }
          artists {
            nodes {
              name
              slug
            }
          }
          ExhibitionFields {
            startDate
            endDate
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
export default {
  components: {
    ExhibitionThumb
  },
  data() {
    return {
      exhibitions: null,
      pageInfo: null
    };
  },
  methods: {
    async fetchMore() {
      const variables = {
        first: exhibitions_per_load,
        after: this.pageInfo.endCursor
      };
      const data = await this.$graphql.default.request(query, variables);
      this.exhibitions = [...this.exhibitions, ...data.exhibitions.edges];
      this.pageInfo = data.exhibitions.pageInfo;
    }
  },
  async fetch() {
    const variables = {
      first: exhibitions_per_load,
      after: null
    };
    const data = await this.$graphql.default.request(query, variables);
    this.exhibitions = data.exhibitions.edges;
    this.pageInfo = data.exhibitions.pageInfo;
  }
};
</script>

<style lang="scss" scoped>
.all-exhibitions {
  //padding: $factor * 2
}
.page-title {
  text-align: center;
}
.exhibition-thumb {
  position: relative;
}
.exhibition-thumb,
.past-exhibition {
  @include thirds;
  @include breakpoint(small) {
    margin-bottom: 1em;
  }
}
</style>