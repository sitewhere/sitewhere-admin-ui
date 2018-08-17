<template>
  <div>
    <div v-if="customer">
      <v-card-text>
        {{ chosenText }}
      </v-card-text>
      <v-list two-line>
        <v-list-tile avatar :key="customer.token">
          <v-list-tile-avatar>
            <img :src="customer.imageUrl"></v-list-tile-avatar>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="customer.name"></v-list-tile-title>
            <v-list-tile-sub-title v-html="customer.description">
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon ripple @click.stop="onCustomerRemoved(true)">
              <v-icon class="grey--text">remove_circle</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </div>
    <div v-else>
      <v-card-text>
        {{ notChosenText }}
      </v-card-text>
      <v-list v-if="customers" class="customer-list" two-line>
        <template v-for="customer in customers">
          <v-list-tile avatar :key="customer.token"
            @click.stop="onCustomerChosen(customer, true)">
            <v-list-tile-avatar>
              <img :src="customer.imageUrl"></v-list-tile-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="customer.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="customer.description">
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </div>
  </div>
</template>

<script>
import Lodash from 'lodash'
import {_listCustomers} from '../../http/sitewhere-api-wrapper'

export default {

  data: () => ({
    customer: null,
    customers: []
  }),

  props: ['selected', 'selectedToken', 'chosenText', 'notChosenText'],

  // Initially load list of all sites.
  created: function () {
    var component = this
    _listCustomers(this.$store, false, true)
      .then(function (response) {
        component.customers = response.data.results
        if (component.selected) {
          component.onCustomerChosen(component.selected)
        }
      }).catch(function (e) {
      })
  },

  watch: {
    selected: function (value) {
      if (value) {
        this.onCustomerChosen(value, false)
      } else {
        this.onCustomerRemoved(false)
      }
    },
    selectedToken: function (value) {
      let customer = Lodash.find(this.customers, { 'token': value })
      if (customer) {
        this.onCustomerChosen(customer, false)
      } else {
        this.onCustomerRemoved(false)
      }
    }
  },

  methods: {
    // Called when a customer is chosen.
    onCustomerChosen: function (customer, emit) {
      this.$data.customer = customer
      if (emit) {
        this.$emit('customerUpdated', customer)
      }
    },

    // Allow another customer to be chosen.
    onCustomerRemoved: function (emit) {
      this.$data.customer = null
      if (emit) {
        this.$emit('customerUpdated', null)
      }
    }
  }
}
</script>

<style scoped>
.customer-list {
  max-height: 300px;
  overflow-y: auto;
}
</style>
