<template>
  <v-container v-if="employee.first">
    <v-layout row wrap>
      <v-flex xs3 class="employee-detail-overview">
        <v-card class="avatar-card" flat>
          <v-avatar class="blue employee-avatar">
            <span class="white--text headline">FL</span>
          </v-avatar>
        </v-card>
        <br>
        <strong class="employee-detail-name">{{employee.first}} {{employee.last}}</strong>
        <div class="user-detail">
          <span class="overview">Location</span><br>
          {{employee.jobdetails.location}}
        </div>
        <div class="user-detail">
          <span class="overview">Status</span><br>
          {{employee.jobdetails.status}}
        </div>
      </v-flex>
      <v-flex xs9>
        <v-card flat class="employee-card">
          <v-card-title class="title">
            Basic Information
          </v-card-title>
          <div class="inner">
            <table class="detail-table">
              <tr>
                <td class="detail">First Name:</td>
                <td>{{employee.first}}</td>
              </tr>
              <tr>
                <td class="detail">Middle Name:</td>
                <td>{{employee.middle}}</td>
              </tr>
              <tr>
                <td class="detail">Last Name:</td>
                <td>{{employee.last}}</td>
              </tr>
              <tr>
                <td class="detail">Gender:</td>
                <td>{{employee.gender == 1 ? "Male" : "Female"}}</td>
              </tr>
              <tr>
                <td class="detail">Birthdate:</td>
                <td>{{employee.birthday}}</td>
              </tr>
            </table>
          </div>
        </v-card>

        <v-card flat class="employee-card">
          <v-card-title class="title">
            Address
          </v-card-title>
          <div class="inner">
            <table class="detail-table">
              <tr>
                <td class="detail">Address Line 1:</td>
                <td>-</td>
              </tr>
              <tr>
                <td class="detail">Address Line 2:</td>
                <td>-</td>
              </tr>
              <tr>
                <td class="detail">Country:</td>
                <td>-</td>
              </tr>
              <tr>
                <td class="detail">State/Province:</td>
                <td>-</td>
              </tr>
              <tr>
                <td class="detail">City:</td>
                <td>-</td>
              </tr>
              <tr>
                <td class="detail">Postal Code:</td>
                <td>-</td>
              </tr>
            </table>
          </div>
        </v-card>

        <v-card flat class="employee-card">
          <v-card-title class="title">
            Contact Information
          </v-card-title>
          <div class="inner">
            <table class="detail-table">
              <tr>
                <td class="detail">Work Email:</td>
                <td>-</td>
              </tr>
              <tr>
                <td class="detail">Personal Email:</td>
                <td>{{employee.email}}</td>
              </tr>
              <tr>
                <td class="detail">Work Phone:</td>
                <td>-</td>
              </tr>
              <tr>
                <td class="detail">Mobile Phone:</td>
                <td>{{employee.phone}}</td>
              </tr>
            </table>
          </div>
        </v-card>

        <v-card flat class="employee-card">
          <v-card-title class="title">
            Custom Fields
          </v-card-title>
          <div class="inner">
            <table class="detail-table">
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
  name: 'employee-personal',
  data () {
    return {
      employee: {}
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
