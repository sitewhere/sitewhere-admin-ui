import { Route } from "vue-router";

/**
 * Annotates components that can have the current route injected.
 */
export interface WithRoute {
  $route: Route;
}
