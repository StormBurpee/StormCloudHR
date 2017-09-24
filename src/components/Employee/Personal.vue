<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs3 class="employee-detail-overview">
        <v-card class="avatar-card">
          <v-avatar class="blue employee-avatar">
            <span class="white--text headline">FL</span>
          </v-avatar>
        </v-card>
        <br>
        <strong class="employee-detail-name">First Last</strong>
        <div class="user-detail">
          <span class="overview">Location</span><br>
          Propagate(1)
        </div>
        <div class="user-detail">
          <span class="overview">Status</span><br>
          Full Time
        </div>
      </v-flex>
      <v-flex xs9>
        <v-card>
          <v-card-title>
            Basic Information
          </v-card-title>
          <div class="basic-information">

          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'employee-personal'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .employee-detail-overview {
    & .avatar-card {
      padding: 10px;
      width: 170px;
    }
    & .employee-avatar {
      width: 150px!important;
      height: 150px!important;
      text-align: center;
      margin: 0 auto;
      border-radius: 0%;
    }
    & .employee-detail-name {
      font-size: 20px;
      padding-left: 10px;
    }
    & .user-detail {
      margin-top: 10px;
      padding-left: 10px;
      & .overview {
        text-transform: uppercase;
        color: #A1AABC;
        font-size: 12px;
      }
    }
  }
</style>
