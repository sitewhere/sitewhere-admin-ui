<template>
  <data-table-tab
    :tabkey="tabkey"
    :id="id"
    :loaded="loaded"
    :headers="headers"
    :results="results"
    :pageSizes="pageSizes"
    @pagingUpdated="onPagingUpdated"
    loadingMessage="Loading area measurements ..."
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
          <zone-update-dialog slot="edit" :token="props.item.token"/>
          <zone-delete-dialog slot="delete" :token="props.item.token"/>
        </actions-block>
      </td>
    </template>
  </data-table-tab>
</template>

<script lang="ts">
import { ListComponent } from "../../libraries/component-model";
import { Component, Mixins, Prop } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

import DataTableTab from "../common/DataTableTab.vue";
import ActionsBlock from "../common/ActionsBlock.vue";
import ZoneUpdateDialog from "./ZoneUpdateDialog.vue";
import ZoneDeleteDialog from "./ZoneDeleteDialog.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { AxiosPromise } from "axios";
import { formatDate } from "../common/Utils";
import { listZones } from "../../rest/sitewhere-zones-api";
import { IPageSizes, ITableHeaders } from "../../libraries/navigation-model";
import {
  IZone,
  IZoneSearchCriteria,
  IZoneResponseFormat,
  IZoneSearchResults
} from "sitewhere-rest-api";

export class AreaZonesListComponent extends ListComponent<
  IZone,
  IZoneSearchCriteria,
  IZoneResponseFormat,
  IZoneSearchResults
> {}

@Component({
  components: {
    DataTableTab,
    ActionsBlock,
    ZoneUpdateDialog,
    ZoneDeleteDialog
  }
})
export default class AreaZones extends Mixins(AreaZonesListComponent) {
  @Prop() readonly tabkey!: string;
  @Prop() readonly id!: string;
  @Prop() readonly areaToken!: string;

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

  /** Build search criteria for list */
  buildSearchCriteria(): IZoneSearchCriteria {
    let criteria: IZoneSearchCriteria = {};
    criteria.areaToken = this.areaToken;
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IZoneResponseFormat {
    let format: IZoneResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    store: Store<SiteWhereUiSettings>,
    criteria: IZoneSearchCriteria,
    format: IZoneResponseFormat
  ): AxiosPromise<IZoneSearchResults> {
    return listZones(store, criteria, format);
  }

  /** Make function available to template */
  formatDate(date: Date) {
    return formatDate(date);
  }

  // Called when a zone is deleted.
  onZoneDeleted() {
    this.refresh();
  }

  // Called when a zone is updated.
  onZoneUpdated() {
    this.refresh();
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
