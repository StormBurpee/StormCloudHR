<template>
    <v-card class="directory">
      <v-card-title>
        <v-text-field
          append-icon="search"
          label="Search Employees..."
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
        <v-spacer></v-spacer>
        <router-link to="/employees/new"><v-btn light primary class="directory-btn">Hire</v-btn></router-link>
      </v-card-title>
      <v-data-table
        v-bind:headers='headers'
        v-bind:items='items'
        v-bind:search='search'
        v-bind:pagination.sync='pagination'
        class='elevation-0'
      >
        <template slot='headerCell' scope='props'>
          <span v-tooltip:bottom="{ 'html': props.header.text }">
            {{ props.header.text }}
          </span>
        </template>
        <template slot='items' scope='props'>
          <td>{{props.item.last}}</td>
          <td>{{props.item.first}}</td>
          <td>{{props.item.title}}</td>
          <td>{{props.item.location}}</td>
          <td>{{props.item.status}}</td>
        </template>
      </v-data-table>
    </v-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'employee-directory',
  data () {
    return {
      tmp: '',
      search: '',
      pagination: {
        sortBy: 'last'
      },
      selected: [],
      headers: [
        {text: 'Last Name', value: 'last', align: 'left'},
        {text: 'First Name', value: 'first', align: 'left'},
        {text: 'Title', value: 'title', align: 'left'},
        {text: 'Location', value: 'location', align: 'left'},
        {text: 'Status', value: 'status', align: 'left'}
      ],
      items: []
    }
  },
  methods: {
    toggleOrder () {
      this.pagination.descending = !this.pagination.descending
    },
    nextSort () {
      let index = this.headers.findIndex(h => h.value === this.pagination.sortBy)
      index = (index + 1) % this.headers.length
      index = index === 0 ? index + 1 : index
      this.pagination.sortBy = this.headers[index].value
    }
  },
  created () {
    axios.get('http://stormcloudhr.com:3000/employees/1')
    .then(response => {
      // JSON responses are automatically parsed.
      this.items = []
      for (var i = 0; i < response.data.employees.length; i++) {
        let employee = response.data.employees[i]
        this.items.push({
          last: employee.last,
          first: employee.first,
          title: employee.title,
          location: employee.title,
          status: employee.status
        })
      }
    })
    .catch(e => {
      console.log(e)
      // this.errors.push(e)
    })
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  .directory {
    margin: 0px 25px;
    margin-top: 25px;
  }

  .directory-btn {
    & a {
      color: #fff;
      text-decoration: none;
    }
    color: #fff!important;
  }
</style>
