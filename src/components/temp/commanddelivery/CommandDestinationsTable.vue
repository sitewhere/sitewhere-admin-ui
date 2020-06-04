<template>
  <content-section :icon="icon" title="Command Destinations">
    <section-overview title="Configured Command Destinations">
      Command destinations are configured to deliver device commands
      over various communication protocols. A command router chooses which
      destinations will receive a given command.
    </section-overview>
    <datatable-section :headers="headers" :items="commandDestsAsSortedArray" width="50%">
      <template v-slot:item="props">
        <tr>
          <td width="48%">
            <datatable-link
              @linkClicked="onOpenCommandDestination(props.item.meta.id)"
              :text="props.item.meta.id"
            />
          </td>
          <td width="48%">{{ props.item.meta.type }}</td>
          <td width="4%">
            <content-delete-icon @delete="onDeleteCommandDestination(props.item.meta.id)" />
          </td>
        </tr>
      </template>
      <template v-slot:datatable-footer>
        <content-link
          class="mt-5"
          icon="fa-plus-circle"
          text="Add new command destination."
          @linkClicked="onAddCommandDestination"
        />
      </template>
      <template v-slot:datatable-dialogs>
        <new-command-destination-chooser ref="chooser" @chosen="onCommandDestinationCreate" />
        <coap-command-destination-create-dialog
          ref="coapCreate"
          :tenantId="tenantId"
          @create="onCommandDestinationAdded"
        />
        <coap-command-destination-update-dialog
          ref="coapUpdate"
          :tenantId="tenantId"
          @update="onCommandDestinationUpdated"
        />
        <mqtt-command-destination-create-dialog
          ref="mqttCreate"
          :tenantId="tenantId"
          @create="onCommandDestinationAdded"
        />
        <mqtt-command-destination-update-dialog
          ref="mqttUpdate"
          :tenantId="tenantId"
          @update="onCommandDestinationUpdated"
        />
      </template>
    </datatable-section>
  </content-section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Ref } from "vue-property-decorator";
import { MicroserviceIcon } from "sitewhere-ide-common";

import NewCommandDestinationChooser from "./NewCommandDestinationChooser.vue";
import CoapCommandDestinationCreateDialog from "./coap/CoapCommandDestinationCreateDialog.vue";
import CoapCommandDestinationUpdateDialog from "./coap/CoapCommandDestinationUpdateDialog.vue";
import MqttCommandDestinationCreateDialog from "./mqtt/MqttCommandDestinationCreateDialog.vue";
import MqttCommandDestinationUpdateDialog from "./mqtt/MqttCommandDestinationUpdateDialog.vue";

import {
  ContentSection,
  ContentDeleteIcon,
  DatatableSection,
  DatatableLink,
  ContentLink,
  SectionOverview
} from "sitewhere-ide-components";

import { ICommandDestinationGenericConfiguration } from "sitewhere-configuration-model";

@Component({
  components: {
    ContentSection,
    DatatableSection,
    DatatableLink,
    ContentDeleteIcon,
    ContentLink,
    SectionOverview,
    NewCommandDestinationChooser,
    CoapCommandDestinationCreateDialog,
    CoapCommandDestinationUpdateDialog,
    MqttCommandDestinationCreateDialog,
    MqttCommandDestinationUpdateDialog
  }
})
export default class CommandDeliveryTable extends Vue {
  @Prop() readonly tenantId!: string;
  @Prop() readonly destinations!: ICommandDestinationGenericConfiguration[];
  @Ref() readonly chooser!: NewCommandDestinationChooser;
  @Ref() readonly coapCreate!: CoapCommandDestinationCreateDialog;
  @Ref() readonly coapUpdate!: CoapCommandDestinationUpdateDialog;
  @Ref() readonly mqttCreate!: MqttCommandDestinationCreateDialog;
  @Ref() readonly mqttUpdate!: MqttCommandDestinationUpdateDialog;

