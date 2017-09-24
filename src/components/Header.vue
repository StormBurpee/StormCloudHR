<template>
  <header class="hr-header">
    <ul class="pull-left">
      <li class="page-header">StormCloud<span>HR</span></li>
      <li class="page-link"><router-link to="/">Employees</router-link></li>
      <li class="page-link"><router-link to="/time-off">Time Off</router-link></li>
      <li class="page-link"><router-link to="#">Performance</router-link></li>
      <li class="page-link"><router-link to="#">Training</router-link></li>
      <li class="page-link"><router-link to="#">Reports</router-link></li>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'hr-header'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .hr-header {
    height: 50px;
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    line-height: 50px;
    color: #fff;
    background-color: #355FDA;
    padding: 0 50px;
    & ul {
      padding: 0;
      margin: 0;
      list-style-type: none;

      & li {
        padding: 0;
        margin: 0;
        list-style-type: none;
        display: inline-block;
        &.page-header {
          font-weight: 300;
          font-size: 18px;
          margin-right: 30px;
          & span {
            font-weight: 600;
          }
        }
        &.page-link {
          color: #FFFFFF;
          padding: 0px 10px;
          font-size: 14px;
          font-weight: 500;
          & router-link, & a {
            text-decoration: none;
            color: #FFFFFF;
          }
        }
      }
    }
  }
</style>
