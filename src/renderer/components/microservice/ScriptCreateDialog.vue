<template>
  <script-dialog
    ref="dialog"
    title="Create Script"
    width="700"
    resetOnOpen="true"
    :identifier="identifier"
    :scriptCategories="scriptCategories"
    createLabel="Create"
    cancelLabel="Cancel"
    @payload="onCommit"
  />
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { createTenantScript } from "sitewhere-ide-common";
import {
  CreateDialogComponent,
  DialogComponent
} from "sitewhere-ide-components";

import ScriptDialog from "./ScriptDialog.vue";

import { AxiosPromise } from "axios";
import {
  IScriptCreateRequest,
  IScriptMetadata,
  IScriptCategory
} from "sitewhere-rest-api";

@Component({
  components: {
    ScriptDialog
  }
})
export default class ScriptCreateDialog extends CreateDialogComponent<
  IScriptMetadata,
  IScriptCreateRequest
> {
  @Prop() readonly identifier!: string;
  @Prop() readonly tenantToken!: string;
  @Prop() readonly scriptCategories!: IScriptCategory[];
  @Ref() readonly dialog!: DialogComponent<IScriptMetadata>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IScriptMetadata> {
    return this.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: IScriptCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(payload: IScriptCreateRequest): AxiosPromise<IScriptMetadata> {
    return createTenantScript(
      this.$store,
      this.identifier,
      this.tenantToken,
      payload
    );
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IScriptMetadata): void {
    this.$emit("scriptAdded", payload.id);
  }
}
</script>
