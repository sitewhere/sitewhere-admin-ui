<template>
  <v-icon small class="trash" @click="onDeleteClicked">fa-trash</v-icon>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "sitewhere-ide-common";

import {
  IInstanceConfiguration,
  IRdbConfigurationMap
} from "sitewhere-rest-api";
import { IRdbConfiguration } from "sitewhere-rest-api";
import { IDatastoreDefinitionLocal } from "sitewhere-configuration-model";

@Component({
  components: {}
})
export default class ContentDeleteIcon extends Vue {
  onDeleteClicked(): void {
    this.$emit("delete");
  }
}
</script>

<style scoped>
.trash {
  color: #ddd;
}
.trash:hover {
  color: #999;
}
</style>
