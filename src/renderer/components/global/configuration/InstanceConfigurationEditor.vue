<template>
  <sw-content-tab :tabkey="tabkey" :loaded="true" loadingMessage="Loading...">
    <v-card flat style="height: 100%">
      <v-card-text>
        <div class="flex-rows">
          <div v-if="configuration" class="config-header">
            <sw-page-header :text="header" />
          </div>
          <div class="config-content">
            <slot />
          </div>
          <div class="config-footer">
            <slot name="footer" />
          </div>
        </div>
      </v-card-text>
      <slot name="dialogs"></slot>
    </v-card>
  </sw-content-tab>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";

import Vue from "vue";
import { IInstanceConfiguration } from "sitewhere-rest-api";

@Component({
  components: {}
})
export default class InstanceConfigurationEditor extends Vue {
  @Prop() readonly tabkey!: string;
  @Prop() readonly configuration!: IInstanceConfiguration;
  @Prop() readonly header!: string;
}
</script>

<style scoped>
.flex-rows {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.config-header {
  flex: 0;
}
.config-content {
  flex: 1;
  background-color: #fff;
  overflow-y: auto;
}
.config-footer {
  flex: 0;
}
</style>
