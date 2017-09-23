<template>
    <div>
      <v-data-table
        v-bind:headers="headers"
        v-bind:items="items"
        v-bind:search="search"
        v-bind:pagination.sync="pagination"
        class="elevation-1"
      >
        <template slot="headerCell" scope="props">
          <span v-tooltip:bottom="{ 'html': props.header.text }">
            {{ props.header.text }}
          </span>
        </template>
        <template slot="items" scope="props">
          <td>{{ props.item.name }}</td>
          <td  class="text-xs-right">{{ props.item.calories }}</td>
          <td  class="text-xs-right">{{ props.item.fat }}</td>
          <td  class="text-xs-right">{{ props.item.carbs }}</td>
          <td  class="text-xs-right">{{ props.item.protein }}</td>
          <td  class="text-xs-right">{{ props.item.sodium }}</td>
        </template>
      </v-data-table>
      <div class="text-xs-center pt-2">
        <v-btn primary @click.native="toggleOrder">Toggle sort order</v-btn>
        <v-btn primary @click.native="nextSort">Sort next column</v-btn>
      </div>
    </div>
</template>

<script>
export default {
  name: 'employee-directory'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
