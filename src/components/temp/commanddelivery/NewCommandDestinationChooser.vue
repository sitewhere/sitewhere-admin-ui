<template>
  <new-element-chooser ref="dialog" :icon="icon" title="Add Command Destination" width="500">
    <new-element-entry icon="fa-globe" item-id="coap" @chosen="onChosen">CoAP Command Destination</new-element-entry>
    <new-element-entry icon="fa-globe" item-id="mqtt" @chosen="onChosen">MQTT Command Destination</new-element-entry>
  </new-element-chooser>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Ref } from "vue-property-decorator";
import { MicroserviceIcon } from "sitewhere-ide-common";

import { NewElementChooser, NewElementEntry } from "sitewhere-ide-components";

@Component({
  components: { NewElementChooser, NewElementEntry }
})
export default class NewCommandDestinationChooser extends Vue {
  @Ref() readonly dialog!: NewElementChooser;

  /** Get page icon */
  get icon(): MicroserviceIcon {
    return MicroserviceIcon.CommandDelivery;
  }

  /** Open chooser */
  openChooser(): void {
    this.dialog.openDialog();
  }

  /** Close chooser */
  closeChooser(): void {
    this.dialog.closeDialog();
  }

  /** Close chooser on item click */
  onChosen(id: string): void {
    this.closeChooser();
    this.$emit("chosen", id);
  }
}
</script>
