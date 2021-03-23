<template>
  <base-dialog
    ref="dialog"
    :icon="icon"
    title="Edit Pipeline Debugging Configuration"
    width="550"
    :loaded="true"
    :visible="dialogVisible"
    createLabel="Update"
    cancelLabel="Cancel"
    @createClicked="onUpdateClicked"
    @cancelClicked="onCancelClicked"
  >
    <pipeline-debugging-fields ref="details" />
  </base-dialog>
</template>

<script lang="ts">
import { Component, Ref, Prop } from "vue-property-decorator";
import { NavigationIcon } from "sitewhere-ide-common";
import { DialogComponent, BaseDialog } from "sitewhere-ide-components";

import PipelineDebuggingFields from "./PipelineDebuggingFields.vue";

import { IEventPipelineDebugging } from "sitewhere-rest-api";

@Component({
  components: { BaseDialog, PipelineDebuggingFields }
})
export default class PipelineDebuggingDialog extends DialogComponent<
  IEventPipelineDebugging
> {
  @Prop() readonly pipelineDebugging!: IEventPipelineDebugging;
  @Ref() readonly dialog!: BaseDialog;
  @Ref() readonly details!: PipelineDebuggingFields;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Settings;
  }

  /** Generate payload from UI data */
  generatePayload(): IEventPipelineDebugging {
    return Object.assign({}, this.pipelineDebugging, this.details.save());
  }

  /** Reset dialog content to default */
  reset() {
    if (this.details) {
      this.details.reset();
    }
  }

  /** Load data from an existing configuration */
  load(payload: IEventPipelineDebugging) {
    this.reset();
    if (this.details) {
      this.details.load(payload);
    }
  }

  /** Called after update button is clicked */
  onUpdateClicked() {
    if (!this.details.validate()) {
      return;
    }

    const payload = this.generatePayload();
    this.$emit("payload", payload);
    this.dialogVisible = false;
  }
}
</script>
