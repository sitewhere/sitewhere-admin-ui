<template>
  <v-card flat hover color="white">
    <v-container @click="onCustomerTypeClicked">
      <v-layout row>
        <v-flex xs2>
          <v-card-media>
            <v-icon class="ctlogo">{{ customerType.icon }}</v-icon>
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
import Utils from "../common/Utils";

export default {
  data: () => ({}),

  components: {
    Utils
  },

  props: ["customerType", "customerTypes"],

  methods: {
    // Callen when card is clicked.
    onCustomerTypeClicked: function() {
      Utils.routeTo(this, "/customertypes/" + this.customerType.token);
    }
  }
};
</script>

<style scoped>
.ctlogo {
  font-size: 30pt;
  padding: 10px;
}
.ctdesc {
  height: 40px;
  overflow-y: hidden;
}
</style>
