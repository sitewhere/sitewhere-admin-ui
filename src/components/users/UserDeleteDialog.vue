<template>
  <sw-delete-dialog
    ref="dialog"
    title="Delete User"
    width="400"
    :visible="visible"
    @delete="onDelete"
    @cancel="onCancel"
  >
    <v-card-text>{{ message }}</v-card-text>
  </sw-delete-dialog>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { getUser, deleteUser } from "sitewhere-ide-common";
import { DeleteDialogComponent } from "sitewhere-ide-components";

import { AxiosPromise } from "axios";
import { IUser, IUserResponseFormat } from "sitewhere-rest-api";

@Component({})
export default class UserDeleteDialog extends DeleteDialogComponent<IUser> {
  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IUser> {
    const format: IUserResponseFormat = {};
    return getUser(this.$store, identifier, format);
  }

  /** Called after record is loaded */
  afterLoad(user: IUser): void {
    this.message = `Are you sure you want to delete '${user.firstName} ${user.lastName}'?`;
  }

  /** Load payload */
  prepareDelete(user: IUser): AxiosPromise<IUser> {
    return deleteUser(this.$store, user.username);
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
