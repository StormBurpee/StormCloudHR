<template>
  <div class="employee-container view" v-if="this.$store.state.loggedin">
    <div class="hr-subheader">
      <div class="page-subheader">

        <v-menu bottom right>
          <div slot="activator">Employees</div>
          <v-list class="dropdown-list">
            <v-list-tile @click="" v-for="employee in employees">
              <router-link :to="employee.url"><v-list-tile-title>{{employee.first}} {{employee.last}}</v-list-tile-title></router-link>
            </v-list-tile>
            </v-list-tile>
          </v-list>
          </v-menu>
      </div>
    </div>
    <div class="employee-directory-main">

      <v-tabs dark v-model="active">
        <v-tabs-bar class="our-primary employee-tab">
          <v-tabs-item
            v-for="tab in tabs"
            :key="tab"
            :href="'#' + tab"
            ripple
          >
            {{ tab }}
          </v-tabs-item>
          <v-tabs-slider class="yellow"></v-tabs-slider>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content
            key="Personal"
            id="Personal"
          >
            <employee-personal></employee-personal>
          </v-tabs-content>
          <v-tabs-content
            key="Job"
            id="Job"
          >
            <employee-job></employee-job>
          </v-tabs-content>
          <v-tabs-content
            key="Time Off"
            id="Time Off"
          >
            <v-card flat>
              <v-card-text>TimeOff</v-card-text>
            </v-card>
          </v-tabs-content>
          <v-tabs-content
            key="Banking"
            id="Banking"
          >
            <v-card flat>
              <v-card-text>Banking</v-card-text>
            </v-card>
          </v-tabs-content>
          <v-tabs-content
            key="Emergency"
            id="Emergency"
          >
            <v-card flat>
              <v-card-text>Emergency</v-card-text>
            </v-card>
          </v-tabs-content>
          <v-tabs-content
            key="Notes"
            id="Notes"
          >
            <v-card flat>
              <v-card-text>Notes</v-card-text>
            </v-card>
          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Personal from '@/components/Employee/Personal'
import Job from '@/components/Employee/Job'

export default {
  name: 'employee',
  data () {
    return {
      tabs: ['Personal', 'Job', 'Time Off', 'Banking', 'Emergency', 'Notes'],
      active: null,
      employees: []
    }
  },
  components: {
    'employee-personal': Personal,
    'employee-job': Job
  },
  created () {
    this.$store.commit('checkLogin')
    axios.get('http://stormcloudhr.com:3000/employees/' + this.$store.state.company_id)
    .then(response => {
      // JSON responses are automatically parsed.
      this.employees = []
      for (var i = 0; i < response.data.employees.length; i++) {
        let employee = response.data.employees[i]
        this.employees.push({
          url: '/employee/' + employee.id,
          last: employee.last,
          first: employee.first,
          title: employee.jobdetails.title,
          location: employee.jobdetails.location.location_name,
          status: employee.jobdetails.status
        })
      }
    })
    .catch(e => {
      console.log(e)
      // this.errors.push(e)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .employee-tab {
    color: #fff;
  }

  .dropdown-list {
    & a {
      color: #212121;
    }
  }
</style>
