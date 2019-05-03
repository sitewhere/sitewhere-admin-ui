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

<script>
import AttributeFieldPanel from "./AttributeFieldPanel";

export default {
  data: () => ({}),

  props: ["attributeGroup", "readOnly", "identifier", "tenantToken"],

  components: {
    AttributeFieldPanel
  },

  methods: {
    onAttributeUpdated: function(updated) {
      this.$emit("attributeUpdated", updated);
    }
  }
};
</script>

<style scoped>
</style>
