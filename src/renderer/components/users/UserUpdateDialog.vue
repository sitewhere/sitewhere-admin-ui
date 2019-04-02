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
  EditDialogComponent,
  DialogComponent
} from "../../libraries/component-model";
import { Component, Prop } from "vue-property-decorator";
import { Refs } from "../../libraries/navigation-model";

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
export default class TenantUpdateDialog extends EditDialogComponent<
  IUser,
  IUserCreateRequest
> {
  @Prop() readonly userToken!: string;

  // References.
  $refs!: Refs<{
    dialog: DialogComponent<IUser>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IUser> {
    return this.$refs.dialog;
  }

  /** Load payload */
  load(): AxiosPromise<IUser> {
    let format: IUserResponseFormat = {};
    return getUser(this.$store, this.userToken, format);
  }

  /** Called on payload commit */
  onCommit(payload: IUserCreateRequest): void {
    this.commit(payload);
  }

  /** Save payload */
  save(payload: IUserCreateRequest): AxiosPromise<IUser> {
    return updateUser(this.$store, this.userToken, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IUser): void {
    this.$emit("userUpdated", payload);
  }
}
</script>

<style scoped>
</style>
