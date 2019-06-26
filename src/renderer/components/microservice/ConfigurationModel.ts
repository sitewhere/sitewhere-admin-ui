import {
  IElementNode,
  IElementContent,
  IAttributeContent,
  IAttributeChoice
} from "sitewhere-rest-api";

/** Contains context information for configuring an element */
export interface IConfigurationContext {
  model: IElementNode;
  configuration: IElementContent;
}

/** Merges attribute model with configured content */
export interface IConfiguredAttribute {
  localName: string;
  name: string;
  type: string;
  icon: string;
  description: string;
  choices?: IAttributeChoice[];
  value?: string;
  default?: string;
  required?: boolean;
}

/** Partitions configured attributes into groups */
export interface IConfiguredAttributeGroup {
  uid: string;
  id?: string;
  name?: string;
  attributes: IConfiguredAttribute[];
}

/** Placeholder for content */
export interface IContentElement {
  id: string;
  name: string;
  multiple: boolean;
  optional: boolean;
  permanent: boolean;
  reorderable: boolean;
  options?: IElementNode[];
  hasContent?: boolean;
}

/** Merges element model with configured content */
export interface IConfiguredElement extends IContentElement {
  localName: string;
  icon: string;
  deprecated: boolean;
  indexAttribute?: string;
  resolvedIndexAttribute?: IAttributeContent;
  missingOptional?: boolean;
  missingRequired?: boolean;
}

export interface IConfiguredContent {
  elements?: IContentElement[];
  unknown?: string[];
}

/** Holds information about child contexts indexed by role */
export interface IChildContextsByRole {
  configured: { [id: string]: IConfigurationContext[] };
  unknown: string[];
}

/** Used to pass details about an updated attribute */
export interface IAttributeUpdate {
  attribute: IConfiguredAttribute;
  newValue: any;
}

/** Map of attribute content by attribute name */
export type AttributeContentByName = { [index: string]: IAttributeContent };

/** Map of attribute names->values */
export type AttributeValues = { [index: string]: any };
