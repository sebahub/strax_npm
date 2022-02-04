<template>
  <div id="app">
    <h1>This is Nuxt</h1>
    <div v-for="post in posts" :key="post.id">
      {{ post.message }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: null,
      weeds: null
    };
  },
  async created() {
    this.posts = await this.$strapi.$posts.find();
  },
};
</script>