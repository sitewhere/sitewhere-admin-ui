<template>
  <div>
    <v-form v-if="groups && groups.length > 0" v-model="formValid" ref="form" lazy-validation>
      <v-tabs v-model="active">
        <v-tab v-for="group in groups" :key="group.uid">{{ group.name }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="active">
        <v-tab-item v-for="group in groups" :key="group.uid">
          <attribute-group-panel
            :attributeGroup="group"
            :readOnly="readOnly"
            :identifier="identifier"
            :tenantToken="tenantToken"
            :key="group.uid"
            @attributeUpdated="onAttributeUpdated"
          />
        </v-tab-item>
      </v-tabs-items>
    </v-form>
    <v-card v-else-if="!readOnly">
      <v-card-text>This component does not contain any configurable attributes.</v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "sitewhere-ide-common";

import {
  IConfiguredAttributeGroup,
  IConfigurationContext,
  IAttributeUpdate,
  AttributeValues
} from "./ConfigurationModel";

import AttributeGroupPanel from "./AttributeGroupPanel.vue";

@Component({
  components: {
    AttributeGroupPanel
  }
})
export default class ComponentAttributes extends Vue {
  @Prop() readonly context!: IConfigurationContext;
  @Prop({ default: [] }) readonly groups!: IConfiguredAttributeGroup[];
  @Prop({ default: false }) readonly readOnly!: boolean;
  @Prop({ default: false }) readonly dirty!: boolean;
  @Prop() readonly identifier!: string;
  @Prop() readonly tenantToken!: string;

  active: string | null = null;
  formValid: boolean = true;
  attributeValues: AttributeValues = {};

  // Handle rebuilding groups.
  @Watch("groups") onGroupsUpdated(
    val: IConfiguredAttributeGroup[],
    oldVal: IConfiguredAttributeGroup[]
  ) {
    if (val && val.length > 0) {
      this.loadAttributesFromGroups(val);
    }
  }

  /** Load initial attribute values from groups */
  loadAttributesFromGroups(groups: IConfiguredAttributeGroup[]) {
    let values: AttributeValues = {};
    groups.forEach(group => {
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
    this.$emit("valuesUpdated", this.attributeValues);
  }
}
</script>

<style scoped>
</style>
