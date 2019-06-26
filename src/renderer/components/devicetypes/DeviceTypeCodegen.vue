<template>
  <sw-content-tab :tabkey="tabkey" :id="id" :loaded="loaded" loadingMessage="Loading...">
    <v-container class="pa-2" fluid grid-list-md fill-height>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card class="ma-3">
            <v-card-text class="pa-0">
              <v-toolbar class="blue darken-2 white--text">
                <v-toolbar-title>Google Protocol Buffers Definition</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip left>
                  <v-btn class="ma-0" dark icon @click="onProtobufDownload" slot="activator">
                    <v-icon>fa-download</v-icon>
                  </v-btn>
                  <span>Download Code</span>
                </v-tooltip>
                <v-tooltip left>
                  <v-btn class="ml-0 mr-2" dark icon @click="refresh" slot="activator">
                    <v-icon>fa-refresh</v-icon>
                  </v-btn>
                  <span>Refresh Code</span>
                </v-tooltip>
              </v-toolbar>
              <div>
                <pre class="proto-code" v-highlightjs="protobuf"><code class="protobuf"></code></pre>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </sw-content-tab>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";
import { IDeviceType } from "sitewhere-rest-api";

import Vue from "vue";

@Component({})
export default class DeviceTypeCodegen extends Vue {
  @Prop() readonly tabkey!: string;
  @Prop() readonly id!: string;
  @Prop() readonly deviceType!: IDeviceType;

  loaded: boolean = true;
  protobuf: string = "";

  onProtobufDownload() {}

  refresh() {}
}
</script>

<style scoped>
</style>
