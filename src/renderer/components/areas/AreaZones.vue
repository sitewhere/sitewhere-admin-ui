<template>
  <list-tab :key="key" :id="id" :loaded="loaded" @pagingUpdated="onPagingUpdated">
    <area-zones-table
      :matches="matches"
      no-data-text="No Zones Found for Area"
      @zoneDeleted="onZoneDeleted"
      @zoneUpdated="onZoneUpdated"
    />
  </list-tab>
</template>

<script lang="ts">
import { ListComponent } from "../../libraries/component-model";
import { Component, Mixins, Prop } from "vue-property-decorator";

// @ts-ignore: Unused import
import Vue, { VueConstructor } from "vue";

import ListTab from "../common/ListTab.vue";
import AreaZonesTable from "./AreaZonesTable.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { AxiosPromise } from "axios";
import { listZones } from "../../rest/sitewhere-zones-api";
import { IPageSizes } from "../../libraries/navigation-model";
import {
  IZone,
  IZoneSearchCriteria,
  IZoneResponseFormat,
  IZoneSearchResults
} from "sitewhere-rest-api/dist/model/zones-model";

export class AreaZonesListComponent extends ListComponent<
  IZone,
  IZoneSearchCriteria,
  IZoneResponseFormat,
  IZoneSearchResults
> {}

@Component({
  components: {
    ListTab,
    AreaZonesTable
  }
})
export default class AreaZones extends Mixins(AreaZonesListComponent) {
  @Prop() readonly key!: string;
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
</style>
