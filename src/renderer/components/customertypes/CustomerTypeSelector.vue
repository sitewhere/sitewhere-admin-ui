<template>
  <v-select :items="customerTypes" item-text="name" item-value="id"
    v-model="selectedId" label="Customer type" prepend-icon="subject">
  </v-select>
</template>

<script>
import {_listCustomerTypes} from '../../http/sitewhere-api-wrapper'

export default {

  data: () => ({
    customerTypes: [],
    selectedId: null
  }),

  props: ['value'],

  computed: {
    // Indexes customer types by id.
    customerTypesById: function () {
      let cts = this.$data.customerTypes
      let ctById = {}
      if (cts) {
        for (let i = 0; i < cts.length; i++) {
          let ct = cts[i]
          ctById[ct.id] = ct
        }
      }
      return ctById
    }
  },

  watch: {
    value: function (updated) {
      this.$data.selectedId = updated
    },
    selectedId: function (updated) {
      this.$emit('input', updated)
      this.$emit('customerTypeUpdated', this.customerTypesById[updated])
    }
  },

  // Initially load list of all area types.
  created: function () {
    this.$data.selectedId = this.value
    var paging = 'page=1&pageSize=0'
    var component = this
    _listCustomerTypes(this.$store, false, paging)
      .then(function (response) {
        component.$data.customerTypes = response.data.results
      }).catch(function (e) {
      })
  },

  methods: {
  }
}
</script>

<style scoped>
</style>
