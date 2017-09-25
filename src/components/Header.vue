<template>
  <div class="header-container">
    <header class="hr-header" v-if="this.$store.state.loggedin">
      <ul class="pull-left">
        <li class="page-header">StormCloud<span>HR</span></li>
        <li class="page-link"><router-link to="/employees">Employees</router-link></li>
        <li class="page-link"><router-link to="/time-off">Time Off</router-link></li>
        <li class="page-link"><router-link to="#">Performance</router-link></li>
        <li class="page-link"><router-link to="#">Training</router-link></li>
        <li class="page-link"><router-link to="#">Reports</router-link></li>
      </ul>
      <ul class="pull-right">
        <li class="page-link"><router-link to="#">My Inbox</router-link></li>
        <li class="page-link">
          <v-menu bottom right>
              <v-chip outline slot="activator">
                <v-avatar class="teal">SB</v-avatar>
                Storm Burpee
              </v-chip>
              <v-list class="dropdown-list">
                <v-list-tile @click="">
                  <router-link to="/employee/1"><v-list-tile-title>My Details</v-list-tile-title></router-link>
                </v-list-tile>
                <v-list-tile @click="">
                  <router-link to="#"><v-list-tile-title>Personal Settings</v-list-tile-title></router-link>
                </v-list-tile>
                <v-list-tile @click="">
                  <router-link to="#"><v-list-tile-title>Company Settings</v-list-tile-title></router-link>
                </v-list-tile>
                <v-list-tile @click="">
                  <v-list-tile-title v-on:click="logout()">Log Out</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
        </li>
      </ul>
    </header>
    <header v-else class="hr-header loggedout">
      <div class="page-header">StormCloud<span>HR</span></div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'hr-header',
  data () {
    return {
    }
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .pull-right {
    float: right;
  }
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
    &.loggedout {
      background-color: #fff;
      //height: 70px;
      //line-height: 70px;
      color: #355FDA;
      text-align: center;
      border-bottom: 1px solid #eee;
      & .page-header {
        font-weight: 300;
        font-size: 18px;
        margin-right: 30px;
        & span {
          font-weight: 600;
        }
      }
    }

    & ul {
      padding: 0;
      margin: 0;
      list-style-type: none;
      display: inline-block;

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
          & .chip {
            cursor: pointer;
            color: #fff;
          }
          & router-link, & a {
            text-decoration: none;
            color: #FFFFFF;
          }
        }
      }
    }
  }

  .dropdown-list {
    & a {
      color: #212121;
    }
  }
</style>
