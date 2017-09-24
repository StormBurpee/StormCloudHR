<template>
  <v-stepper v-model="e6" vertical>
    <v-stepper-step step="1" v-bind:complete="e6 > 1">
      Personal Details
    </v-stepper-step>
    <v-stepper-content step="1">
      <template>
  <form>
    <v-text-field
      label="First Name"
      v-model="fname"
      :error-messages="fnameErrors"
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
      required
    ></v-text-field>
    <v-text-field
      label="Last Name"
      v-model="lname"
      :error-messages="lnameErrors"
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
      required
    ></v-text-field>
    <v-text-field
      label="Email"
      v-model="email"
      :error-messages="emailErrors"
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
      required
    ></v-text-field>
    <v-text-field
      label="Birthday"
      v-model="birth"
      :error-messages="birthErrors"
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
      required
    ></v-text-field>
    <v-select
          v-bind:items="items"
          v-model="select"
          label="Gender"
          :error-messages="errors.collect('select')"
          v-validate="'required'"
          data-vv-name="select"
          required
    ></v-select>
    <v-checkbox
      label="Self Service?"
      v-model="checkbox"
      :error-messages="checkboxErrors"
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
      required
    ></v-checkbox>
  </form>
</template>
      <v-btn primary @click.native="e6 = 2">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>
    <v-stepper-step step="2" v-bind:complete="e6 > 2">Job Details</v-stepper-step>
    <v-stepper-content step="2">
      <v-card class="grey lighten-1 mb-5" height="200px"></v-card>
      <v-btn primary @click.native="e6 = 3">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>
    <v-stepper-step step="3" v-bind:complete="e6 > 3">Bank Details</v-stepper-step>
    <v-stepper-content step="3">
      <v-card class="grey lighten-1 mb-5" height="200px"></v-card>
      <v-btn primary @click.native="e6 = 4">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>
    <v-stepper-step step="4">Finalize</v-stepper-step>
    <v-stepper-content step="4">
      <v-card class="grey lighten-1 mb-5" height="200px"></v-card>
      <v-btn primary @click.native="e6 = 1">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
export default {
  name: 'hire-stepper'
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
</style>
