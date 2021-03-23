<template>
  <content-section icon="fa-bug" title="Event Pipeline Debugging Configuration">
    <content-field name="debug level" :value="debugLevel" />
    <content-link
      class="mt-3"
      icon="fa-edit"
      text="Edit pipeline debugging configuration."
      @linkClicked="onEdit"
    />
    <pipeline-debugging-dialog
      ref="dialog"
      :pipelineDebugging="eventPipelineDebugging"
      @payload="onEventPipelineDebuggingUpdated"
    />
  </content-section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref } from "vue-property-decorator";

import {
  IInstanceConfiguration,
  IInstanceDebuggingConfiguration,
  IEventPipelineDebugging,
} from "sitewhere-rest-api";

import {
  ContentSection,
  ContentField,
  ContentLink,
} from "sitewhere-ide-components";

import PipelineDebuggingDialog from "./PipelineDebuggingDialog.vue";

@Component({
  components: {
    ContentSection,
    ContentField,
    ContentLink,
    PipelineDebuggingDialog,
  },
})
export default class PipelineDebuggingSection extends Vue {
  @Prop() readonly configuration!: IInstanceConfiguration;
  @Ref() readonly dialog!: PipelineDebuggingDialog;

  /** Get instance debugging configuration */
  get debugging(): IInstanceDebuggingConfiguration | null {
    return this.configuration ? this.configuration.debugging : null;
  }

  /** Get event pipeline debugging configuration */
  get eventPipelineDebugging(): IEventPipelineDebugging | null {
    return this.debugging ? this.debugging.eventPipeLine : null;
  }

  /** Get event pipeline debugging level */
  get debugLevel(): string {
    return this.eventPipelineDebugging
      ? this.eventPipelineDebugging.debugLevel
      : "warn";
  }

  /** Called to open edit dialog */
  onEdit(): void {
    if (this.eventPipelineDebugging) {
      this.dialog.load(this.eventPipelineDebugging);
      this.dialog.openDialog();
    }
  }

  /** Called when event pipeline debugging config is updated */
  onEventPipelineDebuggingUpdated(updated: IEventPipelineDebugging) {
    this.$emit("updated", updated);
  }
}
</script>
