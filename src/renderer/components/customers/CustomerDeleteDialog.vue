<template>
  <sw-delete-dialog
    ref="dialog"
    title="Delete Customer Type"
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
import { ICustomer, ICustomerResponseFormat } from "sitewhere-rest-api";
import {
  getCustomer,
  deleteCustomer
} from "../../rest/sitewhere-customers-api";

@Component({})
export default class CustomerDeleteDialog extends DeleteDialogComponent<
  ICustomer
> {
  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<ICustomer> {
    let format: ICustomerResponseFormat = {};
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
