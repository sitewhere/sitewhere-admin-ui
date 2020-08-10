<template>
  <v-card flat tile style="height: 100%">
    <v-card-text>
      <div class="flex-rows">
        <div v-if="microservice && tenant" class="plugin-header">
          <slot name="header">
            <page-header :text="header" />
          </slot>
        </div>
        <div class="plugin-content">
          <slot />
        </div>
        <div class="plugin-footer">
          <slot name="footer" />
        </div>
      </div>
    </v-card-text>
    <slot name="dialogs"></slot>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { PageHeader } from "sitewhere-ide-components";

import { VCard, VCardText } from "vuetify/lib";

import {
  ITenantEngineConfiguration,
  IMicroserviceSummary,
  ITenant
} from "sitewhere-rest-api";

@Component({
  components: { VCard, VCardText, PageHeader }
})
export default class TenantEnginePlugin extends Vue {
  @Prop() readonly configuration!: ITenantEngineConfiguration;

  /** Get microservice information */
  get tenant(): ITenant | null {
    return this.configuration ? this.configuration.tenant : null;
  }

  /** Get microservice information */
  get microservice(): IMicroserviceSummary | null {
    return this.configuration ? this.configuration.microservice : null;
  }

  /** Get header displayed at top of page */
  get header(): string | null {
    return this.tenant && this.microservice
      ? `${this.microservice.name} Configuration for Tenant '${this.tenant.name}'`
      : null;
  }
}
</script>

<style scoped>
.flex-rows {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.plugin-header {
  flex: 0;
}
.plugin-content {
  flex: 1;
  background-color: #fff;
  overflow-y: auto;
}
.plugin-footer {
  flex: 0;
}
</style>
