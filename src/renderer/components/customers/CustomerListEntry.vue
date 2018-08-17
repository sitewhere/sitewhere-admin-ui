<template>
  <v-card hover color="white">
    <v-container fluid grid-list-lg @click="onCustomerClicked">
      <v-layout row>
        <v-flex xs3>
          <v-card-media>
            <div :style="logoStyle"></div>
          </v-card-media>
        </v-flex>
        <v-flex xs9>
          <div>
            <div class="headline">{{ customer.name }}</div>
            <div class="custdesc">{{ customer.description }}</div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {

  data: () => ({
  }),

  props: ['customer'],

  computed: {
    // Compute style of logo.
    logoStyle: function () {
      return {
        'background-color': '#fff',
        'background-image': 'url(' + this.customer.imageUrl + ')',
        'background-size': 'contain',
        'background-repeat': 'no-repeat',
        'background-position': '50% 50%',
        'border': '1px solid #eee',
        'height': '120px',
        'width': '100px'
      }
    }
  },

  methods: {
    // Handle customer clicked.
    onCustomerClicked: function () {
      this.$emit('openCustomer', this.customer)
    }
  }
}
</script>

<style scoped>
.custdesc {
  height: 40px;
  overflow-y: hidden;
}
</style>
