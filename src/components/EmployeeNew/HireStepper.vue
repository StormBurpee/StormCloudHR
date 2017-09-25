<template>
  <v-container>
    <v-card class="directory">
      <v-stepper v-model="e6" vertical>
        <v-stepper-step step="1" v-bind:complete="e6 > 1">
          Personal Details
        </v-stepper-step>
        <v-stepper-content step="1">
          <template>
      <form>
        <v-layout row wrap>
          <v-flex xs4 class="employee-detail-overview">
              <v-text-field
              label="First Name"
              v-model="fname"
              :error-messages="fnameErrors"
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs4 class="employee-detail-overview">
            <v-text-field
              label="Middle Name"
              v-model="mname"
              :error-messages="mnameErrors"
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs4 class="employee-detail-overview">
            <v-text-field
              label="Last Name"
              v-model="lname"
              :error-messages="lnameErrors"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs4 class="employee-detail-overview">
            <v-text-field
              label="Email"
              v-model="email"
              :error-messages="emailErrors"
              @change="$v.select.$touch()"
              @blur="$v.select.$touch()"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs4 class="employee-detail-overview">
            <v-text-field
              label="Birthday"
              v-model="birth"
              :error-messages="birthErrors"
              @change="$v.select.$touch()"
              @blur="$v.select.$touch()"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 class="employee-detail-overview">
            <v-checkbox
              label="Self Service?"
              v-model="checkbox"
              :error-messages="checkboxErrors"
              @change="$v.checkbox.$touch()"
              @blur="$v.checkbox.$touch()"
              required
            ></v-checkbox>
          </v-flex>
        </v-layout>
      </form>
    </template>
          <v-btn primary @click.native="e6 = 2">Continue</v-btn>
        </v-stepper-content>
        <v-stepper-step step="2" v-bind:complete="e6 > 2">Job Details</v-stepper-step>
        <v-stepper-content step="2">
          <v-card class="grey lighten-1 mb-5" height="200px"></v-card>
          <v-btn primary @click.native="e6 = 3">Continue</v-btn>
          <v-btn flat @click.native="e6 = 1">Go Back</v-btn>
        </v-stepper-content>
        <v-stepper-step step="3" v-bind:complete="e6 > 3">Bank Details</v-stepper-step>
        <v-stepper-content step="3">
          <v-card class="grey lighten-1 mb-5" height="200px"></v-card>
          <v-btn primary @click.native="e6 = 4">Continue</v-btn>
          <v-btn flat @click.native="e6 = 2">Go Back</v-btn>
        </v-stepper-content>
        <v-stepper-step step="4">Finalize</v-stepper-step>
        <v-stepper-content step="4">
          <v-card class="grey lighten-1 mb-5" height="200px"></v-card>
          <v-btn primary @click.native="e6 = 1">Continue</v-btn>
          <v-btn flat @click.native="e6 = 3">Go Back</v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'hire-stepper',
  data () {
    return {
      e6: 1
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.directory {
  margin: 0px 25px;
  margin-top: 25px;
}
.input-group {
  margin-bottom: 10px!important;
}
.employee-detail-overview {
  padding: 0 10px;
}
</style>
