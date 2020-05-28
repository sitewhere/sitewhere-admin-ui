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
import { Component, Ref } from "vue-property-decorator";
import { createTenant } from "sitewhere-ide-common";
import { CreateDialogComponent } from "sitewhere-ide-components";

import TenantDialog from "./TenantDialog.vue";

import { AxiosPromise } from "axios";
import { ITenant, ITenantCreateRequest } from "sitewhere-rest-api";

@Component({
  components: {
    TenantDialog
  }
})
export default class TenantCreateDialog extends CreateDialogComponent<
  ITenant,
  ITenantCreateRequest
> {
  @Ref() readonly dialog!: TenantDialog;

  /** Get wrapped dialog */
  getDialog(): TenantDialog {
    return this.dialog;
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
