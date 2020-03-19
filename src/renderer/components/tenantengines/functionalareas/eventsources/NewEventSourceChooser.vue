<template>
  <sw-new-element-chooser
    ref="dialog"
    :icon="icon"
    title="Add Event Source"
    width="500"
  >
    <sw-new-element-entry icon="fa-plus" itemId="mqtt" @chosen="onChosen"
      >MQTT Event Source</sw-new-element-entry
    ><sw-new-element-entry icon="fa-globe" itemId="coap" @chosen="onChosen"
      >CoAP Server Event Source</sw-new-element-entry
    >
  </sw-new-element-chooser>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Refs } from "sitewhere-ide-common";
import { MicroserviceIcon } from "../../../../libraries/constants";

@Component({
  components: {}
})
export default class NewEventSourceChooser extends Vue {
  /** References */
  $refs!: Refs<{
    dialog: any;
  }>;

  /** Get page icon */
  get icon(): MicroserviceIcon {
    return MicroserviceIcon.EventSources;
  }

  /** Open chooser */
  openChooser(): void {
    this.$refs.dialog.openDialog();
  }

  /** Close chooser */
  closeChooser(): void {
    this.$refs.dialog.closeDialog();
  }

  /** Close chooser on item click */
  onChosen(id: string): void {
    this.closeChooser();
    this.$emit("chosen", id);
  }
}
</script>

<style scoped></style>
