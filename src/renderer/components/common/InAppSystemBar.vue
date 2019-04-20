<template>
  <v-system-bar color="#444" class="title-bar">
    <v-btn flat icon small class="ma-0 title-bar-button" @click="openWebTools">
      <v-icon color="white">menu</v-icon>
    </v-btn>
    <span class="system-bar-title">{{ title }}</span>
    <v-spacer></v-spacer>
    <v-btn flat icon small class="ma-0 title-bar-button" @click="minWindow">
      <v-icon color="white">remove</v-icon>
    </v-btn>
    <v-btn flat icon small class="ma-0 title-bar-button" @click="maxWindow">
      <v-icon color="white">check_box_outline_blank</v-icon>
    </v-btn>
    <v-btn flat icon small class="ma-0 title-bar-button" @click="closeWindow">
      <v-icon color="white">close</v-icon>
    </v-btn>
  </v-system-bar>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "sitewhere-ide-common";

import Electron from "electron";

@Component({})
export default class InAppSystemBar extends Vue {
  title: string = Electron.remote.getCurrentWindow().getTitle();

  openWebTools() {
    Electron.remote.getCurrentWebContents().openDevTools();
  }

  minWindow() {
    Electron.remote.getCurrentWindow().minimize();
  }

  maxWindow() {
    Electron.remote.getCurrentWindow().maximize();
  }

  closeWindow() {
    Electron.remote.getCurrentWindow().close();
    Electron.app.quit();
  }
}
</script>

<style scoped>
.title-bar-button {
  -webkit-app-region: no-drag;
}
.system-bar-title {
  color: #eee;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
