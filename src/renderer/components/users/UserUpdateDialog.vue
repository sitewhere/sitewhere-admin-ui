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
import {
  Component,
  EditDialogComponent,
  DialogComponent,
  Refs
} from "sitewhere-ide-common";

import UserDialog from "./UserDialog.vue";

import { AxiosPromise } from "axios";
import {
  IUser,
  IUserCreateRequest,
  IUserResponseFormat
} from "sitewhere-rest-api";
import { getUser, updateUser } from "../../rest/sitewhere-users-api";

@Component({
  components: {
    UserDialog
  }
})
export default class UserUpdateDialog extends EditDialogComponent<
  IUser,
  IUserCreateRequest
> {
  // References.
  $refs!: Refs<{
    dialog: DialogComponent<IUser>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IUser> {
    return this.$refs.dialog;
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
