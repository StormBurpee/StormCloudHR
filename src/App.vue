<template>
  <div id="app">
    <hr-header></hr-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'app',
  components: {
    'hr-header': Header
  }
}
</script>

<style>
#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 50px;
  max-width: 100vw;
  overflow-x: hidden;
}
body {
  padding: 0px;
  margin: 0px;
  background-color: #f8f8f8;
  max-width: 100vw;
}
.hr-subheader {
  background-color: #4D73E3;
  height: 150px;
  line-height: 140px;
  color: #fff;
  padding: 0px 50px;
}
.view {
  max-width: 100%;
}
</style>
