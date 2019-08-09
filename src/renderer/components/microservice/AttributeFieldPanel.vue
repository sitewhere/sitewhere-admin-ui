<template>
  <v-layout row wrap class="attr-row">
    <v-flex xs3 class="pr-4">
      <div class="attr-name">
        <span class="subheading">{{ attribute.name }}</span>:
        <v-tooltip right>
          <font-awesome-icon
            class="grey--text text--lighten-2"
            icon="question-circle"
            size="sm"
            slot="activator"
          />
          <span>{{ attribute.description }}</span>
        </v-tooltip>
        <v-tooltip top v-if="attribute.required">
          <font-awesome-icon class="mr-1 red--text" icon="asterisk" size="xs" slot="activator" />
          <span>Attribute is required</span>
        </v-tooltip>
      </div>
    </v-flex>
    <v-flex xs7>
      <v-text-field
        v-if="readOnly"
        :required="attribute.required"
        v-model="displayValue"
        hide-details
        single-line
        disabled
      ></v-text-field>
      <v-select
        v-else-if="attribute.choices"
        :items="attribute.choices"
        hide-details
        v-model="editedConstValue"
        item-text="name"
        item-value="value"
      ></v-select>
      <v-text-field
        v-else-if="attribute.type === 'String'"
        :required="attribute.required"
        v-model="editedConstValue"
        hide-details
        single-line
      ></v-text-field>
      <v-text-field
        v-else-if="attribute.type === 'Integer'"
        :required="attribute.required"
        type="number"
        v-model="editedConstValue"
        hide-details
        single-line
      ></v-text-field>
      <v-switch
        v-else-if="attribute.type === 'Boolean'"
        :label="attribute.name"
        v-model="editedBooleanValue"
        hide-details
      ></v-switch>
      <device-type-selector
        :dense="true"
        v-else-if="attribute.type === 'DeviceTypeReference'"
        v-model="editedConstValue"
      />
      <customer-selector
        :dense="true"
        v-else-if="attribute.type === 'CustomerReference'"
        v-model="editedConstValue"
      />
      <area-selector
        :dense="true"
        v-else-if="attribute.type === 'AreaReference'"
        v-model="editedConstValue"
      />
      <scripts-selector
        v-else-if="attribute.type === 'Script'"
        v-model="editedConstValue"
        :identifier="identifier"
        :tenantToken="tenantToken"
      />
    </v-flex>
    <v-flex xs2 class="pl-4">
      <div class="attr-env">
        <span v-if="readOnly && editedEnvVar">
          <v-icon small>arrow_back</v-icon>
          {{editedEnvVar}}
        </span>
        <v-text-field
          v-else-if="!readOnly"
          v-model="editedEnvVar"
          hide-details
          placeholder="Env Variable"
        />
      </div>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "sitewhere-ide-common";

import { IConfiguredAttribute, IAttributeUpdate } from "./ConfigurationModel";

import DeviceTypeSelector from "../devicetypes/DeviceTypeSelector.vue";
import CustomerSelector from "../customers/CustomerSelector.vue";
import AreaSelector from "../areas/AreaSelector.vue";
import ScriptsSelector from "../microservice/ScriptsSelector.vue";

@Component({
  components: {
    DeviceTypeSelector,
    CustomerSelector,
    AreaSelector,
    ScriptsSelector
  }
})
export default class ComponentAttributes extends Vue {
  @Prop() readonly attribute!: IConfiguredAttribute;
  @Prop({ default: false }) readonly readOnly!: boolean;
  @Prop() readonly identifier!: string;
  @Prop() readonly tenantToken!: string;

  editedBooleanValue: boolean = true;
  editedConstValue: any | null = null;
  editedEnvVar: any | null = null;
  displayValue: any | null = null;

  // Handle attribute updates.
  @Watch("attribute", { immediate: true }) onAttributeUpdated(
    attr: IConfiguredAttribute,
    old: IConfiguredAttribute
  ) {
    let val = attr ? attr.value : null;
    if (val && val.startsWith("${") && val.endsWith("}")) {
      let content = val.substring(2);
      content = content.substring(0, content.length - 1);
      let parts: string[] = content.split(":");
      this.editedBooleanValue = parts && parts[1] === "true";
      this.editedConstValue = parts[1];
      this.editedEnvVar = parts[0];
      this.displayValue = parts[1];
    } else {
      this.editedBooleanValue = val !== null && val === "true";
      this.editedConstValue = val;
      this.editedEnvVar = null;
      if (!val && this.readOnly && attr.default) {
        this.displayValue = "(Defaulted to " + attr.default + ")";
      } else {
        this.displayValue = val;
      }
    }
  }

  // Handle boolean value updates.
  @Watch("editedBooleanValue") onBooleanValueUpdated(val: any, oldVal: any) {
    this.editedConstValue = "" + val;
    this.onValueUpdated();
  }

  // Handle boolean value updates.
  @Watch("editedConstValue") onConstantValueUpdated(val: any, oldVal: any) {
    this.onValueUpdated();
  }

  // Handle boolean value updates.
  @Watch("editedEnvVar") onEnvVarUpdated(val: any, oldVal: any) {
    this.onValueUpdated();
  }

  onValueUpdated() {
    let val = this.editedConstValue;
    let env = this.editedEnvVar;
    let newValue;

    if (val && val.length > 0) {
      newValue = env ? "${" + env + ":" + val + "}" : val;
    } else {
      newValue = env ? "${" + env + "}" : null;
    }

    if (newValue && newValue !== this.attribute.value) {
      var updated: IAttributeUpdate = {
        attribute: this.attribute,
        newValue: newValue
      };
      this.$emit("attributeUpdated", updated);
    }
  }
}
</script>

<style scoped>
.attr-row {
  position: relative;
}
.attr-name {
  position: absolute;
  bottom: 0px;
  width: 200px;
}
.attr-env {
  position: absolute;
  bottom: 0px;
}
</style>
