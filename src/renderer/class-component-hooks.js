import { Component } from "sitewhere-ide-common";

// Register the router hooks with their names
Component.registerHooks([
  "beforeRouteEnter",
  "beforeRouteLeave",
  "beforeRouteUpdate" // for vue-router 2.2+
]);
