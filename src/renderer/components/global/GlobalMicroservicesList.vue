<template>
  <sw-detail-page
    :icon="icon"
    title="Global Microservices"
    loadingMessage="Loading global microservices list ..."
    :loaded="loaded"
    :record="topology"
  >
    <template slot="tabs">
      <v-tab key="microservices">Microservices</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="microservices">
        <microservice-list :topology="topology" @microserviceClicked="onMicroserviceClicked"/>
      </v-tab-item>
    </template>
  </sw-detail-page>
</template>

<script lang="ts">
import {
  Component,
  DetailComponent,
  INavigationSection
} from "sitewhere-ide-common";

import MicroserviceList from "../microservice/MicroserviceList.vue";

import { AxiosPromise } from "axios";
import { NavigationIcon } from "../../libraries/constants";
import { getGlobalTopology } from "../../rest/sitewhere-instance-api";
import { IInstanceTopologySummary } from "sitewhere-rest-api";

@Component({
  components: {
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
  loadRecord(token: string): AxiosPromise<IInstanceTopologySummary[]> {
    return getGlobalTopology(this.$store);
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
