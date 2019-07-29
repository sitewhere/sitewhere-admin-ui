<template>
  <span>
    {{ field }}
    <v-tooltip right>
      <span
        slot="activator"
        v-clipboard="field"
        :key="field"
        @success="onFieldCopied"
        @error="onFieldCopyFailed"
      >
        <font-awesome-icon
          class="grey--text text--lighten-1 mt-1"
          icon="copy"
          size="sm"
          style="vertical-align: top;"
        />
      </span>
      <span>Copy to Clipboard</span>
    </v-tooltip>
  </span>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";
import { showMessage, showError } from "../Utils";
import Vue from "vue";

@Component({})
export default class ClipboardCopyField extends Vue {
  @Prop() readonly field!: string;
  @Prop() readonly message!: string;

  /** Called after successful copy */
  onFieldCopied() {
    showMessage(this, this.message);
  }

  /** Called after failed copy */
  onFieldCopyFailed() {
    showError(this, "Unable to copy content to clipboard.");
  }
}
</script>
