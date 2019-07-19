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
import {
  Component,
  Prop,
  DialogComponent,
  ITabbedComponent,
  Refs
} from "sitewhere-ide-common";
import { NavigationIcon } from "../../libraries/constants";

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

  // References.
  $refs!: Refs<{
    dialog: ITabbedComponent;
    details: ScriptCloneFields;
  }>;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Script;
  }

  // Generate payload from UI.
  generatePayload() {
    let payload: any = {};
    Object.assign(payload, this.$refs.details.save());
    return payload;
  }

  // Reset dialog contents.
  reset() {
    if (this.$refs.details) {
      this.$refs.details.reset();
    }
    this.$refs.dialog.setActiveTab(0);
  }

  // Load dialog from a given payload.
  load(payload: IScriptVersion) {
    this.reset();
    if (this.$refs.details) {
      this.$refs.details.load(payload);
    }
  }

  // Called after create button is clicked.
  onCreateClicked(e: any) {
    if (!this.$refs.details.validate()) {
      this.$refs.dialog.setActiveTab(0);
      return;
    }

    var payload = this.generatePayload();
    this.$emit("payload", payload);
  }
}
</script>
