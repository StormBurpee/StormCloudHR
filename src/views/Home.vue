<template>
  <div class="home-container view">
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  
</style>
