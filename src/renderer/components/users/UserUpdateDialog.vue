<template>
  <user-dialog
    ref="dialog"
    title="Update User"
    :loaded="loaded"
    createLabel="Update"
    cancelLabel="Cancel"
    @payload="onSave"
  />
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { getUser, updateUser } from "sitewhere-ide-common";
import { EditDialogComponent } from "sitewhere-ide-components";

import UserDialog from "./UserDialog.vue";

import { AxiosPromise } from "axios";
import {
  IUser,
  IUserCreateRequest,
  IUserResponseFormat
} from "sitewhere-rest-api";

@Component({
  components: {
    UserDialog
  }
})
export default class UserUpdateDialog extends EditDialogComponent<
  IUser,
  IUserCreateRequest
> {
  @Ref() readonly dialog!: UserDialog;

  /** Get wrapped dialog */
  getDialog(): UserDialog {
    return this.dialog;
  }

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IUser> {
    let format: IUserResponseFormat = {};
    return getUser(this.$store, identifier, format);
  }

  /** Save payload */
  prepareSave(
    original: IUser,
    updated: IUserCreateRequest
  ): AxiosPromise<IUser> {
    return updateUser(this.$store, original.username, updated);
  }

  /** Called on payload commit */
  onSave(payload: IUserCreateRequest): void {
    this.save(payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IUser): void {
    this.$emit("userUpdated", payload);
  }
}
</script>

<style scoped>
</style>
