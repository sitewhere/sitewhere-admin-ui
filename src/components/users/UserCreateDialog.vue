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
import { Component, Ref } from "vue-property-decorator";
import { createUser } from "sitewhere-ide-common";
import { CreateDialogComponent } from "sitewhere-ide-components";

import UserDialog from "./UserDialog.vue";

import { AxiosPromise } from "axios";
import { IUser, IUserCreateRequest } from "sitewhere-rest-api";

@Component({
  components: {
    UserDialog
  }
})
export default class UserCreateDialog extends CreateDialogComponent<
  IUser,
  IUserCreateRequest
> {
  @Ref() readonly dialog!: UserDialog;

  /** Get wrapped dialog */
  getDialog(): UserDialog {
    return this.dialog;
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
