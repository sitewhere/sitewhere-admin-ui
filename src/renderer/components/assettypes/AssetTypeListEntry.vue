<template>
  <list-entry>
    <v-container fluid @click="onAssetTypeClicked">
      <v-layout row>
        <v-flex xs3>
          <v-card-media>
            <div :style="logoStyle"></div>
          </v-card-media>
        </v-flex>
        <v-flex xs9>
          <div>
            <div class="title ellipsis mb-1">{{ assetType.name }}</div>
            <div class="atdesc">{{ assetType.description }}</div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </list-entry>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

import { IAssetType } from "sitewhere-rest-api";
import { IStyle } from "../common/Style";
import ListEntry from "../common/ListEntry.vue";

@Component({
  components: {
    ListEntry
  }
})
export default class AssetTypeListEntry extends Vue {
  @Prop() readonly assetType!: IAssetType;

  // Compute style of logo.
  get logoStyle(): IStyle {
    return {
      "background-color": "#fff",
      "background-image": "url(" + this.assetType.imageUrl + ")",
      "background-size": "contain",
      "background-repeat": "no-repeat",
      "background-position": "50% 50%",
      border: "1px solid #eee",
      height: "120px",
      width: "100px"
    };
  }

  // Callen when card is clicked.
  onAssetTypeClicked() {
    this.$emit("assetTypeOpened", this.assetType);
  }
}
</script>

<style scoped>
.atdesc {
  height: 80px;
  overflow-y: hidden;
}
</style>