  headers: { text: string; value: string }[] = [
    { text: "Id", value: "id" },
    { text: "Type", value: "type" },
    { text: "", value: "delete" }
  ];

  /** Command destinations in format for display */
  commandDestsAsSortedArray: {
    meta: { id: string; type: string };
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    config: any;
  }[] = [];

  @Watch("commandDestinations", { immediate: true })
  onCommandDestinationsUpdated() {
    this.calculateCommandDestinationsAsSortedArray();
  }

  /** Get page icon */
  get icon(): MicroserviceIcon {
    return MicroserviceIcon.CommandDelivery;
  }

  /** Get list of ids already in use */
  findIdsInUse(exclude?: string): string[] {
    const ids: string[] = [];
    if (this.destinations) {
      this.destinations.forEach(dest => {
        if (dest.id != exclude) {
          ids.push(dest.id);
        }
      });
    }
    return ids;
  }

  /** Get command destination index based on id */
  getCommandDestinationIndex(id: string): number | null {
    let match: number | null = null;
    if (this.destinations) {
      this.destinations.forEach((dest, index) => {
        if (dest.id === id) {
          match = index;
        }
      });
    }
    return match;
  }

  /** Get a command destination by id */
  getCommandDestinationById(
    id: string
  ): ICommandDestinationGenericConfiguration | null {
    const index: number | null = this.getCommandDestinationIndex(id);
    if (this.destinations && index != null) {
      return this.destinations[index];
    }
    return null;
  }

  /** Get command destinations as a sorted array */
  calculateCommandDestinationsAsSortedArray(): void {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const all: { meta: { id: string; type: string }; config: any }[] = [];
    if (this.destinations) {
      this.destinations.forEach(dest => {
        const meta: { id: string; type: string } = {
          id: dest.id,
          type: dest.type
        };
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        const config: any = dest.configuration;
        all.push({ meta: meta, config: config });
      });
    }
    all.sort(function(a, b) {
      return a.meta.id.localeCompare(b.meta.id);
    });
    this.commandDestsAsSortedArray = all;
  }

  /** Add new command destination */
  onAddCommandDestination() {
    this.chooser.openChooser();
  }

  /** Called to create a new command destination based on type */
  onCommandDestinationCreate(id: string): void {
    const idsInUse: string[] = this.findIdsInUse();
    if (id == "coap") {
      this.coapCreate.openDialog(idsInUse);
    } else if (id == "mqtt") {
      this.mqttCreate.openDialog(idsInUse);
    }
  }

  /** Called when command destination is added */
  onCommandDestinationAdded(
    config: ICommandDestinationGenericConfiguration
  ): void {
    if (this.destinations) {
      this.destinations.push(config);
      this.calculateCommandDestinationsAsSortedArray();
    }
    this.$emit("create", config);
  }

  /** Open command destination by id */
  onOpenCommandDestination(id: string) {
    const config: ICommandDestinationGenericConfiguration | null = this.getCommandDestinationById(
      id
    );
    const idsInUse: string[] = this.findIdsInUse(id);
    if (config) {
      if (config.type === "coap") {
        this.coapUpdate.openDialog(config, idsInUse);
      } else if (config.type === "mqtt") {
        this.mqttUpdate.openDialog(config, idsInUse);
      }
    }
  }

  /** Called when command destination is updated */
  onCommandDestinationUpdated(
    originalId: string,
    config: ICommandDestinationGenericConfiguration
  ): void {
    const index: number | null = this.getCommandDestinationIndex(originalId);
    if (this.destinations && index != null) {
      Vue.set(this.destinations, index, config);
      this.calculateCommandDestinationsAsSortedArray();
    }
    this.$emit("update", originalId, config);
  }

  /** Delete command destination by id */
  onDeleteCommandDestination(id: string) {
    const index: number | null = this.getCommandDestinationIndex(id);
    if (this.destinations && index != null) {
      this.destinations.splice(index);
      this.calculateCommandDestinationsAsSortedArray();
    }
    this.$emit("delete", id);
  }
}
</script>

