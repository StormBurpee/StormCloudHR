<template>
  <div class="new-employee-container view">
    <div class="hr-subheader">
      <div class="page-subheader">
        Hire New Employee
      </div>
    </div>
    <hire-stepper></hire-stepper>
  </div>
</template>

<script>
import HireStepper from '@/components/EmployeeNew/HireStepper'

export default {
  name: 'new-employee',
  components: {
    'hire-stepper': HireStepper
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
