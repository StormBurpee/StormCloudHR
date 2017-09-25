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
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 class="employee-detail-overview">
              <v-text-field
              label="Password"
              type="password"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 class="employee-detail-overview login-btn">
            <v-btn class="blue white-font" block>Login</v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'login',
  title () {
    return 'StormCellHR - Login'
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
