<template>
  <list-entry>
    <v-container @click="onAreaTypeClicked">
      <v-layout row>
        <v-flex xs3>
          <branding-image :style="logoStyle" :entity="areaType" iconSize="3x" />
        </v-flex>
        <v-flex xs9>
          <div>
            <div class="title ellipsis mb-1">{{ areaType.name }}</div>
            <div class="atdesc">{{ areaType.description }}</div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </list-entry>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import BrandingImage from "../common/BrandingImage.vue";
import { ListEntry } from "sitewhere-ide-components";

import { IStyle } from "../common/Style";
import { IAreaType } from "sitewhere-rest-api";

@Component({
  components: {
    ListEntry,
    BrandingImage,
  },
})
export default class AreaTypeListEntry extends Vue {
  @Prop() readonly areaType!: IAreaType;

  // Compute style of logo.
  get logoStyle(): IStyle {
    return {
      height: "80px",
      width: "80px",
    };
  }

  // Callen when clicked.
  onAreaTypeClicked() {
    this.$emit("open", this.areaType);
  }
}
</script>

<style scoped>
.atdesc {
  height: 40px;
  overflow-y: hidden;
}
</style>
