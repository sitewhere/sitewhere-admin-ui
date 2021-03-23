<template>
  <instance-configuration-editor
    class="editor"
    :tabkey="tabkey"
    :configuration="configuration"
    header="Configure Global Debugging Settings"
  >
    <pipeline-debugging-section
      :configuration="configuration"
      @updated="onEventPipelineDebuggingUpdated"
    />
  </instance-configuration-editor>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";

import Vue from "vue";
import {
  IInstanceConfiguration,
  IEventPipelineDebugging,
} from "sitewhere-rest-api";

import InstanceConfigurationEditor from "../InstanceConfigurationEditor.vue";
import PipelineDebuggingSection from "./PipelineDebuggingSection.vue";

@Component({
  components: {
    InstanceConfigurationEditor,
    PipelineDebuggingSection,
  },
})
export default class DebuggingEditor extends Vue {
  @Prop() readonly tabkey!: string;
  @Prop() readonly configuration!: IInstanceConfiguration;

  /** Called when event pipeline debugging values are updated. */
  onEventPipelineDebuggingUpdated(updated: IEventPipelineDebugging) {
    if (this.configuration) {
      this.configuration.debugging.eventPipeLine = updated;
    }
    this.$emit("updated");
  }
}
</script>

<style scoped>
.editor {
  border-bottom: 1px solid #eee;
}
</style>
