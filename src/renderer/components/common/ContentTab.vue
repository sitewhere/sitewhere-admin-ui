<template>
  <v-tab-item :key="tabkey" :id="id">
    <div class="flex-rows">
      <div class="tab-header">
        <slot name="header"/>
      </div>
      <div class="tab-content">
        <slot v-if="loaded"/>
        <v-card v-else>
          <v-card-text>
            <span class="title">{{ loadingMessage || 'Loading ...' }}</span>
            <v-progress-circular :indeterminate="true"/>
          </v-card-text>
        </v-card>
      </div>
      <div class="tab-footer">
        <slot name="footer"/>
      </div>
    </div>
    <slot name="dialogs"></slot>
  </v-tab-item>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

@Component({})
export default class ContentTab extends Vue {
  @Prop() readonly tabkey!: string;
  @Prop() readonly id!: string;
  @Prop() readonly loadingMessage!: string;
  @Prop() readonly loaded!: boolean;
}
</script>

<style scoped>
.flex-rows {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.tab-header {
  flex: 0;
}
.tab-content {
  flex: 1;
  background-color: #eee;
}
.tab-footer {
  flex: 0;
}
</style>
