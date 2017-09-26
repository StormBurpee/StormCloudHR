<template>
  <div class="home-container view" v-if="this.$store.state.loggedin">
    <div class="hr-subheader">
      <div class="page-subheader">
        Employee Directory
      </div>
    </div>
    <div class="employee-directory-main">
      <employee-directory></employee-directory>
    </div>
  </div>
</template>

<script>
import EmployeeDirectory from '@/components/Home/EmployeeDirectory'

export default {
  name: 'home',
  title () {
    return 'StormCellHR - Employee Directory'
  },
  components: {
    'employee-directory': EmployeeDirectory
  },
  created () {
    this.$store.commit('checkLogin')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
