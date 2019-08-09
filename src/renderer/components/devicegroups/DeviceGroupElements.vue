<template>
  <sw-data-table-tab
    :tabkey="tabkey"
    :id="id"
    :loaded="loaded"
    :headers="headers"
    :results="results"
    :pageSizes="pageSizes"
    @pagingUpdated="onPagingUpdated"
    loadingMessage="Loading device group elements ..."
  >
    <template slot="items" slot-scope="props">
      <td
        v-if="props.item.device"
        width="40%"
        :title="props.item.device.token"
        :class="elementClassFor(props.item)"
      >
        <v-icon class="grey--text text--darken-2 type-icon">{{deviceIcon}}</v-icon>
        {{ props.item.device.token }}
      </td>
      <td v-else width="40%" :title="props.item.groupId" :class="elementClassFor(props.item)">
        <v-icon class="grey--text text--darken-2 type-icon">{{groupIcon}}</v-icon>
        {{ props.item.groupId }}
      </td>
      <td v-if="props.item.device" width="40%">{{ props.item.device.deviceType.name }}</td>
      <td v-else width="40%">{{ props.item.deviceGroup.name }}</td>
      <td width="10%" :title="props.item.roles">{{ props.item.roles.join(', ') }}</td>
      <td width="10%" title>
        <v-tooltip left>
          <v-btn class="ma-0" icon slot="activator" @click.stop="showDeleteDialog(props.item)">
            <v-icon class="grey--text">delete</v-icon>
          </v-btn>
          <span>Delete</span>
        </v-tooltip>
      </td>
    </template>
    <template slot="dialogs">
      <device-group-element-delete-dialog
        ref="delete"
        :token="deviceGroup.token"
        @deleted="refresh"
      />
    </template>
  </sw-data-table-tab>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Refs,
  ListComponent,
  IPageSizes,
  ITableHeaders
} from "sitewhere-ide-common";

import DeviceGroupElementDeleteDialog from "./DeviceGroupElementDeleteDialog.vue";

import { AxiosPromise } from "axios";
import { listDeviceGroupElements } from "../../rest/sitewhere-device-groups-api";
import { NavigationIcon } from "../../libraries/constants";
import {
  IDeviceGroup,
  IDeviceGroupElement,
  IDeviceGroupElementSearchCriteria,
  IDeviceGroupElementResponseFormat,
  IDeviceGroupElementSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    DeviceGroupElementDeleteDialog
  }
})
export default class DeviceGroupElements extends ListComponent<
  IDeviceGroupElement,
  IDeviceGroupElementSearchCriteria,
  IDeviceGroupElementResponseFormat,
  IDeviceGroupElementSearchResults
> {
  @Prop() readonly tabkey!: string;
  @Prop() readonly id!: string;
  @Prop() readonly deviceGroup!: IDeviceGroup;

  // References.
  $refs!: Refs<{
    list: DeviceGroupElements;
    delete: DeviceGroupElementDeleteDialog;
  }>;

  deviceIcon: NavigationIcon = NavigationIcon.Device;
  groupIcon: NavigationIcon = NavigationIcon.DeviceGroup;

  headers: ITableHeaders = [
    {
      align: "left",
      sortable: false,
      text: "Element",
      value: "element"
    },
    {
      align: "left",
      sortable: false,
      text: "Description",
      value: "description"
    },
    {
      align: "left",
      sortable: false,
      text: "Roles",
      value: "roles"
    },
    {
      align: "left",
      sortable: false,
      text: "Delete",
      value: "delete"
    }
  ];
  pageSizes: IPageSizes = [
    {
      text: "25",
      value: 25
    },
    {
      text: "50",
      value: 50
    },
    {
      text: "100",
      value: 100
    }
  ];

  /** Build search criteria for list */
  buildSearchCriteria(): IDeviceGroupElementSearchCriteria {
    let criteria: IDeviceGroupElementSearchCriteria = {};
    criteria.deviceGroupToken = this.deviceGroup.token;
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IDeviceGroupElementResponseFormat {
    let format: IDeviceGroupElementResponseFormat = {};
    format.includeDetails = true;
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IDeviceGroupElementSearchCriteria,
    format: IDeviceGroupElementResponseFormat
  ): AxiosPromise<IDeviceGroupElementSearchResults> {
    return listDeviceGroupElements(
      this.$store,
      this.deviceGroup.token,
      criteria,
      format
    );
  }

  /** Get class depending on element type */
  elementClassFor(element: IDeviceGroupElement) {
    return (element as any).device ? "" : "group-element";
  }

  /** Show dialog for deleting element */
  showDeleteDialog(element: IDeviceGroupElement) {
    this.$refs.delete.open(element.id);
  }
}
</script>

<style scoped>
.type-icon {
  font-size: 16px;
}
.group-element {
  font-weight: 700;
}
</style>
