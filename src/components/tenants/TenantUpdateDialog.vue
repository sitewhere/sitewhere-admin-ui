<template>
  <tenant-dialog
    ref="dialog"
    title="Edit Tenant"
    width="650"
    :loaded="loaded"
    createLabel="Update"
    cancelLabel="Cancel"
    @payload="onSave"
  />
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { getTenant, updateTenant } from "sitewhere-ide-common";
import { EditDialogComponent } from "sitewhere-ide-components";

import TenantDialog from "./TenantDialog.vue";

import { AxiosPromise } from "axios";
import {
  ITenant,
  ITenantCreateRequest,
  ITenantResponseFormat
} from "sitewhere-rest-api";

@Component({
  components: {
    TenantDialog
  }
})
export default class TenantUpdateDialog extends EditDialogComponent<
  ITenant,
  ITenantCreateRequest
> {
  @Ref() readonly dialog!: TenantDialog;

  /** Get wrapped dialog */
  getDialog(): TenantDialog {
    return this.dialog;
  }

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<ITenant> {
    const format: ITenantResponseFormat = {};
    return getTenant(this.$store, identifier, format);
  }

  /** Save payload */
  prepareSave(
    original: ITenant,
    updated: ITenantCreateRequest
  ): AxiosPromise<ITenant> {
    return updateTenant(this.$store, original.token, updated);
  }

  /** Called on payload commit */
  onSave(payload: ITenant): void {
    this.save(payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: ITenant): void {
    this.$emit("tenantUpdated", payload);
  }
}
</script>

<style scoped>
</style>
