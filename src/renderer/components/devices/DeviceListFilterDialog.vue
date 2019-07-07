<template>
  <sw-base-dialog
    title="Update Device Filters"
    width="800"
    :visible="dialogVisible"
    createLabel="Update Filter"
    cancelLabel="Cancel"
    :error="error"
    @createClicked="onFilterUpdateClicked"
    @cancelClicked="onCancelClicked"
  >
    <v-tabs v-model="active">
      <v-tabs-bar dark color="primary">
        <v-tabs-slider></v-tabs-slider>
        <v-tabs-item key="area">Area</v-tabs-item>
        <v-tabs-item key="deviceType">Device Type</v-tabs-item>
        <v-tabs-item key="group">Device Group</v-tabs-item>
        <v-tabs-item key="created">Created Date</v-tabs-item>
        <slot name="tabitem"></slot>
      </v-tabs-bar>
      <v-tabs-items>
        <v-tabs-content key="area">
          <v-card flat>
            <v-card-text>
              <area-chooser
                :chosenText="areaChosenText"
                :notChosenText="areaNotChosenText"
                :selected="areaFilter"
                @areaUpdated="onAreaUpdated"
              ></area-chooser>
            </v-card-text>
          </v-card>
        </v-tabs-content>
        <v-tabs-content key="deviceType">
          <v-card flat>
            <v-card-text>
              <device-type-chooser
                :chosenText="deviceTypeChosenText"
                :notChosenText="deviceTypeNotChosenText"
                v-model="deviceTypeToken"
                @deviceTypeUpdated="onDeviceTypeUpdated"
              ></device-type-chooser>
            </v-card-text>
          </v-card>
        </v-tabs-content>
        <v-tabs-content key="group">
          <v-card flat>
            <v-card-text>
              <device-group-chooser
                :chosenText="groupChosenText"
                :notChosenText="groupNotChosenText"
                :selected="deviceGroupFilter"
                @groupUpdated="onGroupUpdated"
              ></device-group-chooser>
            </v-card-text>
          </v-card>
        </v-tabs-content>
        <v-tabs-content key="created">
          <v-card flat>
            <v-card-text>
              <v-container fluid>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-select
                      :items="createdDateRanges"
                      v-model="createdDateFilter"
                      label="Created Date"
                      prepend-icon="insert_invitation"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 mb-2 pb-2>
                    <v-divider></v-divider>
                  </v-flex>
                  <v-flex xs12>
                    <v-card flat>
                      <v-card-text v-if="createdDateFilter === 'all'">
                        Include all devices in search without consideration
                        of created date.
                      </v-card-text>
                      <v-card-text
                        v-if="createdDateFilter === 'hour'"
                      >Include only devices created within the last hour.</v-card-text>
                      <v-card-text
                        v-if="createdDateFilter === 'day'"
                      >Include only devices created within the last day.</v-card-text>
                      <v-card-text
                        v-if="createdDateFilter === 'week'"
                      >Include only devices created within the last week.</v-card-text>
                      <v-card-text v-if="createdDateFilter === 'after'">
                        <sw-date-time-picker
                          label="Devices created after this date/time"
                          :v-model="createdAfter"
                          @input="onCreatedAfterUpdated"
                        />
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
  </sw-base-dialog>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "sitewhere-ide-common";
import Vue from "vue";

import { IDeviceSearchCriteria } from "sitewhere-rest-api";

@Component({})
export default class DeviceListFilterDialog extends Vue {
  @Prop() readonly filter!: any;

  active: string | null = null;
  menu: string | null = null;

  areaFilter?: string;
  deviceTypeFilter?: string;
  deviceGroupFilter?: string;
  createdDateFilter: string = "all";
  createdAfter: string | null = null;

  deviceTypeChosenText: string =
    "Search results will be limited to devices implementing the device type below.";
  deviceTypeNotChosenText: string =
    "Choose a device type from the list below to limit search results to devices implementing the device type.";
  groupChosenText: string =
    "Search results will be limited to devices in the device group below.";
  groupNotChosenText: string =
    "Choose a device group from the list below to limit search results to devices in that group.";

  createdDateRanges: {}[] = [
    {
      text: "Devices created at any time",
      value: "all"
    },
    {
      text: "Devices created in the last hour",
      value: "hour"
    },
    {
      text: "Devices created in the last day",
      value: "day"
    },
    {
      text: "Devices created in the last week",
      value: "week"
    },
    {
      text: "Devices created after a given date",
      value: "after"
    }
  ];

  dialogVisible: boolean = false;
  error: boolean = false;

  @Watch("filter", { immediate: true })
  onFilterChanged(updated: IDeviceSearchCriteria) {
    this.load(updated);
  }

  /** Called when area filter is updated */
  onAreaUpdated(token: string) {
    this.areaFilter = token;
  }

  /** Called when deviceType filter is updated */
  onDeviceTypeUpdated(token: string) {
    this.deviceTypeFilter = token;
  }

  /** Called when device group filter is updated */
  onDeviceGroupUpdated(token: string) {
    this.deviceGroupFilter = token;
  }

  // Called when 'created after' date is updated.
  onCreatedAfterUpdated(date: any) {
    console.log(date);
  }

  // Generate payload from UI.
  generatePayload(): IDeviceSearchCriteria {
    var criteria: IDeviceSearchCriteria = {};
    criteria.areaToken = this.areaFilter;
    criteria.deviceTypeToken = this.$data.deviceTypeFilter;
    return criteria;
  }

  // Load dialog from a given payload.
  load(payload: IDeviceSearchCriteria) {
    if (payload) {
      this.$data.areaFilter = payload.areaToken;
      this.$data.deviceTypeFilter = payload.deviceTypeToken;
      this.$data.deviceGroupFilter = payload.areaToken;
    }
  }

  // Called after filter update button is clicked.
  onFilterUpdateClicked(e: any) {
    var payload = this.generatePayload();
    this.$emit("filter", payload);
  }

  // Called after cancel button is clicked.
  onCancelClicked(e: any) {
    this.$data.dialogVisible = false;
  }
}
</script>
