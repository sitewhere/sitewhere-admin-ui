<template>
  <v-card flat class="pa-2">
    <v-layout row>
      <v-flex xs3>
        <association-avatar
          :identifier="assignment.customerId"
          label="Customer"
          :name="assignment.customerName"
          :imageUrl="assignment.customerImageUrl"
          class="right-border"
        />
      </v-flex>
      <v-flex xs3>
        <association-avatar
          :identifier="assignment.areaId"
          label="Area"
          :name="assignment.areaName"
          :imageUrl="assignment.areaImageUrl"
          class="right-border"
        />
      </v-flex>
      <v-flex xs3>
        <association-avatar
          :identifier="assignment.assetId"
          label="Asset"
          :name="assignment.assetName"
          :imageUrl="assignment.assetImageUrl"
          class="right-border"
        />
      </v-flex>
      <v-flex xs3>
        <association-avatar
          :identifier="assignment.deviceId"
          label="Device"
          :name="assignment.deviceToken"
          :imageUrl="assignment.deviceTypeImageUrl"
        />
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";

import { IDeviceAssignmentSummary } from "sitewhere-rest-api";

import AssociationAvatar from "./AssociationAvatar.vue";

@Component({ components: { AssociationAvatar } })
export default class AssignmentAssociations extends Vue {
  @Prop() readonly assignment!: IDeviceAssignmentSummary;
}
</script>

<style scoped>
.right-border {
  border-right: 1px solid #eee;
}
</style>