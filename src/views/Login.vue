<template>
  <div class="login-container view">
    <v-card class="login-main">
      <v-card-title class="title">
        Sign Into StormCloudHR
      </v-card-title>
      <div class="inner login-body">
        <v-layout row wrap>
          <v-flex xs12 class="employee-detail-overview">
              <v-text-field
              label="Email"
              v-model="email"
              type="email"
              required
              @keyup.enter.native="login()"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 class="employee-detail-overview">
              <v-text-field
              label="Password"
              type="password"
              v-model="password"
              required
              @keyup.enter.native="login()"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 class="employee-detail-overview login-btn">
            <v-btn class="blue white-font" block v-on:click="login()">Login</v-btn>
          </v-flex>
          <v-flex xs12 class="employee-detail-overview" v-if="error">
            <v-alert error value="true">
              {{errormsg}}
            </v-alert>
          </v-flex>
        </v-layout>
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  title () {
    return 'StormCellHR - Login'
  },
  data () {
    return {
      email: '',
      password: '',
      error: false,
      errormsg: ''
    }
  },
  created () {
    if (this.$store.state.loggedin) {
      this.$router.push('/employees')
    }
  },
  methods: {
    login () {
      axios.post('http://stormcloudhr.com:3000/user/login', {email: this.email, password: this.password})
      .then(response => {
        let user = response.data
        if (user.error && user.error === 1) {
          this.error = true
          this.errormsg = user.error_msg
        } else {
          this.error = false
          this.errormsg = ''
          this.$store.commit('login', user)
          this.$router.push('/employees')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .login-main {
    margin-bottom: 50px;
    width: 100%;
    margin: 0 auto;
    max-width: 400px;
    margin-top: 50px;
    & .login-btn {
      margin-top: 20px;
      text-align: center;
    }
    & .title {
      font-size: 20px;
      font-weight: 600;
      padding: 30px 40px;
      border-bottom: 1px solid #eee;
      text-align: center;
    }
    & .inner {
      padding: 20px 40px;
    }

    & .detail-table {
      & tr {
        & td {
          padding: 10px 0px;

          &.detail {
            padding-right: 50px;
          }
        }
      }
    }
  }

  .white-font {
    color: #fff!important;
  }
</style>
