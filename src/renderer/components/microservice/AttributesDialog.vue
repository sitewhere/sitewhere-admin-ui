<template>
  <sw-base-dialog
    ref="dialog"
    :tabbed="false"
    :icon="icon"
    :title="title"
    :width="width"
    :loaded="loaded"
    :visible="dialogVisible"
    :createLabel="createLabel"
    :cancelLabel="cancelLabel"
    @createClicked="onCreateClicked"
    @cancelClicked="onCancelClicked"
  >
    <component-attributes
      :context="context"
      :groups="groups"
      :readOnly="false"
      :identifier="identifier"
      :tenantToken="tenantToken"
      @initialValues="onInitialValues"
      @valuesUpdated="onValuesUpdated"
    />
  </sw-base-dialog>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  DialogComponent,
  ITabbedComponent,
  Refs
} from "sitewhere-ide-common";
import { NavigationIcon } from "../../libraries/constants";

import {
  IConfiguredAttributeGroup,
  IConfigurationContext,
  AttributeValues
} from "./ConfigurationModel";

import ComponentAttributes from "./ComponentAttributes.vue";

@Component({
  components: {
    ComponentAttributes
  }
})
export default class AttributesDialog extends DialogComponent<AttributeValues> {
  @Prop() readonly context!: IConfigurationContext;
  @Prop({ default: [] }) readonly groups!: IConfiguredAttributeGroup[];
  @Prop() readonly identifier!: string;
  @Prop() readonly tenantToken!: string;

  attributeValues: AttributeValues = {};

  // References.
  $refs!: Refs<{
    dialog: ITabbedComponent;
  }>;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceType;
  }

  // Reset dialog contents.
  reset() {
    this.attributeValues = {};
  }

  // Load dialog from a given payload.
  load(payload: AttributeValues) {
    this.reset();
    this.attributeValues = payload;
  }

  // Called after create button is clicked.
  onCreateClicked(e: any) {
    this.$emit("payload", this.attributeValues);
  }

  /** Called with initial attribute values */
  onInitialValues(values: AttributeValues) {
    this.attributeValues = values;
  }

  // Called when attribute values are updated.
  onValuesUpdated(values: AttributeValues) {
    this.attributeValues = values;
  }
}
</script>

<style scoped>
</style>
