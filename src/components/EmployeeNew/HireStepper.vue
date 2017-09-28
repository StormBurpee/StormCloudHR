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
                    v-model="selfservice"
                    :error-messages="checkboxErrors"
                    @change="$v.checkbox.$touch()"
                    @blur="$v.checkbox.$touch()"
                    color="primary"
                    required
                    persistent-hint
                    hint="If this is checked, a link is sent to the employee to finish supplying personal details."
                  ></v-checkbox>
                </v-flex>
              </v-layout>
            </form>
          </template>
        <v-btn primary @click.native="e6 = 2">Continue</v-btn>
      </v-stepper-content>
      <v-stepper-step step="2" v-bind:complete="e6 > 2">Job Details</v-stepper-step>
      <v-stepper-content step="2">
        <template>
            <form>
              <v-layout row wrap>
              <v-flex xs4 class="employee-detail-overview">
              <v-text-field
                label="Job Title"
                v-model="jobtitle"
                @change="$v.select.$touch()"
                @blur="$v.select.$touch()"
                required
              ></v-text-field>
              </v-flex>
              <v-flex xs4 class="employee-detail-overview">
              <v-select
              v-bind:items="locations"
                v-model="location"
                label="Location"
                required
              ></v-select>
              </v-flex>
              <v-flex xs4 class="employee-detail-overview">
              <v-text-field
              label="Department"
              v-model="department"
              @change="$v.select.$touch()"
              @blur="$v.select.$touch()"
              required
              ></v-text-field>
              </v-flex>
              <v-flex xs4 class="employee-detail-overview">
              <v-select
              v-bind:items="employment_types"
              v-model="select"
                label="Employment Type"
                required
              ></v-select>
              </v-flex>
              <v-flex xs4 class="employee-detail-overview">
              <v-select
              v-bind:items="managers"
              v-model="select"
                label="Manager"
                required
              ></v-select>
            </v-flex>
            <v-flex xs4 class="employee-detail-overview">
              <v-select
              v-bind:items="roles"
              v-model="select"
                label="Employee Role"
                required
              ></v-select>
            </v-flex>
            <v-flex xs4 class="employee-detail-overview">
              <v-text-field
                label="Pay Rate"
                v-model="payrate"
                @change="$v.select.$touch()"
                @blur="$v.select.$touch()"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-layout row wrap>
                <v-flex xs5 class="employee-detail-overview">
                <v-select
                v-bind:items="currencies"
                  v-model="select"
                  label="Pay Currency"
                  required
                ></v-select>
                </v-flex>
                <v-flex class="per">/</v-flex>
                <v-flex xs5 class="employee-detail-overview">
                <v-select
                v-bind:items="pay_types"
                  v-model="select"
                  label="Pay Type"
                  required
                ></v-select>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs4></v-flex>
            <v-flex xs4 class="employee-detail-overview">
            <v-select
            v-bind:items="pay_frequency"
              v-model="select"
              label="Pay Frequency"
              required
            ></v-select>
            </v-flex>
            <v-flex xs4></v-flex>
            <v-flex xs4></v-flex>
            <v-checkbox
              label="Commision"
              v-model="commision"
              :error-messages="checkboxErrors"
              @change="$v.checkbox.$touch()"
              @blur="$v.checkbox.$touch()"
              color="primary"
              required
              persistent-hint
              hint="If this is checked, you recieve commision based work."
            ></v-checkbox>
          </v-layout>
            </form>
          </template>
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
import axios from 'axios'

export default {
  name: 'hire-stepper',
  data () {
    return {
      e6: 1,
      selfservice: false,
      commision: false,
      locations: [],
      employment_types: ['Full Time', 'Part Time', 'Casual', 'Temp', 'Intern', 'Volunteer', 'Contractor'],
      managers: [],
      roles: ['Owner', 'Administrator', 'Area Manager', 'Manager', 'Employee'],
      currencies: ['CAD', 'USD', 'EUR', 'GBP', 'AUD', 'JPY', 'BYR', 'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CDF', 'CHF', 'CLF', 'CLP', 'CNY', 'COP', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'FJD', 'FKP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL', 'LVL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SKK', 'SLL', 'SOS', 'SRD', 'SSP', 'STD', 'SVC', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'UYU', 'UZS', 'VEF', 'VND', 'VUV', 'WST', 'XAF', 'XAG', 'XAU', 'XBA', 'XBB', 'XBC', 'XBD', 'XCD', 'XDR', 'XOF', 'XPD', 'XPF', 'XPT', 'xts', 'YER', 'ZAR', 'ZMK', 'ZMW', 'BTC', 'JEP', 'GGP', 'IMP', 'XFU', 'EEK', 'GHS', 'MTL', 'TMM', 'JPY', 'ZWD', 'ZWL', 'ZWN', 'ZWR'],
      pay_types: ['Year', 'Quarter', 'Month', 'Fortnight', 'Week', 'Day', 'Hour'],
      pay_frequency: ['Annually', 'Monthly', 'Semimonthly', 'Biweekly', 'Weekly', 'Daily']
    }
  },
  created () {
    axios.get('http://stormcloudhr.com:3000/locations/' + this.$store.state.company_id).then(resp => {
      for (let i = 0; i < resp.data.locations.length; i++) {
        let location = resp.data.locations[i]
        this.locations.push(location.location_name)
      }
    })
    axios.get('http://stormcloudhr.com:3000/users/managers/' + this.$store.state.company_id).then(resp => {
      for (let i = 0; i < resp.data.managers.length; i++) {
        let manager = resp.data.managers[i]
        this.managers.push(manager.employee.first + ' ' + manager.employee.last)
      }
    })
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss'>
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
.input-group--text-field .input-group__input {
  height: 42px!important;
}
.per {
  height: 70px;
  text-align: center;
  line-height: 70px;
  font-size: 18px;
}
</style>
