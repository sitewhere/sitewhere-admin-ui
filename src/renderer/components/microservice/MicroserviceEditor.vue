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
      @componentAdded="onComponentAdded"
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

<script>
import MicroserviceBanner from "./MicroserviceBanner";
import ComponentAttributes from "./ComponentAttributes";
import ComponentContent from "./ComponentContent";
import AttributesCreateDialog from "./AttributesCreateDialog";
import AttributesUpdateDialog from "./AttributesUpdateDialog";

export default {
  data: () => ({
    active: null,
    contextStack: [],
    groups: null,
    content: null,
    editContext: null,
    editGroups: null,
    dirty: false
  }),

  props: ["config", "configModel", "identifier", "tenantToken"],

  components: {
    MicroserviceBanner,
    ComponentAttributes,
    ComponentContent,
    AttributesCreateDialog,
    AttributesUpdateDialog
  },

  computed: {
    // Compute current context based on stack.
    context: function() {
      let stack = this.$data.contextStack;
      if (stack.length > 0) {
        return stack[stack.length - 1];
      }
      return null;
    },

    // Indicator for configs available.
    configDataAvailable: function() {
      return this.config && this.configModel;
    }
  },

  watch: {
    // When context is updated, update child content.
    context: {
      immediate: true,
      handler(val, old) {
        if (val) {
          this.$data.groups = this.getAttributeGroupsForContext(val);
          this.$data.content = this.getContentForContext(val);
        }
      }
    },

    // Navigate to root when configs are available.
    configDataAvailable: {
      immediate: true,
      handler(val, old) {
        if (val) {
          this.onNavigateToRoot();
        }
      }
    }
  },

  methods: {
    /** Navigate to root context */
    onNavigateToRoot: function() {
      this.$data.contextStack = [];
      var rootRoleId = this.configModel.rootRoleId;
      var rootModel = this.configModel.elementsByRole[rootRoleId][0];
      var rootConfig = this.findConfigNodeByName(
        this.config,
        rootModel.localName
      );
      var context = {
        config: rootConfig,
        model: rootModel
      };
      this.onPushContext(context);
    },

    /** Get the current context stack */
    getContextStack: function() {
      return this.$data.contextStack;
    },

    /** Push child context */
    onPushChildContext: function(child) {
      let context = this.getRelativeContextFor(child.id, child.localName);
      if (context) {
        this.onPushContext(context);
      }
    },

    /** Push context on the stack */
    onPushContext: function(context) {
      this.$data.contextStack.push(context);
    },

    /** Pop a context off the stack */
    onPopContext: function() {
      let stack = this.$data.contextStack;
      if (stack.length > 1) {
        var context = stack[stack.length - 2];
        var config = context["config"];
        this.onPopToContext(config.name);
      }
    },

    /** Pop to a named context */
    onPopToContext: function(name) {
      let stack = this.$data.contextStack;
      var context = this.getLastContext();
      var config = context["config"];
      if (config.name !== name && stack.length > 1) {
        // Pop the top item and recurse.
        stack.pop();
        return this.onPopToContext(name);
      }
    },

    /** Get last context in stack */
    getLastContext: function() {
      let stack = this.$data.contextStack;
      if (stack.length > 0) {
        return stack[stack.length - 1];
      }
      return null;
    },

    /** Get relative context based on local name */
    getRelativeContext: function(localName) {
      var last = this.getLastContext();
      var configNode = this.findConfigNodeByName(last.config, localName);
      var modelNode = this.findModelNodeByName(last.model, localName);
      return {
        config: configNode,
        model: modelNode
      };
    },

    /** Get context for a specific child element */
    getRelativeContextFor: function(id, localName) {
      var context = this.getLastContext();
      var configNode = this.findConfigNodeById(context.config, id);
      var modelNode = this.findModelNodeByName(context.model, localName);
      return {
        config: configNode,
        model: modelNode
      };
    },

    /** Update current context attributes */
    onOpenUpdateDialog: function() {
      let last = this.getLastContext();
      let edit = {
        config: last.config,
        model: last.model
      };
      this.$data.editContext = edit;
      this.$data.editGroups = this.getAttributeGroupsForContext(edit);
      this.$refs["update"].onOpenDialog();
    },

    /** Called after attributes have been updated */
    onAttributesUpdated: function(updated) {
      let combined = {};
      let last = this.getLastContext();
      let updatedValues = updated.values;

      // Start with existing values.
      let existing = last.config.attributes;
      if (existing) {
        for (const attribute of existing) {
          combined[attribute.name] = attribute.value;
        }
      }
      // Overwrite with updated values.
      Object.assign(combined, updatedValues);

      // Generate updated array.
      let newValues = [];
      for (var key in updatedValues) {
        if (updatedValues.hasOwnProperty(key)) {
          let value = updatedValues[key];
          newValues.push({ name: key, value: value });
        }
      }
      last.config.attributes = newValues;
      this.$data.groups = this.getAttributeGroupsForContext(last);
      this.fireDirty();
    },

    /** Called to delete a child component */
    onDeleteComponent: function(child) {
      this.onDeleteChild(child.id);
      let last = this.getLastContext();
      this.$data.content = this.getContentForContext(last);
      this.fireDirty();
    },

    /** Add a component */
    onAddComponent: function(option) {
      let edit = this.getRelativeContext(option.localName);
      if (edit.model.attributes) {
        this.$data.editContext = edit;
        this.$data.editGroups = this.getAttributeGroupsForContext(edit);
        this.$refs["create"].onOpenDialog();
      } else {
        this.onComponentAdded({
          localName: edit.model.localName,
          values: null
        });
      }
    },

    /** Called after component is added */
    onComponentAdded: function(added) {
      this.onAddChild(added.localName, added.values);
      this.fireDirty();
    },

    /** Add child to current context */
    onAddChild: function(name, values) {
      var context = this.getLastContext();
      var model = context["model"];
      let config = context["config"];

      let attributes = [];
      for (var key in values) {
        if (values.hasOwnProperty(key)) {
          let value = values[key];
          attributes.push({ name: key, value: value });
        }
      }

      // Create new config element based on selected model.
      var childModel = this.findModelNodeByName(model, name);
      var childConfig = {
        id: this.generateUniqueId(),
        name: childModel.localName,
        attributes: attributes
      };
      if (childModel.namespace) {
        childConfig.namespace = childModel.namespace;
      }

      if (!config.children) {
        config.children = [];
      }
      config.children.push(childConfig);
      this.fixChildOrder(model, config);
      this.$data.content = this.getContentForContext(context);
    },

    /** Delete the given element */
    onDeleteChild: function(id) {
      let context = this.getLastContext();
      let config = context["config"];
      let childConfig = this.findConfigNodeById(config, id);

      for (var i = 0; i < config.children.length; i++) {
        if (config.children[i].id === childConfig.id) {
          config.children.splice(i, 1);
          break;
        }
      }
    },

    /** Fire dirty indicator */
    fireDirty: function() {
      this.$data.dirty = true;
      this.$emit("dirty");
    },

    /** Find closest element with the given localName */
    findConfigNodeByName: function(root, name) {
      if (root.name === name) {
        return root;
      } else {
        var found;
        if (root.children) {
          for (var i = 0; i < root.children.length; i++) {
            found = this.findConfigNodeByName(root.children[i], name);
            if (found) {
              return found;
            }
          }
        }
      }
      return null;
    },

    /** Find closest element with the given uuid */
    findConfigNodeById: function(root, uuid) {
      if (root.id === uuid) {
        return root;
      } else {
        var found;
        if (root.children) {
          for (var i = 0; i < root.children.length; i++) {
            found = this.findConfigNodeById(root.children[i], uuid);
            if (found) {
              return found;
            }
          }
        }
      }
      return null;
    },

    /** Find a child model based on config element name */
    findModelNodeByName: function(model, name) {
      if (model.localName === name) {
        return model;
      } else {
        let role = this.configModel.rolesById[model.role];
        let childRoles = this.getSpecializedRoleChildren(role, model);

        // Loop through all possible child roles for model.
        for (let i = 0; i < childRoles.length; i++) {
          let potential = this.findModelChildrenInRole(childRoles[i]);
          if (potential) {
            for (let j = 0; j < potential.length; j++) {
              if (name === potential[j].localName) {
                return potential[j];
              }
            }
          }
        }
      }
      return null;
    },

    /** Generate a unique id */
    generateUniqueId: function() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        let r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0;
        let v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },

    /** Fix order of children to match model */
    fixChildOrder: function(modelNode, configNode) {
      let childrenByRole = this.getConfigChildrenByRole(modelNode, configNode);
      let role = this.configModel.rolesById[modelNode.role];
      let childRoles = this.getSpecializedRoleChildren(role, modelNode);

      var updated = [];
      if (childRoles) {
        for (let i = 0; i < childRoles.length; i++) {
          var childrenInRole = childrenByRole[childRoles[i]];
          if (childrenInRole) {
            for (let j = 0; j < childrenInRole.length; j++) {
              var childConfig = childrenInRole[j].config;
              updated.push(childConfig);
            }
          }
        }
      }
      configNode.children = updated;
    },

    /** Open a child page in the wizard */
    onChildOpenClicked: function(childName, childId) {
      let top = this.getLastContext();
      let topModel = top["model"];
      let topConfig = top["config"];
      let childModel = this.findModelNodeByName(topModel, childName);
      let childConfig = this.findConfigNodeById(topConfig, childId);
      if (childModel && childConfig) {
        this.pushContext(childConfig, childModel);
      }
    },

    /** Find children of a model node with the given role */
    findModelChildrenInRole: function(roleName) {
      var role = this.configModel.rolesById[roleName];
      var all = [];
      all.push.apply(all, this.configModel.elementsByRole[roleName]);

      // Also matches of subtypes.
      if (role.subtypeRoles) {
        for (var i = 0; i < role.subtypeRoles.length; i++) {
          var subtypeName = role.subtypeRoles[i];
          all.push.apply(all, this.configModel.elementsByRole[subtypeName]);
        }
      }
      all.sort(function(a, b) {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      });
      return all;
    },

    /** Get configuration children grouped by role */
    getConfigChildrenByRole: function(modelNode, configNode) {
      let role = this.configModel.rolesById[modelNode.role];
      let result = {};

      // Get child roles with constraints.
      let childRoles = this.getSpecializedRoleChildren(role, modelNode);
      let modelNotFound = [];
      for (let i = 0; i < childRoles.length; i++) {
        var childRoleName = childRoles[i];
        var childRole = this.configModel.rolesById[childRoleName];
        var roleSubtypes = [];
        roleSubtypes.push(childRoleName);
        if (childRole.subtypeRoles) {
          roleSubtypes.push.apply(roleSubtypes, childRole.subtypeRoles);
        }

        let matches = [];
        result[childRoleName] = matches;
        if (configNode && configNode.children) {
          for (let j = 0; j < configNode.children.length; j++) {
            let childConfig = configNode.children[j];
            if (modelNotFound.indexOf(childConfig.name) === -1) {
              let childModel = this.findModelNodeByName(
                modelNode,
                childConfig.name
              );
              if (!childModel) {
                modelNotFound.push(childConfig.name);
              } else if (roleSubtypes.indexOf(childModel.role) !== -1) {
                let childContext = {};
                childContext["model"] = childModel;
                childContext["config"] = childConfig;
                matches.push(childContext);
              }
            }
          }
        }
      }
      result["?"] = modelNotFound;
      return result;
    },

    /** Get child roles, taking into account model specializations */
    getSpecializedRoleChildren: function(role, modelNode) {
      var specialized = [];
      if (role.childRoles) {
        var childRoles = role.childRoles;
        for (var i = 0; i < childRoles.length; i++) {
          var childRole = childRoles[i];
          if (modelNode.specializes) {
            var match = modelNode.specializes[childRole];
            if (match) {
              specialized.push(match);
            } else {
              specialized.push(childRole);
            }
          } else {
            specialized.push(childRole);
          }
        }
      }
      return specialized;
    },

    /** Build attribute groups for context */
    getAttributeGroupsForContext: function(context) {
      let configNode = context["config"];
      let modelNode = context["model"];
      let configByName = this.hashConfigNodeAttributesByName(configNode);

      let groups = [];
      let attributes = [];
      let currentGroup = null;
      if (modelNode.attributes) {
        for (let i = 0; i < modelNode.attributes.length; i++) {
          var modelAttr = modelNode.attributes[i];
          if (!currentGroup || currentGroup.id !== modelAttr.group) {
            currentGroup = {};
            currentGroup.uid = this.generateUniqueId();
            currentGroup.id = modelAttr.group;
            if (modelAttr.group) {
              currentGroup.name = modelNode.attributeGroups[modelAttr.group];
            }
            attributes = [];
            currentGroup.attributes = attributes;
            groups.push(currentGroup);
          }
          let value = configByName[modelAttr.localName];
          attributes.push({
            localName: modelAttr.localName,
            name: modelAttr.name,
            type: modelAttr.type,
            icon: modelAttr.icon,
            description: modelAttr.description,
            choices: modelAttr.choices,
            value: value,
            default: modelAttr.defaultValue,
            required: modelAttr.required
          });
        }
      }
      return groups;
    },

    /** Hash configuration node attributes by name */
    hashConfigNodeAttributesByName: function(config) {
      let configByName = {};
      if (config && config.attributes) {
        for (var i = 0; i < config.attributes.length; i++) {
          configByName[config.attributes[i].name] = config.attributes[i].value;
        }
      }
      return configByName;
    },

    /** Build content */
    getContentForContext: function(context) {
      let configNode = context["config"];
      let modelNode = context["model"];
      let children = {};

      let childrenByRole = this.getConfigChildrenByRole(modelNode, configNode);
      let role = this.configModel.rolesById[modelNode.role];
      if (!role) {
        return children;
      }

      // Loop through role children in order.
      let elements = [];
      let childRoles = this.getSpecializedRoleChildren(role, modelNode);
      for (let i = 0; i < childRoles.length; i++) {
        let childRoleName = childRoles[i];
        let childRole = this.configModel.rolesById[childRoleName];
        let childrenWithRole = childrenByRole[childRoleName];
        let availableForRole = this.findModelChildrenInRole(childRoleName);

        if (childrenWithRole.length === 0) {
          let placeholder = this.buildPlaceholder(childRole);
          placeholder.options = availableForRole;
          placeholder.hasContent = false;
          elements.push(placeholder);
        } else {
          for (let j = 0; j < childrenWithRole.length; j++) {
            let childContext = childrenWithRole[j];
            let childModel = childContext["model"];
            let childConfig = childContext["config"];
            let element = this.buildChild(
              childModel,
              childConfig,
              childRoleName,
              childRole,
              childrenWithRole
            );
            element.options = availableForRole;
            element.hasContent = true;
            elements.push(element);
          }
          if (childRole.multiple) {
            let placeholder = this.buildPlaceholder(childRole);
            placeholder.options = availableForRole;
            placeholder.hasContent = false;
            elements.push(placeholder);
          }
        }
      }
      children.elements = elements;

      // Add children that do not have a model.
      var noModel = childrenByRole["?"];
      var unknown = [];
      for (let i = 0; i < noModel.length; i++) {
        unknown.push(noModel[i]);
      }
      children.unknown = unknown;
      return children;
    },

    /** Build placeholder entry */
    buildPlaceholder: function(childRole) {
      let placeholder = {};
      placeholder.id = childRole.name;
      placeholder.name = childRole.name;
      placeholder.multiple = childRole.multiple;
      placeholder.optional = childRole.optional;
      placeholder.permanent = childRole.permanent;
      placeholder.reorderable = childRole.reorderable;
      return placeholder;
    },

    /** Build child entry */
    buildChild: function(
      childModel,
      childConfig,
      childRoleName,
      childRole,
      childrenWithRole
    ) {
      let child = {};
      child.id = childConfig.id;
      child.name = childModel.name;
      child.localName = childModel.localName;
      child.icon = childModel.icon;
      child.multiple = childRole.multiple;
      child.optional = childRole.optional;
      child.permanent = childRole.permanent;
      child.reorderable = childRole.reorderable;
      child.deprecated = childModel.deprecated;
      if (childModel.indexAttribute) {
        child.indexAttribute = childModel.indexAttribute;
        child.resolvedIndexAttribute = this.resolveIndexAttribute(
          childModel,
          childConfig
        );
        if (childrenWithRole.length === 0) {
          if (childRole.optional) {
            child.missingOptional = true;
          } else {
            child.missingRequired = true;
          }
        }
      }
      return child;
    },

    /** Resolve an index attribute */
    resolveIndexAttribute: function(childModel, childConfig) {
      if (childModel.indexAttribute && childConfig.attributes) {
        for (let j = 0; j < childConfig.attributes.length; j++) {
          let attrName = childConfig.attributes[j].name;
          if (childModel.indexAttribute === attrName) {
            return childConfig.attributes[j].value;
          }
        }
      }
      return null;
    }
  }
};
</script>

<style>
.breadcrumbs {
  justify-content: left;
  padding: 0;
}
</style>
