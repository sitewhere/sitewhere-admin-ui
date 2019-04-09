<template>
  <detail-page
    :icon="icon"
    title="Global Microservices"
    loadingMessage="Loading global microservices list ..."
    :loaded="loaded"
    :record="topology"
  >
    <template slot="tabs">
      <v-tab key="microservices" href="#microservices">Microservices</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="microservices" id="microservices">
        <microservice-list :topology="topology" @microserviceClicked="onMicroserviceClicked"/>
      </v-tab-item>
    </template>
  </detail-page>
</template>

<script lang="ts">
import {
  DetailComponent,
  DialogComponent
} from "../../libraries/component-model";
import { Component } from "vue-property-decorator";

import DetailPage from "../common/DetailPage.vue";
import MicroserviceList from "../microservice/MicroserviceList.vue";

import { Store } from "vuex";
import { SiteWhereUiSettings } from "../../store";
import { handleError } from "../common/Utils";
import { AxiosPromise, AxiosResponse } from "axios";
import { NavigationIcon } from "../../libraries/constants";
import { INavigationSection, Refs } from "../../libraries/navigation-model";
import { getGlobalTopology } from "../../rest/sitewhere-instance-api";
import {
  ITenant,
  ITenantResponseFormat,
  IInstanceTopologySummary
} from "sitewhere-rest-api";

@Component({
  components: {
    DetailPage,
    MicroserviceList
  }
})
export default class GlobalMicroservicesList extends DetailComponent<
  IInstanceTopologySummary[]
> {
  get topology(): IInstanceTopologySummary[] | null {
    return this.record;
  }

  /** Icon for page */
  get icon(): NavigationIcon {
    return NavigationIcon.Global;
  }

  /** Load record */
  loadRecord(
    store: Store<SiteWhereUiSettings>,
    token: string
  ): AxiosPromise<IInstanceTopologySummary[]> {
    return getGlobalTopology(store);
  }

  /** Called after data is loaded */
  afterRecordLoaded(topology: IInstanceTopologySummary[]) {
    var section: INavigationSection = {
      id: "global",
      title: "Global Microservices",
      icon: "globe",
      route: "/system/microservices",
      longTitle: "Manage Global Microservices"
    };
    this.$store.commit("currentSection", section);
  }

  /** Called if a microservice is clicked */
  onMicroserviceClicked(microservice: IInstanceTopologySummary) {
    this.$router.push("/system/microservices/" + microservice.identifier);
  }
}
</script>

<style>
</style>
