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
      <v-tab key="settings">Device Slot Settings</v-tab>
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
                    label="Slot name"
                    v-model="name"
                    prepend-icon="info"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    required
                    class="mt-1"
                    label="Slot path"
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
import { Component, Ref } from "vue-property-decorator";
import { ITabbedComponent, NavigationIcon } from "sitewhere-ide-common";
import { DialogComponent } from "sitewhere-ide-components";

import { IDeviceType } from "sitewhere-rest-api";

@Component({})
export default class DeviceSlotDialog extends DialogComponent<IDeviceType> {
  @Ref() readonly dialog!: ITabbedComponent;

  name: string | null = null;
  path: string | null = null;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceType;
  }

  /** Generate payload from UI */
  generatePayload() {
    const payload: any = {};
    return payload;
  }

  /** Reset dialog contents */
  reset() {}

  /** Load dialog from a given payload */
  load() {}

  /** Called after create button is clicked */
  onCreateClicked() {}
}
</script>
