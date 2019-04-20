<template>
  <v-footer app>
    <div class="footer-content">
      <span>Footer content goes here..</span>
    </div>
  </v-footer>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "sitewhere-ide-common";

@Component({})
export default class InAppFooter extends Vue {}
</script>

<style scoped>
.footer-content {
  border-top: 1px solid #ddd;
  width: 100%;
  height: 100%;
  color: #666;
  padding: 7px;
}
</style>
