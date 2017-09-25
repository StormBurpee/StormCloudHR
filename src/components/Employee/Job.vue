<template>
  <v-container v-if="employee.first">
    <v-layout row wrap>
      <v-flex xs3 class="employee-detail-overview">
        <v-card class="avatar-card" flat>
          <v-avatar class="blue employee-avatar">
            <span class="white--text headline">{{employee.first.slice(0, 1)}}{{employee.last.slice(0, 1)}}</span>
          </v-avatar>
        </v-card>
        <br>
        <strong class="employee-detail-name">{{employee.first}} {{employee.last}}</strong>
        <div class="user-detail">
          <span class="overview">Location</span><br>
          {{employee.jobdetails.location.location_name}}
        </div>
        <div class="user-detail">
          <span class="overview">Status</span><br>
          {{employee.jobdetails.status}}
        </div>
      </v-flex>
      <v-flex xs9>
        <v-card flat class="employee-card">
          <v-card-title class="title">
            Job Information
          </v-card-title>
          <div class="inner">
            <table class="detail-table">
              <tr>
                <td class="detail">Employment Type:</td>
                <td>{{employee.jobdetails.status}}</td>
              </tr>
              <tr>
                <td class="detail">Job Title:</td>
                <td>{{employee.jobdetails.title}}</td>
              </tr>
              <tr>
                <td class="detail">Location:</td>
                <td>{{employee.jobdetails.location.location_name}}</td>
              </tr>
              <tr>
                <td class="detail">Department:</td>
                <td>{{employee.jobdetails.department}}</td>
              </tr>
              <tr>
                <td class="detail">Manager:</td>
                <td>--</td>
              </tr>
              <tr>
                <td class="detail">Pay Rate:</td>
                <td>${{employee.jobdetails.pay_rate}} {{employee.jobdetails.pay_currency}} / {{employee.jobdetails.pay_type}}</td>
              </tr>
              <tr>
                <td class="detail">Pay Frequency:</td>
                <td>{{employee.jobdetails.pay_frequency ? employee.jobdetails.pay_frequency : "--"}}</td>
              </tr>
              <tr>
                <td class="detail">Commission:</td>
                <td>{{employee.jobdetails.commision == 1 ? "Yes" : "No"}}</td>
              </tr>
              <tr>
                <td class="detail">Bonus Structure:</td>
                <td>{{employee.jobdetails.bonus_structure ? employee.jobdetails.bonus_structure : "--"}}</td>
              </tr>
            </table>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'employee-job',
  data () {
    return {
      employee: {},
      locations: {}
    }
  },
  created () {
    axios.get('http://stormcloudhr.com:3000/employee/' + this.$route.params.id)
    .then(response => {
      // JSON responses are automatically parsed.
      this.employee = response.data.employee[0]
      console.log(this.employee)
    })
    .catch(e => {
      console.log(e)
      // this.errors.push(e)
    })
  }
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

  .employee-card {
    margin-bottom: 50px;
    & .title {
      font-size: 20px;
      font-weight: 600;
      padding: 40px;
      border-bottom: 1px solid #eee;
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
</style>
