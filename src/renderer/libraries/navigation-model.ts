import { Route } from "vue-router";
import Vue from "vue";

// Used for Vue references.
export type Refs<T extends object> = Vue["$refs"] & T;

// Type declaration for page size options.
export type IPageSizes = { text: string; value: number }[];

/**
 * Annotates components that can have the current route injected.
 */
export interface WithRoute {
  $route: Route;
}

/**
 * Information used to track paging of results.
 */
export interface IPaging {
  pageNumber: number;
  pageSize: number;
}

/** Interface for toolbar action */
export interface IAction {
  id: string;
  title: string;
  icon: string;
}

/**
 * Metadata for presenting a navigation section.
 */
export interface INavigationSection {
  id: string;
  title: string;
  icon: string;
  route: string;
  longTitle: string;
  requireAll?: string[];
  subsections?: INavigationSection[];
}

// Defines structure of table headers.
export type ITableHeaders = {
  align?: string;
  sortable?: boolean;
  text?: string;
  value?: string;
}[];

/**
 * Common interface for interacting with tabbed components.
 */
export interface ITabbedComponent {
  setActiveTab(tab: string): void;
}
