import {
  IConfigurationModel,
  IElementRole,
  IElementNode,
  IElementContent,
  IAttributeContent
} from "sitewhere-rest-api";

import {
  IConfigurationContext,
  IChildContextsByRole,
  IConfiguredAttributeGroup,
  IConfiguredAttribute,
  IConfiguredContent,
  IContentElement,
  IConfiguredElement,
  AttributeContentByName
} from "./ConfigurationModel";

/**
 * Wraps operations for operating on a microservice configuration.
 */
export default class MicroserviceConfiguration {
  /** Configuration model */
  model: IConfigurationModel;
  configuration: IElementContent;
  contextStack: IConfigurationContext[] = [];

  constructor(model: IConfigurationModel, configuration: IElementContent) {
    this.model = model;
    this.configuration = configuration;
    this.navigateToRoot();
  }

  /** Get the current context stack */
  getContextStack(): IConfigurationContext[] {
    return this.contextStack;
  }

  /** Navigate to root context */
  navigateToRoot() {
    this.contextStack = [];
    var rootRoleId = this.model.rootRoleId;
    var rootModel = this.model.elementsByRole[rootRoleId][0];
    var rootConfig = this.findConfigNodeByName(
      this.configuration,
      rootModel.localName
    );
    if (rootConfig) {
      var context: IConfigurationContext = {
        configuration: rootConfig,
        model: rootModel
      };
      this.pushContext(context);
    }
  }

  /** Push child context */
  pushChildContext(child: IConfiguredElement) {
    if (child && child.id) {
      let context = this.getRelativeContextFor(child.id, child.localName);
      if (context) {
        this.pushContext(context);
      }
    }
  }

  /** Push context on the stack */
  pushContext(context: IConfigurationContext) {
    this.contextStack.push(context);
  }

  /** Pop a context off the stack */
  popContext(): void {
    let stack = this.contextStack;
    if (stack.length > 1) {
      var context: IConfigurationContext = stack[stack.length - 2];
      var config = context.configuration;
      this.popToContext(config.name);
    }
  }

  /** Pop to a named context */
  popToContext(name: string): void {
    let stack = this.contextStack;
    var context = this.getLastContext();
    if (context) {
      var config = context.configuration;
      if (config.name !== name && stack.length > 1) {
        // Pop the top item and recurse.
        stack.pop();
        return this.popToContext(name);
      }
    }
  }

  /** Get last context in stack */
  getLastContext(): IConfigurationContext | null {
    let stack = this.contextStack;
    if (stack.length > 0) {
      return stack[stack.length - 1];
    }
    return null;
  }

  /** Get relative context based on local name */
  getRelativeContext(localName: string): IConfigurationContext | null {
    var last = this.getLastContext();
    if (last) {
      var configNode = this.findConfigNodeByName(last.configuration, localName);
      var modelNode = this.findModelNodeByName(last.model, localName);
      if (configNode && modelNode) {
        let context: IConfigurationContext = {
          configuration: configNode,
          model: modelNode
        };
        return context;
      }
    }
    return null;
  }

  /** Get context for a specific child element */
  getRelativeContextFor(
    id: string,
    localName: string
  ): IConfigurationContext | null {
    var context = this.getLastContext();
    if (context) {
      var configNode = this.findConfigNodeById(context.configuration, id);
      var modelNode = this.findModelNodeByName(context.model, localName);
      if (configNode && modelNode) {
        let context: IConfigurationContext = {
          configuration: configNode,
          model: modelNode
        };
        return context;
      }
    }
    return null;
  }

  /** Find closest element with the given localName */
  findConfigNodeByName(
    root: IElementContent,
    name: string
  ): IElementContent | null {
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
  }

  /** Find closest element with the given uuid */
  findConfigNodeById(
    root: IElementContent,
    uuid: string
  ): IElementContent | null {
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
  }

