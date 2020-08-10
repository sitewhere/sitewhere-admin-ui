<template>
  <delete-dialog
    ref="dialog"
    title="Delete Customer Type"
    width="400"
    :visible="visible"
    @delete="onDelete"
    @cancel="onCancel"
  >
    <v-card-text>{{ message }}</v-card-text>
  </delete-dialog>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { getCustomer, deleteCustomer } from "sitewhere-ide-common";
import { DeleteDialogComponent, DeleteDialog } from "sitewhere-ide-components";

import { AxiosPromise } from "axios";
import { ICustomer, ICustomerResponseFormat } from "sitewhere-rest-api";

@Component({ components: { DeleteDialog } })
export default class CustomerDeleteDialog extends DeleteDialogComponent<
  ICustomer
> {
  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<ICustomer> {
    const format: ICustomerResponseFormat = {};
    return getCustomer(this.$store, identifier, format);
  }

  /** Called after record is loaded */
  afterLoad(customer: ICustomer): void {
    this.message = `Are you sure you want to delete '${customer.name}'?`;
  }

  /** Load payload */
  prepareDelete(customer: ICustomer): AxiosPromise<ICustomer> {
    return deleteCustomer(this.$store, customer.token);
  }

  /** Called after create button is clicked */
  onDelete() {
    this.delete();
  }

  /** Called after cancel button is clicked */
  onCancel() {
    this.cancel();
  }
}
</script>
