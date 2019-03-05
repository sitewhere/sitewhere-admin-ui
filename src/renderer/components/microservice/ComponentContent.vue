<template>
  <div v-if="content">
    <v-card-text class="pa-0" v-for="contextElement in content.elements" :key="contextElement.id">
      <element-placeholder
        v-if="!contextElement.hasContent"
        :contextElement="contextElement"
        @addComponent="onAddComponent"
      ></element-placeholder>
      <v-toolbar v-else flat light class="grey lighten-4">
        <font-awesome-icon class="grey--text text--darken-2" :icon="contextElement.icon" size="lg"/>
        <v-toolbar-title class="black--text">{{ elementTitle(contextElement) }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <element-delete-dialog
          :element="contextElement"
          @elementDeleted="onDeleteComponent(contextElement)"
        ></element-delete-dialog>
        <v-btn class="green darken-2 white--text mr-3" @click="onPushContext(contextElement)">
          <v-icon class="white--text mr-2 mt-0">fa-arrow-right</v-icon>Open
        </v-btn>
      </v-toolbar>
    </v-card-text>
  </div>
</template>

<script>
import ElementPlaceholder from "./ElementPlaceholder";
import ElementDeleteDialog from "./ElementDeleteDialog";

export default {
  data: () => ({
    active: null,
    formValid: true
  }),

  props: ["content"],

  components: {
    ElementPlaceholder,
    ElementDeleteDialog
  },

  methods: {
    // Compute element title.
    elementTitle: function(element) {
      let title = element.name;
      if (element.resolvedIndexAttribute) {
        title += " (" + element.resolvedIndexAttribute + ")";
      }
      return title;
    },

    /** Add a component */
    onAddComponent: function(option) {
      this.$emit("addComponent", option);
    },

    /** Delete a component */
    onDeleteComponent: function(child) {
      this.$emit("deleteComponent", child);
    },

    /** Push a context onto the stack */
    onPushContext: function(context) {
      this.$emit("pushContext", context);
    }
  }
};
</script>

<style scoped>
</style>
