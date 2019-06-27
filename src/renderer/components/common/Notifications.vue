<template>
  <v-snackbar :timeout="5000" success v-model="showMessage">
    {{ displayed }}
    <v-btn dark flat @click="showMessage = false">Close</v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Watch } from "sitewhere-ide-common";
import { IAlertMessage } from "./ApplicationModel";
import Vue from "vue";

@Component({})
export default class Notifications extends Vue {
  displayed: string | null = null;
  showMessage: boolean = false;

  /** React to updated alert message */
  get lastMessage(): IAlertMessage {
    return this.$store.getters.message;
  }

  @Watch("lastMessage", { immediate: true })
  onMessageUpdated(val: IAlertMessage) {
    if (val) {
      this.displayed = val.message;
      this.showMessage = true;
      this.$store.commit("message", null);
    }
  }
}
</script>

<style scoped>
</style>
