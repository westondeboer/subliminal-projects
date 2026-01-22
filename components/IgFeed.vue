<template lang="html">
    <div>
        <h3>
            <span>Instagram Feed</span>
        </h3>
        <div class="instagram-feed">
            <a class="item" v-for="item in posts.slice(0,4)" v-bind:key="item.node.id" v-bind:href="'https://www.instagram.com/p/' + item.node.shortcode" target="_blank">
                <FadeImage v-bind:src="item.node.thumbnail_src" v-bind:alt="item.node.accessibility_caption" />
            </a>
        </div>
    </div>    
</template>

<script>
import FadeImage from '~/components/FadeImage'

export default {
    components: {
        FadeImage
    },
    props: {
        username: {
            type: String,
            default: "subliminalprojects"
        }
    },
    data() {
        return {
            posts: [],
        }
    },
    async fetch() {
        // Abort if no username set
        if (!this.username) {
            return
        }
        // Get Instagram data using the unoffical website API
        const igData = await fetch(
            `https://www.instagram.com/${this.username}/?__a=1`
        )
            .then(response => response.json())
            .then(data => data)
            .catch(error => {
                console.error("Instagram Fetch Error:", error)
            })
            console.log("IG DATA", igData.graphql.user.edge_owner_to_timeline_media.edges)
            this.posts = igData.graphql.user.edge_owner_to_timeline_media.edges;
    },
    fetchOnServer: false
}
</script>

<style lang="scss" scoped>
h3 {
    text-align: center;
    position: relative;
    padding: 20px 0;
    &:before {
        content: '';
        border-top: 2px solid $dark;
        position: absolute;
        top: 26px;
        width: 100%;
        left: 0;
        z-index: -1;
    }
    span {
        background: $light;
        padding: 10px;
        font-size: 1.2em;
        text-transform: uppercase;

        //display: inline-block;
    }
}
.instagram-feed {
    display: flex;
    flex-wrap: flex;
    justify-content: space-between;
    .item {
        width: 23%;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>