<template>
  <sw-content-tab :tabkey="tabkey" :loaded="loaded" loadingMessage="Loading...">
    <template slot="header">
      <microservice-banner
        :context="context"
        :contextStack="contextStack"
        @popContext="onPopContext"
        @popToContext="onPopToContext"
        @configureCurrent="onOpenUpdateDialog"
      />
      <v-divider/>
    </template>
    <!-- Banner shown above microservice content -->
    <!-- Attributes -->
    <v-card flat>
      <v-tabs v-model="active" v-if="groups.length > 0">
        <v-tab v-for="group in groups" :key="group.name">{{ group.name }}</v-tab>
        <slot name="tab-items"/>
        <v-tab-item v-for="group in groups" :key="group.name">
          <attribute-group-panel
            :attributeGroup="group"
            :readOnly="true"
            :identifier="identifier"
            :tenantToken="tenantToken"
          />
        </v-tab-item>
      </v-tabs>
    </v-card>
    <!-- Elements -->
    <component-content
      :content="content"
      @addComponent="onAddComponent"
      @pushContext="onPushChildContext"
      @deleteComponent="onDeleteComponent"
    />
    <template slot="dialogs">
      <attributes-create-dialog
        ref="create"
        :context="editingContext"
        :groups="editingGroups"
        :identifier="identifier"
        :tenantToken="tenantToken"
        @attributesSaved="onCommitAddedComponent"
      />
      <attributes-update-dialog
        ref="update"
        :context="editingContext"
        :groups="editingGroups"
        :identifier="identifier"
        :tenantToken="tenantToken"
        @attributesSaved="onAttributesUpdated"
      />
    </template>
  </sw-content-tab>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Refs } from "sitewhere-ide-common";

import { IAttributeContent, IElementNode } from "sitewhere-rest-api";

import {
  IConfigurationContext,
  IConfiguredAttributeGroup,
  IConfiguredContent,
  IConfiguredElement,
  AttributeValues
} from "./ConfigurationModel";

import MicroserviceConfiguration from "./MicroserviceConfiguration";
import MicroserviceBanner from "./MicroserviceBanner.vue";
import ComponentContent from "./ComponentContent.vue";
import AttributeGroupPanel from "./AttributeGroupPanel.vue";
import AttributesCreateDialog from "./AttributesCreateDialog.vue";
import AttributesUpdateDialog from "./AttributesUpdateDialog.vue";
import { IElementContent, IConfigurationModel } from "sitewhere-rest-api";

@Component({
  components: {
    MicroserviceBanner,
    ComponentContent,
    AttributeGroupPanel,
    AttributesCreateDialog,
    AttributesUpdateDialog
  }
})
export default class MicroserviceEditor extends Vue {
  @Prop() readonly tabkey!: string;
  @Prop() readonly configuration!: IElementContent;
  @Prop() readonly configurationModel!: IConfigurationModel;
  @Prop() readonly identifier!: string;
  @Prop() readonly tenantToken!: string;

  editor: MicroserviceConfiguration | null = null;
  groups: IConfiguredAttributeGroup[] = [];
  content: IConfiguredContent | null = null;
  editingContext: IConfigurationContext | null = null;
  editingGroups: IConfiguredAttributeGroup[] = [];
  active: string | null = null;
  dirty: boolean = false;
  loaded: boolean = true;

  // References.
  $refs!: Refs<{
    create: AttributesCreateDialog;
    update: AttributesUpdateDialog;
  }>;

  /** Computed to determine whether config data is loaded*/
  get configurationAvailable(): boolean {
    return this.configuration != null && this.configurationModel != null;
  }

  /** Current context for configuration */
  get context(): IConfigurationContext | null {
    return this.editor ? this.editor.getLastContext() : null;
  }

  /** Context stack for configuration */
  get contextStack(): IConfigurationContext[] {
    return this.editor ? this.editor.contextStack : [];
  }

  @Watch("configuration", { immediate: true })
  onConfigurationUpdated(val: IElementContent, oldVal: IElementContent) {
    if (val && this.editor) {
      this.onConfigurationAvailable(true, false);
    }
  }

  @Watch("configurationAvailable", { immediate: true })
  onConfigurationAvailable(val: boolean, oldVal: boolean) {
    if (val) {
      this.editor = new MicroserviceConfiguration(
        this.configurationModel,
        this.configuration
      );
    }
  }

