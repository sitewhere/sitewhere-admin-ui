<template>
  <div>
    <v-card flat v-if="context">
      <condensed-toolbar :title="context.model.name">
        <template slot="icon">
          <font-awesome-icon :icon="context.model.icon" size="lg"/>
        </template>
        <v-tooltip left>
          <v-icon
            v-if="contextStack.length > 1"
            @click="onPopContext"
            small
            class="mr-2"
            slot="activator"
          >arrow_upward</v-icon>
          <span>Up One Level</span>
        </v-tooltip>
        <v-tooltip left>
          <v-icon
            v-if="context.model.attributes"
            @click="onConfigureCurrent"
            small
            slot="activator"
          >settings</v-icon>
          <span>Configure</span>
        </v-tooltip>
      </condensed-toolbar>
      <v-card flat color="grey lighten-3">
        <v-breadcrumbs divider="/" class="pb-0 mb-0 pt-0 mt-0">
          <v-breadcrumbs-item v-for="bcContext in contextStack" :key="bcContext.model.localName">
            <v-btn
              small
              flat
              @click="onPopToContext(bcContext)"
              class="pa-0 ma-0"
              style="font-size: 8pt;"
            >{{ bcContext.model.name }}</v-btn>
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-card>
      <v-card-text>
        <div class="subheading" v-html="context.model.description"/>
        <slot/>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";
import { IConfigurationContext } from "./ConfigurationModel";

import CondensedToolbar from "../common/CondensedToolbar.vue";

@Component({
  components: {
    CondensedToolbar
  }
})
export default class MicroserviceBanner extends Vue {
  @Prop() readonly context!: IConfigurationContext;
  @Prop() readonly contextStack!: IConfigurationContext[];

  // Pop context from stack.
  onPopContext() {
    this.$emit("popContext");
  }

  // Pop to a given context.
  onPopToContext(context: IConfigurationContext) {
    this.$emit("popToContext", context);
  }

  // Pop context from stack.
  onConfigureCurrent() {
    this.$emit("configureCurrent");
  }
}
</script>
