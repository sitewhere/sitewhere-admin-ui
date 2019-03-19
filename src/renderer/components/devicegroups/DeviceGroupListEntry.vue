<template>
  <v-card flat hover>
    <v-card-text class="group">
      <div class="group-image" :style="backgroundImageStyle"></div>
      <div class="group-name ellipsis title">{{ group.name }}</div>
      <div class="group-token ellipsis subheading">{{ group.token }}</div>
      <div class="group-description ellipsis">{{ group.description }}</div>
      <div class="group-roles ellipsis">
        Roles:
        <strong>{{ rolesView }}</strong>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";

import { IStyle } from "../common/Style";
import { IDeviceGroup } from "sitewhere-rest-api";

@Component({})
export default class DeviceGroupListEntry extends Vue {
  @Prop() readonly group!: IDeviceGroup;

  get rolesView(): string {
    return this.group.roles.join(", ");
  }

  // Create background image style.
  get backgroundImageStyle(): IStyle {
    return {
      "background-image": "url(" + this.group.imageUrl + ")",
      "background-size": "contain",
      "background-repeat": "no-repeat",
      "background-position": "50% 50%"
    };
  }

  // Fire event to have parent refresh content.
  refresh() {
    this.$emit("refresh");
  }
}
</script>

<style scoped>
.group {
  position: relative;
  min-height: 120px;
  overflow-x: hidden;
}
.group-image {
  position: absolute;
  top: 5px;
  left: 5px;
  bottom: 5px;
  width: 90px;
  background-color: #fff;
  border-right: 1px solid #eee;
}
.group-name {
  position: absolute;
  top: 8px;
  left: 110px;
  right: 10px;
}
.group-token {
  position: absolute;
  top: 35px;
  left: 110px;
  right: 10px;
}
.group-description {
  position: absolute;
  top: 63px;
  left: 110px;
  right: 10px;
}
.group-roles {
  position: absolute;
  top: 90px;
  left: 110px;
  right: 10px;
}
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
