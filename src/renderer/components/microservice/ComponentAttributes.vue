<template>
  <div>
    <v-form v-if="groups && groups.length > 0" v-model="formValid" ref="form" lazy-validation>
      <v-tabs v-model="active">
        <v-tabs-bar dark color="primary">
          <v-tabs-item
            v-for="group in groups"
            :key="group.uid"
            :href="'#' + group.uid"
          >{{ group.name }}</v-tabs-item>
        </v-tabs-bar>
        <v-tabs-items>
          <attribute-group-panel
            v-for="group in groups"
            :attributeGroup="group"
            :readOnly="readOnly"
            :identifier="identifier"
            :tenantToken="tenantToken"
            :key="group.uid"
            @attributeUpdated="onAttributeUpdated"
          ></attribute-group-panel>
        </v-tabs-items>
      </v-tabs>
    </v-form>
    <v-card v-else-if="!readOnly">
      <v-card-text>This component does not contain any configurable attributes.</v-card-text>
    </v-card>
  </div>
</template>

<script>
import AttributeGroupPanel from "./AttributeGroupPanel";

export default {
  data: () => ({
    active: null,
    formValid: true,
    attributeValues: null
  }),

  props: [
    "context",
    "groups",
    "readOnly",
    "dirty",
    "identifier",
    "tenantToken"
  ],

  components: {
    AttributeGroupPanel
  },

  watch: {
    // Update tab and attribute values when groups are updated.
    groups: {
      immediate: true,
      handler(val, old) {
        if (val && val.length > 0) {
          this.$data.active = val[0].uid;
          this.loadAttributesFromGroups(val);
        }
      }
    }
  },

  methods: {
    /** Load initial attribute values from groups */
    loadAttributesFromGroups: function(groups) {
      console.log(this.identifier);
      let values = {};
      for (const group of groups) {
        for (const attribute of group.attributes) {
          let value = attribute.value;
          if (value) {
            values[attribute.localName] = value;
          }
        }
      }
      this.$data.attributeValues = values;
      this.$emit("initialValues", values);
    },

    /** Handle attribute updated */
    onAttributeUpdated: function(updated) {
      let values = this.$data.attributeValues;
      values[updated.attribute.localName] = updated.newValue;
      this.$emit("valuesUpdated", values);
    }
  }
};
</script>

<style scoped>
</style>
