<template>
  <delete-dialog
    ref="dialog"
    title="Delete Tenant"
    width="400"
    :visible="visible"
    @delete="onDelete"
    @cancel="onCancel"
  >
    <v-card-text>
      {{ message }}
      <v-card outlined class="caption pa-2 mt-3">
        Note: This will delete the Kubernetes resource for the tenant
        along with any current microservice-specific configurations.
        It will not delete the underlying persistent data associated
        with the microservices.
      </v-card>
    </v-card-text>
  </delete-dialog>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { getTenant, deleteTenant } from "sitewhere-ide-common";
import { DeleteDialogComponent, DeleteDialog } from "sitewhere-ide-components";

import { AxiosPromise } from "axios";
import { ITenant, ITenantResponseFormat } from "sitewhere-rest-api";

@Component({ components: { DeleteDialog } })
export default class TenantDeleteDialog extends DeleteDialogComponent<ITenant> {
  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<ITenant> {
    const format: ITenantResponseFormat = {};
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
  onDelete() {
    this.delete();
  }

  // Called after cancel button is clicked.
  onCancel() {
    this.cancel();
  }
}
</script>

