<template>
  <v-card style="border: 1px solid #ddd;" flat tile hover>
    <v-card-text class="tenant" @click.stop="onConfigureTenant">
      <div v-if="tenant.imageUrl" class="tenant-logo" :style="tenantLogoStyle(tenant)"></div>
      <div class="tenant-divider"></div>
      <div class="tenant-name headline ellipsis mt-2">{{ tenant.name }} ({{ tenant.token }})</div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { ITenant } from "sitewhere-rest-api";

@Component({
  components: {}
})
export default class TenantListEntry extends Vue {
  @Prop() readonly tenant!: ITenant;

  /** Styling for tenant logo */
  tenantLogoStyle(tenant: ITenant) {
    return {
      background: "url(" + tenant.imageUrl + ")",
      "background-size": "contain",
      "background-repeat": "no-repeat",
      "background-position": "50% 50%"
    };
  }

  /** Configure tenant */
  onConfigureTenant() {
    this.$emit("configureTenant", this.tenant);
  }
}
</script>

<style scoped>
.tenant {
  min-height: 90px;
}
.tenant-symbol {
  position: absolute;
  top: 55px;
  left: 270px;
}
.tenant-message {
  position: absolute;
  top: 53px;
  left: 294px;
  font-size: 14px;
}
.tenant-logo {
  position: absolute;
  top: 10px;
  left: 30px;
  bottom: 10px;
  width: 200px;
}
.tenant-divider {
  position: absolute;
  top: 10px;
  left: 230px;
  bottom: 10px;
  width: 20px;
  border-right: 1px solid #eee;
}
.tenant-name {
  position: absolute;
  top: 20px;
  left: 270px;
  right: 10px;
}
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
