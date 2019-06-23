<template>
  <attributes-dialog
    ref="dialog"
    :title="componentName"
    width="600"
    createLabel="Update"
    cancelLabel="Cancel"
    @payload="onCommit"
    :context="context"
    :groups="groups"
    :identifier="identifier"
    :tenantToken="tenantToken"
  ></attributes-dialog>
</template>

<script lang="ts">
import {
  Component,
  EditDialogComponent,
  DialogComponent,
  Refs
} from "sitewhere-ide-common";

import { AttributeValues } from "./ConfigurationModel";

import AttributesDialog from "./AttributesDialog.vue";

import { AxiosPromise } from "axios";

@Component({
  components: {
    AttributesDialog
  }
})
export default class AttributesUpdateDialog extends EditDialogComponent<
  AttributeValues,
  AttributeValues
> {
  // References.
  $refs!: Refs<{
    dialog: DialogComponent<any>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<any> {
    return this.$refs.dialog;
  }

  /** Load payload */
  prepareLoad(identifier: string): AttributeValues {
    return [];
  }

  /** Save payload */
  prepareSave(
    original: AttributeValues,
    updated: AttributeValues
  ): AttributeValues {
    return updated;
  }

  /** Called on payload commit */
  onSave(payload: AttributeValues): void {
    this.save(payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: AttributeValues): void {
    this.$emit("attributesUpdated", payload);
  }
}
</script>

<style scoped>
</style>
