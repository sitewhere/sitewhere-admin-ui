<template>
  <tenant-dialog
    ref="dialog"
    title="Create Tenant"
    width="600"
    resetOnOpen="true"
    createLabel="Create"
    cancelLabel="Cancel"
    @payload="commit"
  />
</template>

<script lang="ts">
import {
  CreateDialogComponent,
  DialogComponent
} from "../../libraries/component-model";
import { Component } from "vue-property-decorator";
import { Refs } from "../../libraries/navigation-model";

import TenantDialog from "./TenantDialog.vue";

import { AxiosPromise } from "axios";
import { ITenant } from "sitewhere-rest-api";
import { createTenant } from "../../rest/sitewhere-tenants-api";

@Component({
  components: {
    TenantDialog
  }
})
export default class TenantCreateDialog extends CreateDialogComponent<ITenant> {
  // References.
  $refs!: Refs<{
    dialog: DialogComponent;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent {
    return this.$refs.dialog;
  }

  /** Implemented in subclasses to save payload */
  save(payload: ITenant): AxiosPromise<ITenant> {
    return createTenant(this.$store, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: ITenant): void {
    this.$emit("tenantAdded", payload);
  }
}
</script>

<style scoped>
</style>
