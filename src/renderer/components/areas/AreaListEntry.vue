<template>
  <list-entry>
    <v-container @click="onAreaClicked">
      <v-layout row>
        <v-flex xs3>
          <v-card-media>
            <div :style="logoStyle"></div>
          </v-card-media>
        </v-flex>
        <v-flex xs9>
          <div>
            <div class="title ellipsis mb-1">{{ area.name }}</div>
            <div class="areadesc">{{ area.description }}</div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </list-entry>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { IArea } from "sitewhere-rest-api";
import ListEntry from "../common/ListEntry.vue";

@Component({
  components: {
    ListEntry
  }
})
export default class DeviceTypeSelector extends Vue {
  @Prop() readonly area!: IArea;

  // Compute style of logo.
  get logoStyle() {
    return {
      "background-color": "#fff",
      "background-image": "url(" + this.area.imageUrl + ")",
      "background-size": "contain",
      "background-repeat": "no-repeat",
      "background-position": "50% 50%",
      border: "1px solid #eee",
      height: "120px",
      width: "100px"
    };
  }

  // Handle area clicked.
  onAreaClicked() {
    this.$emit("openArea", this.area);
  }
}
</script>

<style scoped>
.areadesc {
  height: 40px;
  overflow-y: hidden;
}
</style>
