<template>
  <div class="home-container view" v-if="this.$store.state.loggedin">
    <div class="hr-subheader">
      <div class="page-subheader">
        Time Off
      </div>
    </div>
    <div class="employee-directory-main">

    </div>
  </div>
</template>

<script>
export default {
  name: 'time-off',
  title () {
    return 'StormCellHR - Time Off'
  },
  created () {
    this.$store.commit('checkLogin')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .page-subheader {
    font-size: 36px;
    font-weight: 300;
    padding: 0px;
    margin: 0px;
  }
</style>
