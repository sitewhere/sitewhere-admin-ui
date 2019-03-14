import { Route } from "vue-router";

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
}
