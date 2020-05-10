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
        <v-icon small class="copy-field">fa-copy</v-icon>
      </span>
      <span>Copy to Clipboard</span>
    </v-tooltip>
  </span>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { showMessage, showError } from "sitewhere-ide-common";
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
    showError(this, new Error("Unable to copy content to clipboard."));
  }
}
</script>

<style scoped>
.copy-field {
  color: #eee;
  font-size: 12px !important;
  margin-left: 4px;
  margin-bottom: 3px;
}
.copy-field:hover {
  color: #ccc;
}
</style>
