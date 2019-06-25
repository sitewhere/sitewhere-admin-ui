<template>
  <sw-base-dialog
    ref="dialog"
    :icon="icon"
    :title="title"
    :width="width"
    :loaded="loaded"
    :visible="dialogVisible"
    :createLabel="createLabel"
    :cancelLabel="cancelLabel"
    @createClicked="onCreateClicked"
    @cancelClicked="onCancelClicked"
    :lazy="true"
  >
    <template slot="tabs">
      <v-tab v-for="group in groups" :key="group.name">{{ group.name }}</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item v-for="group in groups" :key="group.name">
        <attribute-group-panel
          :attributeGroup="group"
          :readOnly="readOnly"
          :identifier="identifier"
          :tenantToken="tenantToken"
          @attributeUpdated="onAttributeUpdated"
        />
      </v-tab-item>
    </template>
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
  AttributeValues,
  IAttributeUpdate
} from "./ConfigurationModel";

import AttributeGroupPanel from "./AttributeGroupPanel.vue";

@Component({
  components: {
    AttributeGroupPanel
  }
})
export default class AttributesDialog extends DialogComponent<AttributeValues> {
  @Prop() readonly context!: IConfigurationContext;
  @Prop({ default: [] }) readonly groups!: IConfiguredAttributeGroup[];
  @Prop() readonly identifier!: string;
  @Prop() readonly tenantToken!: string;
  @Prop({ default: false }) readonly readOnly!: boolean;

  attributeValues: AttributeValues = {};
  dirty: boolean = false;

  // References.
  $refs!: Refs<{
    dialog: ITabbedComponent;
  }>;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceType;
  }

  /** Load initial attribute values from groups */
  loadAttributesFromGroups() {
    let values: AttributeValues = {};
    this.groups.forEach(group => {
      group.attributes.forEach(attribute => {
        let value = attribute.value;
        if (value) {
          values[attribute.localName] = value;
        }
      });
    });
    this.attributeValues = values;
    this.$emit("initialValues", values);
  }

  /** Handle attribute updated */
  onAttributeUpdated(updated: IAttributeUpdate) {
    this.attributeValues[updated.attribute.localName] = updated.newValue;
    this.dirty = true;
  }

  // Reset dialog contents.
  reset() {
    this.attributeValues = {};
  }

  // Load dialog from a given payload.
  load(payload: AttributeValues) {
    this.reset();
    this.loadAttributesFromGroups();
  }

  // Called after create button is clicked.
  onCreateClicked(e: any) {
    this.$emit("payload", this.attributeValues);
  }
}
</script>
