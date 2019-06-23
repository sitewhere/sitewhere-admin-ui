<template>
  <span>
    <v-card flat>
      <v-card-text>
        <!-- Banner shown above microservice content -->
        <microservice-banner
          :context="context"
          :contextStack="contextStack"
          @popContext="onPopContext"
          @popToContext="onPopToContext"
          @configureCurrent="onOpenUpdateDialog"
        >
          <component-attributes
            class="mb-2 mt-2"
            :context="context"
            :groups="groups"
            :identifier="identifier"
            :tenantToken="tenantToken"
            :readOnly="true"
            :dirty="dirty"
          />
          <!-- Elements -->
          <v-card>
            <component-content
              :content="content"
              @addComponent="onAddComponent"
              @pushContext="onPushChildContext"
              @deleteComponent="onDeleteComponent"
            ></component-content>
          </v-card>
        </microservice-banner>
      </v-card-text>
    </v-card>
    <attributes-create-dialog
      ref="create"
      :context="editContext"
      :groups="editGroups"
      :identifier="identifier"
      :tenantToken="tenantToken"
      @attributesCreated="onAttributesCreated"
    ></attributes-create-dialog>
    <attributes-update-dialog
      ref="update"
      :context="editContext"
      :groups="editGroups"
      :identifier="identifier"
      :tenantToken="tenantToken"
      @attributesUpdated="onAttributesUpdated"
    ></attributes-update-dialog>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Refs } from "sitewhere-ide-common";

import { IAttributeContent, IElementNode } from "sitewhere-rest-api";

import {
  IConfigurationContext,
  IChildContextsByRole,
  IConfiguredAttributeGroup,
  IConfiguredAttribute,
  IConfiguredContent,
  IContentElement,
  IConfiguredElement,
  AttributeValues
} from "./ConfigurationModel";

import MicroserviceConfiguration from "./MicroserviceConfiguration";
import MicroserviceBanner from "./MicroserviceBanner.vue";
import ComponentAttributes from "./ComponentAttributes.vue";
import ComponentContent from "./ComponentContent.vue";
import AttributesCreateDialog from "./AttributesCreateDialog.vue";
import AttributesUpdateDialog from "./AttributesUpdateDialog.vue";
import { IElementContent } from "../../../../../sitewhere-rest-api/src";

@Component({
  components: {
    MicroserviceBanner,
    ComponentAttributes,
    ComponentContent,
    AttributesCreateDialog,
    AttributesUpdateDialog
  }
})
export default class MicroserviceEditor extends Vue {
  @Prop() readonly configuration!: any;
  @Prop() readonly configurationModel!: any;
  @Prop() readonly identifier!: string;
  @Prop() readonly tenantToken!: string;

  editor: MicroserviceConfiguration | null = null;
  groups: IConfiguredAttributeGroup[] = [];
  content: IConfiguredContent | null = null;
  editingContext: IConfigurationContext | null = null;
  editingGroups: IConfiguredAttributeGroup[] = [];
  dirty: boolean = false;

  // References.
  $refs!: Refs<{
    create: AttributesCreateDialog;
    update: any;
  }>;

  /** Computed to determine whether config data is loaded*/

  get configurationAvailable() {
    return this.configuration && this.configurationModel;
  }

  /** Current context for configuration */
  get context(): IConfigurationContext | null {
    return this.editor ? this.editor.getLastContext() : null;
  }

  /** Context stack for configuration */
  get contextStack(): IConfigurationContext[] {
    return this.editor ? this.editor.contextStack : [];
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

  /** Update current context attributes */
  onOpenUpdateDialog() {
    if (this.editor) {
      this.editingContext = this.editor.getLastContext();
      if (this.editingContext) {
        this.editingGroups = this.editor.getAttributeGroupsForContext(
          this.editingContext
        );
        this.$refs["update"].onOpenDialog();
      }
    }
  }

  /** Called after attributes have been updated */
  onAttributesUpdated(updated: AttributeValues) {
    if (this.editor) {
      let combined: AttributeValues = {};
      let last: IConfigurationContext | null = this.editor.getLastContext();

      if (last) {
        let updatedValues = updated.values;

        // Start with existing values.
        let existing = last.configuration.attributes;
        if (existing) {
          existing.forEach(attribute => {
            combined[attribute.name] = attribute.value;
          });
        }
        // Overwrite with updated values.
        Object.assign(combined, updatedValues);

        // Generate updated array.
        let newValues: IAttributeContent[] = [];
        for (var key in updatedValues) {
          if (updatedValues.hasOwnProperty(key)) {
            let value = updatedValues[key];
            let attr: IAttributeContent = {
              name: key,
              namespace: "",
              value: value
            };
            newValues.push(attr);
          }
        }
        last.configuration.attributes = newValues;
        this.groups = this.editor.getAttributeGroupsForContext(last);
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

  /** Add a component */
  onAddComponent(option: IElementNode) {
    if (this.editor) {
      let edit = this.editor.getRelativeContext(option.localName);
      if (edit) {
        if (edit.model.attributes) {
          this.$data.editContext = edit;
          this.$data.editGroups = this.editor.getAttributeGroupsForContext(
            edit
          );
          this.$refs.create.open();
        } else {
          this.onAddChild(edit.model.localName, {});
          this.fireDirty();
        }
      }
    }
  }

  /** Add child to current context */
  onAddChild(name: string, values: AttributeValues) {
    if (this.editor) {
      var context = this.editor.getLastContext();
      if (context) {
        var model = context.model;
        let config = context.configuration;

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

        // Create new config element based on selected model.
        var childModel: IElementNode | null = this.editor.findModelNodeByName(
          model,
          name
        );
        if (childModel) {
          var childConfig: IElementContent = {
            id: this.editor.generateUniqueId(),
            name: childModel.localName,
            namespace: childModel.namespace,
            attributes: attributes,
            children: []
          };

          if (!config.children) {
            config.children = [];
          }
          config.children.push(childConfig);
          this.editor.fixChildOrder(model, config);
          this.content = this.editor.getContentForContext(context);
        }
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
