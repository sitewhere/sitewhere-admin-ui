<template>
  <user-dialog
    ref="dialog"
    title="Create User"
    width="600"
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

import UserDialog from "./UserDialog.vue";

import { AxiosPromise } from "axios";
import { IUser, IUserCreateRequest } from "sitewhere-rest-api";
import { createUser } from "../../rest/sitewhere-users-api";

@Component({
  components: {
    UserDialog
  }
})
export default class UserCreateDialog extends CreateDialogComponent<
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

  /** Called on payload commit */
  onCommit(payload: IUserCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(payload: IUserCreateRequest): AxiosPromise<IUser> {
    return createUser(this.$store, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IUser): void {
    this.$emit("userAdded", payload);
  }
}
</script>

<style scoped>
</style>
