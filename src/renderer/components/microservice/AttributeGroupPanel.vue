<template>
  <v-container fluid>
    <attribute-field-panel
      class="mb-2"
      v-for="attribute in attributeGroup.attributes"
      :key="attribute.name"
      :attribute="attribute"
      :identifier="identifier"
      :tenantToken="tenantToken"
      :readOnly="readOnly"
      @attributeUpdated="onAttributeUpdated"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

import {
  IConfiguredAttributeGroup,
  IAttributeUpdate
} from "./ConfigurationModel";

import AttributeFieldPanel from "./AttributeFieldPanel.vue";

@Component({
  components: {
    AttributeFieldPanel
  }
})
export default class AttributeGroupPanel extends Vue {
  @Prop() readonly attributeGroup!: IConfiguredAttributeGroup;
  @Prop({ default: false }) readonly readOnly!: boolean;
  @Prop() readonly identifier!: string;
  @Prop() readonly tenantToken!: string;

  onAttributeUpdated(updated: IAttributeUpdate) {
    this.$emit("attributeUpdated", updated);
  }
}
</script>
