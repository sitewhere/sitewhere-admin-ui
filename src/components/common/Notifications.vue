<template>
  <v-snackbar :timeout="5000" success v-model="showMessage">
    {{ displayed }}
    <v-btn dark outlined @click="showMessage = false">Close</v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import { IAlertMessage } from "sitewhere-ide-common";
import Vue from "vue";

@Component({})
export default class Notifications extends Vue {
  displayed: string | null = null;
  showMessage = false;

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

<style scoped></style>
