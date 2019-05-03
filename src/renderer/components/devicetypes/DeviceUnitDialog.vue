<template>
  <sw-base-dialog
    ref="dialog"
    :icon="icon"
    :title="title"
    :width="width"
    :loaded="loaded"
    :visible="dialogVisible"
    :createLabel="createLabel"
    :cancelLabel="cancelLabel"
    @createClicked="onCreateClicked"
    @cancelClicked="onCancelClicked"
  >
    <template slot="tabs">
      <v-tab key="settings">Device Unit Settings</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="settings">
        <v-card flat>
          <v-card-text>
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    required
                    class="mt-1"
                    label="Unit name"
                    v-model="name"
                    prepend-icon="info"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    required
                    class="mt-1"
                    label="Relative path"
                    v-model="path"
                    prepend-icon="folder"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </template>
  </sw-base-dialog>
</template>

<script lang="ts">
import {
  Component,
  DialogComponent,
  DialogSection,
  ITabbedComponent,
  Refs
} from "sitewhere-ide-common";
import { NavigationIcon } from "../../libraries/constants";

import { IDeviceType, IDeviceUnit, IDeviceSlot } from "sitewhere-rest-api";

@Component({})
export default class DeviceUnitDialog extends DialogComponent<IDeviceType> {
  name: string | null = null;
  path: string | null = null;

  // References.
  $refs!: Refs<{
    dialog: ITabbedComponent;
  }>;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceType;
  }

  // Generate payload from UI.
  generatePayload() {
    let payload: any = {};
    return payload;
  }

  // Reset dialog contents.
  reset() {}

  // Load dialog from a given payload.
  load(payload: IDeviceType) {}

  // Called after create button is clicked.
  onCreateClicked(e: any) {}
}
</script>

<style scoped>
</style>
