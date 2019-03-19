<template>
  <v-data-table
    :headers="headers"
    :items="matches"
    :hide-actions="true"
    no-data-text="No Zones Found for Area"
  >
    <template slot="items" slot-scope="props">
      <td width="30%" :title="props.item.name">
        <span class="zone-name">
          <div class="zone-outer" :style="{'border-color': props.item.borderColor}">
            <div
              class="zone-inner"
              :style="{'background-color': props.item.fillColor, 'opacity': props.item.opacity}"
            ></div>
          </div>
          {{ props.item.name }}
        </span>
      </td>
      <td width="40%" :title="props.item.token" class="zone-token">{{ props.item.token }}</td>
      <td
        width="10%"
        style="white-space: nowrap"
        :title="formatDate(props.item.createdDate)"
      >{{ formatDate(props.item.createdDate) }}</td>
      <td
        width="10%"
        style="white-space: nowrap"
        :title="formatDate(props.item.updatedDate)"
      >{{ formatDate(props.item.updatedDate) }}</td>
      <td width="1%" style="white-space: nowrap" title="Edit/Delete">
        <actions-block @edited="onZoneUpdated" @deleted="onZoneDeleted">
          <zone-update-dialog slot="edit" :area="area" :token="props.item.token"/>
          <zone-delete-dialog slot="delete" :token="props.item.token"/>
        </actions-block>
      </td>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { ITableHeaders } from "../../libraries/component-model";
import { Component, Prop } from "vue-property-decorator";

import ActionsBlock from "../common/ActionsBlock.vue";
import ZoneUpdateDialog from "./ZoneUpdateDialog.vue";
import ZoneDeleteDialog from "./ZoneDeleteDialog.vue";

import Vue from "vue";

import { formatDate } from "../common/Utils";
import { IZone } from "sitewhere-rest-api";

@Component({
  components: {
    ActionsBlock,
    ZoneUpdateDialog,
    ZoneDeleteDialog
  }
})
export default class AreaZonesTable extends Vue {
  @Prop() readonly noDataText!: string;
  @Prop() readonly matches!: IZone[];

  headers: ITableHeaders = [
    {
      align: "left",
      sortable: false,
      text: "Name",
      value: "name"
    },
    {
      align: "left",
      sortable: false,
      text: "Token",
      value: "token"
    },
    {
      align: "left",
      sortable: false,
      text: "Created Date",
      value: "created"
    },
    {
      align: "left",
      sortable: false,
      text: "Updated Date",
      value: "updated"
    },
    {
      align: "left",
      sortable: false,
      text: "",
      value: "edit"
    }
  ];

  /** Make function available to template */
  formatDate(date: Date) {
    return formatDate(date);
  }

  // Called when a zone is deleted.
  onZoneDeleted() {
    this.$emit("zoneDeleted");
  }

  // Called when a zone is updated.
  onZoneUpdated() {
    this.$emit("zoneUpdated");
  }
}
</script>

<style scoped>
.zone-name {
  display: inline-block;
  white-space: nowrap;
}
.zone-token {
  white-space: nowrap;
}
.zone-outer {
  display: inline-block;
  margin: 0px 7px 0px 0px;
  width: 18px;
  height: 100%;
  border: 2px solid #ccc;
  vertical-align: top;
}
.zone-inner {
  width: 100%;
  height: 15px;
}
</style>
