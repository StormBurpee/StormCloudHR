<template>
  <v-app id="app">
    <div class="checked" v-if="this.$store.state.loginchecked == true">
      <hr-header></hr-header>
      <router-view></router-view>
    </div>
    <div v-else>
      <div class="page-loader">
        <div class="loader-header">
          StormCloudHR
        </div>
        <div class="loader-spinner">
          <v-progress-circular indeterminate class="primary--text"></v-progress-circular>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'app',
  data () {
    return {
      loggedin: true
    }
  },
  components: {
    'hr-header': Header
  },
  watch: {
    '$route' (to, from) {
      this.$store.commit('refreshSession')
    }
  }
}
</script>

<style lang="scss">
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
a {
  //color: inherit!important;
  text-decoration: none;
}
.page-subheader {
  font-size: 36px;
  font-weight: 300;
  padding: 0px;
  margin: 0px;
  color: #fff;
}
.our-primary {
  background-color: #4D73E3!important;
  border-color: #4D73E3!important;
}

.input-group--text-field {
  & label {
    padding: 5px;
  }

  & .input-group__input {
    background-color: #fff;
      border: 1px solid #eee;
      border-radius: 5px;
      padding: 5px;
  }

  & .input-group__details {
    display: none;
  }
}

.input-group--text-field:not(.input-group--single-line).input-group--focused:not(.input-group--textarea) label, .input-group--text-field:not(.input-group--single-line).input-group--placeholder:not(.input-group--textarea) label {
    -webkit-transform: translate3d(0,-25px,0) scale(.75)!important;
    transform: translate3d(0,-25px,0) scale(.75)!important;
}

.page-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 400px;
  text-align: center;
  & .loader-header {
    font-weight: 300;
    font-size: 30px;
    margin-bottom: 20px;
  }
}
</style>
