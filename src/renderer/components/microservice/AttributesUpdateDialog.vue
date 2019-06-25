<template>
  <attributes-dialog
    ref="dialog"
    :title="componentName"
    width="900"
    createLabel="Update"
    cancelLabel="Cancel"
    @payload="onSave"
    :context="context"
    :groups="groups"
    :identifier="identifier"
    :tenantToken="tenantToken"
  />
</template>

<script lang="ts">
import {
  Component,
  Prop,
  EditDialogComponent,
  DialogComponent,
  Refs
} from "sitewhere-ide-common";

import {
  IConfiguredAttributeGroup,
  IConfigurationContext,
  AttributeValues
} from "./ConfigurationModel";

import AttributesDialog from "./AttributesDialog.vue";

@Component({
  components: {
    AttributesDialog
  }
})
export default class AttributesUpdateDialog extends EditDialogComponent<
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

  /** Component name shown in title */
  get componentName() {
    return this.context ? this.context.model.name : "Component";
  }

  /** Get wrapped dialog */
  getDialog(): DialogComponent<any> {
    return this.$refs.dialog;
  }

  /** Load payload */
  prepareLoad(identifier: string): AttributeValues {
    return [];
  }

  /** Save payload */
  prepareSave(
    original: AttributeValues,
    updated: AttributeValues
  ): AttributeValues {
    return updated;
  }

  /** Called on payload commit */
  onSave(payload: AttributeValues): void {
    this.save(payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: AttributeValues): void {
    this.$emit("attributesSaved", payload);
  }
}
</script>
