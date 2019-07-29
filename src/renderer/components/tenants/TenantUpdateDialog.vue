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
import {
  Component,
  EditDialogComponent,
  DialogComponent,
  Refs
} from "sitewhere-ide-common";

import TenantDialog from "./TenantDialog.vue";

import { AxiosPromise } from "axios";
import {
  ITenant,
  ITenantCreateRequest,
  ITenantResponseFormat
} from "sitewhere-rest-api";
import { getTenant, updateTenant } from "../../rest/sitewhere-tenants-api";

@Component({
  components: {
    TenantDialog
  }
})
export default class TenantUpdateDialog extends EditDialogComponent<
  ITenant,
  ITenantCreateRequest
> {
  // References.
  $refs!: Refs<{
    dialog: DialogComponent<ITenant>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<ITenant> {
    return this.$refs.dialog;
  }

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<ITenant> {
    let format: ITenantResponseFormat = {};
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
