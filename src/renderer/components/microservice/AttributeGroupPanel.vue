<template>
  <v-tabs-content :id="attributeGroup.uid">
    <v-card>
      <v-card-text class="subheading pa-0 pl-2">
        <v-container fluid>
          <attribute-field-panel
            v-for="attribute in attributeGroup.attributes"
            :key="attribute.name"
            :attribute="attribute"
            :identifier="identifier"
            :tenantToken="tenantToken"
            :readOnly="readOnly"
            @attributeUpdated="onAttributeUpdated"
          ></attribute-field-panel>
        </v-container>
      </v-card-text>
    </v-card>
  </v-tabs-content>
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
