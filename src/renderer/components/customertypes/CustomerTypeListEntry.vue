<template>
  <v-card flat hover color="white">
    <v-container @click="onCustomerTypeClicked">
      <v-layout row>
        <v-flex xs2>
          <v-card-media class="pt-2 pl-1">
            <font-awesome-icon class="grey--text" :icon="customerType.icon" size="3x"/>
          </v-card-media>
        </v-flex>
        <v-flex xs10>
          <div>
            <div class="title ellipsis mb-1">{{ customerType.name }}</div>
            <div class="ctdesc">{{ customerType.description }}</div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { routeTo } from "../common/Utils";

export default {
  data: () => ({}),

  props: ["customerType"],

  methods: {
    // Callen when card is clicked.
    onCustomerTypeClicked: function() {
      routeTo(this, "/customertypes/" + this.customerType);
    }
  }
};
</script>

<style scoped>
.ctdesc {
  height: 40px;
  overflow-y: hidden;
}
</style>