  /** Find a child model based on config element name */
  findModelNodeByName(model: IElementNode, name: string): IElementNode | null {
    if (model.localName === name) {
      return model;
    } else {
      let role: IElementRole = this.model.rolesById[model.role];
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
  }

  /** Generate a unique id */
  generateUniqueId(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      let r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0;
      let v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /** Fix order of children to match model */
  fixChildOrder(modelNode: IElementNode, configNode: IElementContent) {
    let childContextsByRole: IChildContextsByRole = this.getChildContextsByRole(
      modelNode,
      configNode
    );
    let role = this.model.rolesById[modelNode.role];
    let childRoles = this.getSpecializedRoleChildren(role, modelNode);

    var updated: IElementContent[] = [];
    if (childRoles) {
      for (let i = 0; i < childRoles.length; i++) {
        var childrenInRole: IConfigurationContext[] =
          childContextsByRole.configured[childRoles[i]];
        if (childrenInRole) {
          for (let j = 0; j < childrenInRole.length; j++) {
            updated.push(childrenInRole[j].configuration);
          }
        }
      }
    }
    configNode.children = updated;
  }

  /** Open a specific child element of the current context */
  openSpecificChildOfCurrentContext(childName: string, childId: string) {
    let top: IConfigurationContext | null = this.getLastContext();
    if (top) {
      let topModel = top.model;
      let topConfig = top.configuration;
      let childModel = this.findModelNodeByName(topModel, childName);
      let childConfig = this.findConfigNodeById(topConfig, childId);
      if (childModel && childConfig) {
        let context: IConfigurationContext = {
          configuration: childConfig,
          model: childModel
        };
        this.pushContext(context);
      }
    }
  }

  /** Find children of a model node with the given role */
  findModelChildrenInRole(roleName: string): IElementNode[] {
    var role: IElementRole = this.model.rolesById[roleName];
    var all: IElementNode[] = [];
    all.push.apply(all, this.model.elementsByRole[roleName]);

    // Also matches of subtypes.
    if (role.subtypeRoles) {
      for (var i = 0; i < role.subtypeRoles.length; i++) {
        var subtypeName = role.subtypeRoles[i];
        all.push.apply(all, this.model.elementsByRole[subtypeName]);
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
  }

  /** Get configuration children grouped by role */
  getChildContextsByRole(
    modelNode: IElementNode,
    configNode: IElementContent
  ): IChildContextsByRole {
    let role: IElementRole = this.model.rolesById[modelNode.role];
    let configured: {
      [id: string]: IConfigurationContext[];
    } = {};
    let missing: string[] = [];

    // Get child roles with constraints.
    let childRoles: string[] = this.getSpecializedRoleChildren(role, modelNode);
    for (let i = 0; i < childRoles.length; i++) {
      var childRoleName = childRoles[i];
      var childRole: any = this.model.rolesById[childRoleName];
      var roleSubtypes = [];
      roleSubtypes.push(childRoleName);
      if (childRole.subtypeRoles) {
        roleSubtypes.push.apply(roleSubtypes, childRole.subtypeRoles);
      }

      let matches: IConfigurationContext[] = [];
      configured[childRoleName] = matches;
      if (configNode && configNode.children) {
        for (let j = 0; j < configNode.children.length; j++) {
          let childConfig = configNode.children[j];
          if (missing.indexOf(childConfig.name) === -1) {
            let childModel = this.findModelNodeByName(
              modelNode,
              childConfig.name
            );
            if (!childModel) {
              missing.push(childConfig.name);
            } else if (roleSubtypes.indexOf(childModel.role) !== -1) {
              let childContext: IConfigurationContext = {
                model: childModel,
                configuration: childConfig
              };
              matches.push(childContext);
            }
          }
        }
      }
    }
    return { configured: configured, unknown: missing };
  }

  /** Get child roles, taking into account model specializations */
  getSpecializedRoleChildren(
    role: IElementRole,
    modelNode: IElementNode
  ): string[] {
    var specialized: string[] = [];
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
  }

  /** Build attribute groups for context */
  getAttributeGroupsForContext(
    context: IConfigurationContext
  ): IConfiguredAttributeGroup[] {
    let configNode: IElementContent = context.configuration;
    let modelNode: IElementNode = context.model;
    let attrByName: AttributeContentByName = this.hashConfigNodeAttributesByName(
      configNode
    );

    let groups: IConfiguredAttributeGroup[] = [];
    let attributes: IConfiguredAttribute[] = [];
    let currentGroup: IConfiguredAttributeGroup | null = null;
    if (modelNode.attributes) {
      modelNode.attributes.forEach(modelAttr => {
        if (!currentGroup || currentGroup.id !== modelAttr.group) {
          attributes = [];
          currentGroup = {
            uid: this.generateUniqueId(),
            id: modelAttr.group,
            attributes: attributes
          };
          if (modelAttr.group) {
            currentGroup.name = modelNode.attributeGroups[modelAttr.group];
          }
          groups.push(currentGroup);
        }
        let attr: IAttributeContent = attrByName[modelAttr.localName];
        let attrValue: string | undefined = attr ? attr.value : undefined;
        let configAttr: IConfiguredAttribute = {
          localName: modelAttr.localName,
          name: modelAttr.name,
          type: modelAttr.type,
          icon: modelAttr.icon,
          description: modelAttr.description,
          choices: modelAttr.choices,
          value: attrValue,
          default: modelAttr.defaultValue,
          required: modelAttr.required
        };
        attributes.push(configAttr);
      });
    }
    return groups;
  }

  /** Hash configuration node attributes by name */
  hashConfigNodeAttributesByName(
    config: IElementContent
  ): AttributeContentByName {
    let configByName: AttributeContentByName = {};
    if (config && config.attributes) {
      config.attributes.forEach(attribute => {
        configByName[attribute.name] = attribute;
      });
    }
    return configByName;
  }

  /** Build content */
  getContentForContext(context: IConfigurationContext): IConfiguredContent {
    let configNode = context.configuration;
    let modelNode = context.model;
    let children: IConfiguredContent = {};

    let childContextsByRole: IChildContextsByRole = this.getChildContextsByRole(
      modelNode,
      configNode
    );
    let role: IElementRole = this.model.rolesById[modelNode.role];
    if (!role) {
      return children;
    }

    // Loop through role children in order.
    let elements: IContentElement[] = [];
    let childRoles = this.getSpecializedRoleChildren(role, modelNode);
    childRoles.forEach(childRoleName => {
      let childRole = this.model.rolesById[childRoleName];
      let childContextsWithRole: IConfigurationContext[] =
        childContextsByRole.configured[childRoleName];
      let availableForRole = this.findModelChildrenInRole(childRoleName);

      if (childContextsWithRole.length === 0) {
        let placeholder: IContentElement = this.buildPlaceholder(childRole);
        placeholder.options = availableForRole;
        placeholder.hasContent = false;
        elements.push(placeholder);
      } else {
        childContextsWithRole.forEach(childContext => {
          let childModel = childContext.model;
          let childConfig = childContext.configuration;
          let element: IConfiguredElement = this.buildConfiguredChildElement(
            childModel,
            childConfig,
            childRole,
            childContextsWithRole
          );
          element.options = availableForRole;
          element.hasContent = true;
          elements.push(element);
        });
        if (childRole.multiple) {
          let placeholder = this.buildPlaceholder(childRole);
          placeholder.options = availableForRole;
          placeholder.hasContent = false;
          elements.push(placeholder);
        }
      }
    });
    children.elements = elements;

    // Add children that do not have a model.
    children.unknown = childContextsByRole.unknown;
    return children;
  }

  /** Build placeholder entry */
  buildPlaceholder(childRole: IElementRole): IContentElement {
    let placeholder: IContentElement = {
      id: childRole.name,
      name: childRole.name,
      multiple: childRole.multiple,
      optional: childRole.optional,
      permanent: childRole.permanent,
      reorderable: childRole.reorderable
    };
    return placeholder;
  }

  /** Build child entry */
  buildConfiguredChildElement(
    childModel: IElementNode,
    childConfig: IElementContent,
    childRole: IElementRole,
    childContextsWithRole: IConfigurationContext[]
  ): IConfiguredElement {
    let child: IConfiguredElement = {
      id: childConfig.id,
      name: childModel.name,
      localName: childModel.localName,
      icon: childModel.icon,
      multiple: childRole.multiple,
      optional: childRole.optional,
      permanent: childRole.permanent,
      reorderable: childRole.reorderable,
      deprecated: childModel.deprecated
    };
    if (childModel.indexAttribute) {
      child.indexAttribute = childModel.indexAttribute;
      child.resolvedIndexAttribute = this.resolveIndexAttribute(
        childModel,
        childConfig
      );
      if (childContextsWithRole.length === 0) {
        if (childRole.optional) {
          child.missingOptional = true;
        } else {
          child.missingRequired = true;
        }
      }
    }
    return child;
  }

  /** Resolve an index attribute */
  resolveIndexAttribute(
    childModel: IElementNode,
    childConfig: IElementContent
  ): IAttributeContent | undefined {
    if (childModel.indexAttribute && childConfig.attributes) {
      for (let j = 0; j < childConfig.attributes.length; j++) {
        let attrName = childConfig.attributes[j].name;
        if (childModel.indexAttribute === attrName) {
          return childConfig.attributes[j];
        }
      }
    }
    return undefined;
  }
}
