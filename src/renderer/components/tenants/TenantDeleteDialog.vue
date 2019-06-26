<template>
  <sw-delete-dialog
    ref="dialog"
    title="Delete Tenant"
    width="400"
    :visible="visible"
    @delete="onDelete"
    @cancel="onCancel"
  >
    <v-card-text>{{ message }}</v-card-text>
  </sw-delete-dialog>
</template>

<script lang="ts">
import { Component, DeleteDialogComponent } from "sitewhere-ide-common";

import { AxiosPromise } from "axios";
import { ITenant, ITenantResponseFormat } from "sitewhere-rest-api";
import { getTenant, deleteTenant } from "../../rest/sitewhere-tenants-api";

@Component({})
export default class TenantDeleteDialog extends DeleteDialogComponent<ITenant> {
  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<ITenant> {
    let format: ITenantResponseFormat = {};
    return getTenant(this.$store, identifier, format);
  }

  /** Called after record is loaded */
  afterLoad(tenant: ITenant): void {
    this.message = `Are you sure you want to delete '${tenant.name}'?`;
  }

  /** Load payload */
  prepareDelete(tenant: ITenant): AxiosPromise<ITenant> {
    return deleteTenant(this.$store, tenant.token);
  }

  // Called after create button is clicked.
  onDelete(e: any) {
    this.delete();
  }

  // Called after cancel button is clicked.
  onCancel(e: any) {
    this.cancel();
  }
}
</script>

<style scoped>
</style>
