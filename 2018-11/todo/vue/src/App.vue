<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import 'normalize.css';

import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style lang="less">
html {
    // default root font size: 16px. So 1rem equals 10px
    font-size: 62.5%;
    color: #333;
}
body {
    font-size: 16px;
}
* {
    box-sizing: border-box;
}
</style>
