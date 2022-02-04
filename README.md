# Creating an App with Nuxt2 and Strapi3 on Uberspace

## Setting up Nuxt on your Local Machine

*first up use `nvm use 14` for Node Version 14*

*change npm to pnpm???*

### Create Nuxt-App

`npm init nuxt-app frontend`
or
`yarn create nuxt-app frontend`

*don't forget to change folder*
`cd frontend`

### Add Strapi Module

`npm install @nuxtjs/strapi@^0.3.1`
or
`yarn add @nuxtjs/strapi@^0.3.1`

### Then, add @nuxtjs/strapi to the modules section of nuxt.config.js:

```javascript
export default {
  modules: ["@nuxtjs/strapi"],
  strapi: {
    url: "http://localhost:1337",
    entities: ["posts"],
  },
};
```
and some server stuff

```js
server: {
  port: 3000,
  host: '0.0.0.0'
},
```

### Add to /frontend/index.vue where `posts` is the collection type Name in Strapi

```vue
<template>
  <div id="app">
    <div v-for="post in posts" :key="post.id">
      {{ post.message }}
    </div>
  </div>
</template>
```
```vue
<script>
export default {
  data() {
    return {
      posts: null,
    };
  },
  async created() {
    this.posts = await this.$strapi.$posts.find();
  },
};
</script>
```

### create `ecosystem.config.js`

```js
module.exports = {
  apps: [
    {
      name: "NuxtApp",
      exec_mode: "cluster",
      instances: "4", // Or a number of instances
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "start",
    },
  ],
};
```

### get Nuxt production ready

`npm run build`

## Create Strapi Backend (version 3.10 ee) NPM (can't get yarn to work...)

*change back to root*
`cd..`

### Get Strapi

`npx create-strapi-app@ee backend`

### visit localhost:1337

- create Collection Type `posts` or whatever you want, don't forget to change the variable in `nuxt.config.js` and `frontend\index.vue`
- create some fields like `messages`
- check user-permissions in Settings in `find` and `findOne`

Should work locally *I hope*

### get Strapi production ready

- create ecofile.system.js in /backend

```js
module.exports = {
  apps: [
    {
      name: 'strapi',
      script: 'pnpm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
      exp_backoff_restart_delay: 100,
    },
  ],
};
```

- `NODE_ENV=production npm run build`
- `NODE_ENV=production npm start`



## Deploy on Uberspace

### login via ssh from terminal

*variables in capital letters are your personal credentials*

- ssh sebahub@SERVERNAME.uberspace.de
- enter your Password

### Use Node version 14

`uberspace tools version use node 14`

### install pm2

`npm install pm2 -g`

### add subdomain

`uberspace web domain add api.sebahub.uber.space`
`uberspace web domain add www.api.sebahub.uber.space`

### add symbolic link for this domain

`cd ~`
`ln -s html/api.sebahub.uber.space api.sebahub.uber.space`
`ln -s html/api.sebahub.uber.space www.api.sebahub.uber.space`

### add port to nginx for Nuxt

`uberspace web backend set / --http --port 3000`

### add port to nginx for Strapi

`uberspace web backend set api.sebahub.uber.space --http --port 1337`

### start Strapi in

`cd \html\api.sebahub.uber.space`
`pm2 start`

### start Nuxt

`cd \html\api.sebahub.uber.space`
`pm2 start`

## Additional Stuff

### wanna use pug and sass for nuxt?

`npm install -D pug pug-plain-loader`
`npm i -D sass-loader@10.1.1 --save-exact && npm i -D sass`