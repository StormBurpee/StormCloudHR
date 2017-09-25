<template>
  <div class="employee-container view">
    <div class="hr-subheader">
      <div class="page-subheader">
        Employee
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
import Personal from '@/components/Employee/Personal'
import Job from '@/components/Employee/Job'

export default {
  name: 'employee',
  data () {
    return {
      tabs: ['Personal', 'Job', 'Time Off', 'Banking', 'Emergency', 'Notes'],
      active: null
    }
  },
  components: {
    'employee-personal': Personal,
    'employee-job': Job
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .employee-tab {
    color: #fff;
  }
</style>
