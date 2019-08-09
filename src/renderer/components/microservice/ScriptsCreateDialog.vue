<template>
  <scripts-dialog
    ref="dialog"
    title="Create Script"
    width="700"
    resetOnOpen="true"
    :identifier="identifier"
    createLabel="Create"
    cancelLabel="Cancel"
    @payload="onCommit"
  />
</template>

<script lang="ts">
import {
  Component,
  Prop,
  CreateDialogComponent,
  DialogComponent,
  Refs
} from "sitewhere-ide-common";

import ScriptsDialog from "./ScriptsDialog.vue";

import { AxiosPromise } from "axios";
import { IScriptCreateRequest, IScriptMetadata } from "sitewhere-rest-api";
import {
  createGlobalScript,
  createTenantScript
} from "../../rest/sitewhere-scripting-api";

@Component({
  components: {
    ScriptsDialog
  }
})
export default class ScriptsCreateDialog extends CreateDialogComponent<
  IScriptMetadata,
  IScriptCreateRequest
> {
  @Prop() readonly identifier!: string;
  @Prop() readonly tenantToken!: string;

  // References.
  $refs!: Refs<{
    dialog: DialogComponent<any>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IScriptMetadata> {
    return this.$refs.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: IScriptCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(payload: IScriptCreateRequest): AxiosPromise<IScriptMetadata> {
    if (!this.tenantToken) {
      return createGlobalScript(this.$store, this.identifier, payload);
    } else {
      return createTenantScript(
        this.$store,
        this.identifier,
        this.tenantToken,
        payload
      );
    }
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IScriptMetadata): void {
    this.$emit("scriptAdded", payload.id);
  }
}
</script>
