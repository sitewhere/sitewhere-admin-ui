<template>
  <v-card flat v-if="content">
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
        <v-tooltip left>
          <v-icon
            slot="activator"
            class="ref--text text--darken-2 ml-2"
            @click="onConfirmDelete(contextElement)"
          >cancel</v-icon>
          <span>Delete Element</span>
        </v-tooltip>
        <v-tooltip left>
          <v-icon
            large
            slot="activator"
            class="green--text text--darken-2 ml-2"
            @click="onPushContext(contextElement)"
          >arrow_forward</v-icon>
          <span>Open Element</span>
        </v-tooltip>
      </v-toolbar>
    </v-card-text>
    <element-delete-dialog ref="delete" :content="content" @deleted="onDeleteComponent"/>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Refs } from "sitewhere-ide-common";
import ElementPlaceholder from "./ElementPlaceholder.vue";
import ElementDeleteDialog from "./ElementDeleteDialog.vue";
import { IConfiguredContent, IConfiguredElement } from "./ConfigurationModel";
import { IElementNode } from "sitewhere-rest-api";

@Component({
  components: {
    ElementPlaceholder,
    ElementDeleteDialog
  }
})
export default class ComponentContent extends Vue {
  @Prop() readonly content!: IConfiguredContent;

  // References.
  $refs!: Refs<{
    delete: ElementDeleteDialog;
  }>;

  // Compute element title.
  elementTitle(element: IConfiguredElement) {
    let title = element.name;
    if (element.resolvedIndexAttribute) {
      title += " (" + element.resolvedIndexAttribute.value + ")";
    }
    return title;
  }

  /** Add a component */
  onAddComponent(option: IElementNode) {
    this.$emit("addComponent", option);
  }

  /** Confirm delete for component */
  onConfirmDelete(child: IConfiguredElement) {
    this.$refs.delete.open(child.id);
  }

  /** Delete a component */
  onDeleteComponent(child: IConfiguredElement) {
    this.$emit("deleteComponent", child);
  }

  /** Push a context onto the stack */
  onPushContext(context: IConfiguredElement) {
    this.$emit("pushContext", context);
  }
}
</script>
