<template>
  <tenant-dialog
    ref="dialog"
    title="Create Tenant"
    width="650"
    createLabel="Create"
    cancelLabel="Cancel"
    @payload="onCommit"
  />
</template>

<script lang="ts">
import {
  Component,
  CreateDialogComponent,
  DialogComponent,
  Refs
} from "sitewhere-ide-common";

import TenantDialog from "./TenantDialog.vue";

import { AxiosPromise } from "axios";
import { ITenant, ITenantCreateRequest } from "sitewhere-rest-api";
import { createTenant } from "../../rest/sitewhere-tenants-api";

@Component({
  components: {
    TenantDialog
  }
})
export default class TenantCreateDialog extends CreateDialogComponent<
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

  /** Called on payload commit */
  onCommit(payload: ITenantCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(payload: ITenantCreateRequest): AxiosPromise<ITenant> {
    return createTenant(this.$store, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: ITenant): void {
    this.$emit("tenantAdded", payload);
  }
}
</script>

<style scoped>
</style>