  @Watch("context", { immediate: true })
  onContextUpdated(
    context: IConfigurationContext,
    previous: IConfigurationContext
  ) {
    if (context && this.editor) {
      this.content = this.editor.getContentForContext(context);
      this.groups = this.editor.getAttributeGroupsForContext(context);
    }
  }

  /** Add a component */
  onAddComponent(option: IElementNode) {
    if (this.editor) {
      var last: IConfigurationContext | null = this.editor.getLastContext();
      if (last) {
        let model: IElementNode | null = this.editor.findModelNodeByName(
          last.model,
          option.localName
        );
        if (model) {
          var config: IElementContent = {
            id: this.editor.generateUniqueId(),
            name: model.localName,
            namespace: model.namespace,
            attributes: [],
            children: []
          };
          var context: IConfigurationContext = {
            configuration: config,
            model: model
          };
          this.editingContext = context;
          this.editingGroups = this.editor.getAttributeGroupsForContext(
            context
          );
          this.$refs.create.open();
        }
      }
    }
  }

  /** Add child to current context */
  onCommitAddedComponent(values: AttributeValues) {
    if (this.editor) {
      var added: IConfigurationContext | null = this.editingContext;
      if (added) {
        let config = added.configuration;

        let attributes: IAttributeContent[] = [];
        for (var key in values) {
          if (values.hasOwnProperty(key)) {
            let value = values[key];
            let attr: IAttributeContent = {
              name: key,
              namespace: "",
              value: value
            };
            attributes.push(attr);
          }
        }
        config.attributes = attributes;
        var current: IConfigurationContext | null = this.editor.getLastContext();
        if (current) {
          current.configuration.children.push(config);
          this.editor.fixChildOrder(current.model, current.configuration);
          this.content = this.editor.getContentForContext(current);
          this.fireDirty();
        }
      }
    }
  }

  /** Update current context attributes */
  onOpenUpdateDialog() {
    if (this.editor) {
      this.editingContext = this.editor.getLastContext();
      if (this.editingContext) {
        this.editingGroups = this.editor.getAttributeGroupsForContext(
          this.editingContext
        );
        this.$refs.update.open("");
      }
    }
  }

  /** Called after attributes have been updated */
  onAttributesUpdated(updated: AttributeValues) {
    if (this.editor) {
      let combined: AttributeValues = {};

      if (this.editingContext) {
        // Start with existing values.
        let existing: IAttributeContent[] = this.editingContext.configuration
          .attributes;
        if (existing) {
          existing.forEach(attribute => {
            combined[attribute.name] = attribute.value;
          });
        }
        // Overwrite with updated values.
        Object.assign(combined, updated);

        // Generate updated array.
        let newValues: IAttributeContent[] = [];
        for (var key in combined) {
          if (combined.hasOwnProperty(key)) {
            let value = combined[key];
            let attr: IAttributeContent = {
              name: key,
              namespace: "",
              value: value
            };
            newValues.push(attr);
          }
        }
        this.editingContext.configuration.attributes = newValues;
        this.groups = this.editor.getAttributeGroupsForContext(
          this.editingContext
        );
        this.fireDirty();
      }
    }
  }

  /** Called to delete a child component */
  onDeleteComponent(child: IConfiguredElement) {
    this.onDeleteChild(child.id);
    if (this.editor) {
      let last = this.editor.getLastContext();
      if (last) {
        this.content = this.editor.getContentForContext(last);
        this.fireDirty();
      }
    }
  }

  /** Delete the given element */
  onDeleteChild(id: string) {
    if (this.editor) {
      let context = this.editor.getLastContext();
      if (context) {
        let config = context.configuration;
        let childConfig: IElementContent | null = this.editor.findConfigNodeById(
          config,
          id
        );

        if (childConfig) {
          for (var i = 0; i < config.children.length; i++) {
            if (config.children[i].id === childConfig.id) {
              config.children.splice(i, 1);
              break;
            }
          }
        }
      }
    }
  }

  /** Pop up one context level */
  onPopContext() {
    if (this.editor) {
      this.editor.popContext();
    }
  }

  /** Pop to a given context in the stack */
  onPopToContext(context: IConfigurationContext) {
    if (this.editor) {
      this.editor.popToContext(context.model.localName);
    }
  }

  /** Push a child context onto the stack */
  onPushChildContext(element: IConfiguredElement) {
    if (this.editor) {
      this.editor.pushChildContext(element);
    }
  }

  /** Fire dirty indicator */
  fireDirty() {
    this.$data.dirty = true;
    this.$emit("dirty");
  }
}
</script>

<style>
.breadcrumbs {
  justify-content: left;
  padding: 0;
}
</style>
