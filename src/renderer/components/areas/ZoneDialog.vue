<template>
  <sw-base-dialog
    ref="dialog"
    :icon="icon"
    :title="title"
    :width="width"
    :loaded="loaded"
    :visible="dialogVisible"
    :createLabel="createLabel"
    :cancelLabel="cancelLabel"
    @createClicked="onCreateClicked"
    @cancelClicked="onCancelClicked"
  >
    <template slot="tabs">
      <v-tab key="details">Details</v-tab>
      <v-tab key="metadata">Metadata</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="details">
        <zone-detail-fields :area="area" :mapVisible="mapVisible" ref="details" />
      </v-tab-item>
      <v-tab-item key="metadata">
        <sw-metadata-panel ref="metadata" />
      </v-tab-item>
    </template>
  </sw-base-dialog>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  DialogComponent,
  DialogSection,
  ITabbedComponent,
  Refs
} from "sitewhere-ide-common";
import { NavigationIcon } from "../../libraries/constants";

import ZoneDetailFields from "./ZoneDetailFields.vue";
import { IZone, IArea } from "sitewhere-rest-api";

@Component({
  components: {
    ZoneDetailFields
  }
})
export default class ZoneDialog extends DialogComponent<IZone> {
  @Prop() readonly area!: IArea;

  mapVisible: boolean = false;

  // References.
  $refs!: Refs<{
    dialog: ITabbedComponent;
    details: DialogSection;
    metadata: DialogSection;
  }>;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Zone;
  }

  /** Generate payload from UI */
  generatePayload() {
    let payload: any = {};
    Object.assign(
      payload,
      this.$refs.details.save(),
      this.$refs.metadata.save()
    );
    return payload;
  }

  /** Reset dialog contents */
  reset() {
    this.mapVisible = true;
    if (this.$refs.details) {
      this.$refs.details.reset();
    }
    if (this.$refs.metadata) {
      this.$refs.metadata.reset();
    }
    this.$refs.dialog.setActiveTab(0);
  }

  /** Load dialog from a given payload */
  load(payload: IZone) {
    this.reset();
    if (this.$refs.details) {
      this.$refs.details.load(payload);
    }
    if (this.$refs.metadata) {
      this.$refs.metadata.load(payload);
    }
  }

  /** Called after create button is clicked */
  onCreateClicked(e: any) {
    if (!this.$refs.details.validate()) {
      this.$refs.dialog.setActiveTab(0);
      return;
    }

    var payload = this.generatePayload();
    console.log("Before payload emit:", this);
    this.$emit("payload", payload);
  }
}
</script>
