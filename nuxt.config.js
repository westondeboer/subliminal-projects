export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  //mode: process.env.NUXT_MODE,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "static",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: "Subliminal Projects - Art Gallery Los Angeles - Shepard Fairey",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Subliminal Projects - Art Gallery Los Angeles - Shepard Fairey"
      },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "Subliminal Projects - Art Gallery Los Angeles - Shepard Fairey"
      }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://use.typekit.net/ust4ikr.css"
      }
      //
    ],
    script: [
      {
        src: `https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js`,
        body: true
      }
    ]
  },
  /*
   ** Global CSS
   */

  styleResources: {
    scss: ["~/styles/resources/resources.scss"]
  },
  css: ["~/styles/global.scss"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  pageTransition: {
    name: "fade"
    // mode: '',
    // beforeEnter (el) {
    //   console.log('Before enter...');
    // }
  },
  plugins: [{ src: "~/plugins/vue-touch", ssr: false }],

  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */

  buildModules: [
    "@nuxtjs/style-resources",
    "@nuxtjs/google-analytics",
    "nuxt-graphql-request"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/pwa"],
  graphql: {
    clients: {
      default: {
        endpoint: process.env.WP_GRAPHQL_ENDPOINT
      }
    },
    useFetchPolyfill: true,
    includeNodeModules: true
  },
  generate: {
    fallback: true,
    interval: 50,
    concurrency: 10
  },

  googleAnalytics: {
    id: "UA-75388-5"
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {}
  // server: {
  //   port: 8000, // default: 3000
  //   host: '0.0.0.0', // default: localhost
  // },
};
