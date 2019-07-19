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
      <v-tab key="content">Content</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="details">
        <script-detail-fields ref="details" />
      </v-tab-item>
      <v-tab-item key="content">
        <script-content-fields :identifier="identifier" ref="content" />
      </v-tab-item>
    </template>
  </sw-base-dialog>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  DialogComponent,
  ITabbedComponent,
  Refs
} from "sitewhere-ide-common";
import { NavigationIcon } from "../../libraries/constants";

import ScriptDetailFields from "./ScriptDetailFields.vue";
import ScriptContentFields from "./ScriptContentFields.vue";
import { IScriptCreateRequest } from "sitewhere-rest-api";

@Component({
  components: {
    ScriptDetailFields,
    ScriptContentFields
  }
})
export default class ScriptsDialog extends DialogComponent<
  IScriptCreateRequest
> {
  @Prop() readonly title!: string;
  @Prop() readonly width!: number;
  @Prop() readonly createLabel!: string;
  @Prop() readonly cancelLabel!: string;
  @Prop() readonly identifier!: string;

  // References.
  $refs!: Refs<{
    dialog: ITabbedComponent;
    details: ScriptDetailFields;
    content: ScriptContentFields;
  }>;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceType;
  }

  // Generate payload from UI.
  generatePayload() {
    let payload: any = {};
    Object.assign(
      payload,
      this.$refs.details.save(),
      this.$refs.content.save()
    );
    return payload;
  }

  // Reset dialog contents.
  reset() {
    if (this.$refs.details) {
      this.$refs.details.reset();
    }
    if (this.$refs.content) {
      this.$refs.content.reset();
    }
    this.$refs.dialog.setActiveTab(0);
  }

  // Load dialog from a given payload.
  load(payload: IScriptCreateRequest) {
    this.reset();
    if (this.$refs.details) {
      this.$refs.details.load(payload);
    }
    if (this.$refs.content) {
      this.$refs.content.load(payload);
    }
  }

  // Called after create button is clicked.
  onCreateClicked(e: any) {
    if (!this.$refs.details.validate()) {
      this.$refs.dialog.setActiveTab(0);
      return;
    }

    if (!this.$refs.content.validate()) {
      this.$refs.dialog.setActiveTab(1);
      return;
    }

    var payload = this.generatePayload();
    console.log("Before payload emit:", this);
    this.$emit("payload", payload);
  }
}
</script>
