import { Route } from "vue-router";

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
