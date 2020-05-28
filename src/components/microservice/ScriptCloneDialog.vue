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
    <script-clone-fields ref="details" />
  </sw-base-dialog>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { ITabbedComponent, NavigationIcon } from "sitewhere-ide-common";
import { DialogComponent } from "sitewhere-ide-components";

import ScriptCloneFields from "./ScriptCloneFields.vue";
import { IScriptVersion } from "sitewhere-rest-api";

@Component({
  components: {
    ScriptCloneFields
  }
})
export default class ScriptsDialog extends DialogComponent<IScriptVersion> {
  @Prop() readonly title!: string;
  @Prop() readonly width!: number;
  @Prop() readonly createLabel!: string;
  @Prop() readonly cancelLabel!: string;
  @Prop() readonly identifier!: string;
  @Ref() readonly dialog!: ITabbedComponent;
  @Ref() readonly details!: ScriptCloneFields;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Script;
  }

  // Generate payload from UI.
  generatePayload() {
    const payload: any = {};
    Object.assign(payload, this.details.save());
    return payload;
  }

  // Reset dialog contents.
  reset() {
    if (this.details) {
      this.details.reset();
    }
    this.dialog.setActiveTab(0);
  }

  // Load dialog from a given payload.
  load(payload: IScriptVersion) {
    this.reset();
    if (this.details) {
      this.details.load(payload);
    }
  }

  // Called after create button is clicked.
  onCreateClicked() {
    if (!this.details.validate()) {
      this.dialog.setActiveTab(0);
      return;
    }

    const payload = this.generatePayload();
    this.$emit("payload", payload);
  }
}
</script>
