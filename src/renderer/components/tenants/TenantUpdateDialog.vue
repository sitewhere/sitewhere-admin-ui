<template>
  <tenant-dialog
    ref="dialog"
    title="Edit Tenant"
    width="700"
    createLabel="Update"
    cancelLabel="Cancel"
    @payload="onCommit"
  />
</template>

<script lang="ts">
import {
  EditDialogComponent,
  DialogComponent
} from "../../libraries/component-model";
import { Component, Prop } from "vue-property-decorator";
import { Refs } from "../../libraries/navigation-model";

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
  @Prop() readonly tenantToken!: string;

  // References.
  $refs!: Refs<{
    dialog: DialogComponent<ITenant>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<ITenant> {
    return this.$refs.dialog;
  }

  /** Load payload */
  load(): AxiosPromise<ITenant> {
    let format: ITenantResponseFormat = {};
    return getTenant(this.$store, this.tenantToken, format);
  }

  /** Called on payload commit */
  onCommit(payload: ITenant): void {
    this.commit(payload);
  }

  /** Save payload */
  save(payload: ITenantCreateRequest): AxiosPromise<ITenant> {
    return updateTenant(this.$store, this.tenantToken, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: ITenant): void {
    this.$emit("tenantUpdated", payload);
  }
}
</script>

<style scoped>
</style>
