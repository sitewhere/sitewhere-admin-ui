<template>
  <attributes-dialog
    ref="dialog"
    title="Create Tenant"
    width="600"
    createLabel="Create"
    cancelLabel="Cancel"
    :context="context"
    :groups="groups"
    :identifier="identifier"
    :tenantToken="tenantToken"
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

import {
  IConfiguredAttributeGroup,
  IConfigurationContext,
  AttributeValues
} from "./ConfigurationModel";

import AttributesDialog from "./AttributesDialog.vue";

import { AxiosPromise } from "axios";

@Component({
  components: {
    AttributesDialog
  }
})
export default class AttributesCreateDialog extends CreateDialogComponent<
  AttributeValues,
  AttributeValues
> {
  @Prop() readonly context!: IConfigurationContext;
  @Prop({ default: [] }) readonly groups!: IConfiguredAttributeGroup[];
  @Prop() readonly identifier!: string;
  @Prop() readonly tenantToken!: string;

  // References.
  $refs!: Refs<{
    dialog: DialogComponent<any>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<any> {
    return this.$refs.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: AttributeValues): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(payload: AttributeValues): AttributeValues {
    return payload;
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: AttributeValues): void {
    this.$emit("componentAdded", payload);
  }
}
</script>

<style scoped>
</style>
