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
          <font-awesome-icon class="mr-1 red--text" icon="asterisk" size="xs" slot="activator"/>
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
        v-else-if="attribute.type === 'DeviceTypeReference'"
        v-model="editedConstValue"
      />
      <customer-selector
        v-else-if="attribute.type === 'CustomerReference'"
        v-model="editedConstValue"
      />
      <area-selector v-else-if="attribute.type === 'AreaReference'" v-model="editedConstValue"/>
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

<script>
import DeviceTypeSelector from "../devicetypes/DeviceTypeSelector";
import CustomerSelector from "../customers/CustomerSelector";
import AreaSelector from "../areas/AreaSelector";
import ScriptsSelector from "../microservice/ScriptsSelector";

export default {
  data: () => ({
    editedBooleanValue: true,
    editedConstValue: null,
    editedEnvVar: null,
    displayValue: null
  }),

  components: {
    DeviceTypeSelector,
    CustomerSelector,
    AreaSelector,
    ScriptsSelector
  },

  props: ["attribute", "readOnly", "identifier", "tenantToken"],

  watch: {
    attribute: {
      immediate: true,
      handler(attr, old) {
        let val = attr ? attr.value : null;
        if (val && val.startsWith("${") && val.endsWith("}")) {
          let content = val.substring(2);
          content = content.substring(0, content.length - 1);
          let parts = content.split(":");
          this.$data.editedBooleanValue = parts[1] && parts[1] === "true";
          this.$data.editedConstValue = parts[1];
          this.$data.editedEnvVar = parts[0];
          this.$data.displayValue = parts[1];
        } else {
          this.$data.editedBooleanValue = val && val === "true";
          this.$data.editedConstValue = val;
          this.$data.editedEnvVar = null;
          if (!val && this.readOnly && attr.default) {
            this.$data.displayValue = "(Defaulted to " + attr.default + ")";
          } else {
            this.$data.displayValue = val;
          }
        }
      }
    },

    /** Push update */
    editedBooleanValue: function(val) {
      this.$data.editedConstValue = "" + val;
      this.onValueUpdated();
    },

    /** Push update */
    editedConstValue: function(val) {
      this.onValueUpdated();
    },

    /** Push update */
    editedEnvVar: function(val) {
      this.onValueUpdated();
    }
  },

  methods: {
    onValueUpdated: function() {
      let val = this.$data.editedConstValue;
      let env = this.$data.editedEnvVar;
      let newValue;

      if (val && val.length > 0) {
        newValue = env ? "${" + env + ":" + val + "}" : val;
      } else {
        newValue = env ? "${" + env + "}" : null;
      }

      if (newValue && newValue !== this.attribute.value) {
        var updated = {};
        updated.attribute = this.attribute;
        updated.oldValue = this.attribute.value;
        updated.newValue = newValue;
        this.$emit("attributeUpdated", updated);
      }
    }
  }
};
</script>

<style scoped>
.attr-row {
  position: relative;
}
.attr-name {
  position: absolute;
  bottom: 5px;
}
.attr-env {
  position: absolute;
  bottom: 0px;
}
</style>
