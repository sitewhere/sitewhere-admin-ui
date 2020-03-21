<template>
  <sw-datatable-section
    :icon="icon"
    title="Event Sources"
    :headers="headers"
    :items="eventSourcesAsSortedArray"
    width="50%"
    ><template v-slot:items="props">
      <td>
        <sw-datatable-link
          @linkClicked="onOpenEventSource(props.item.meta.id)"
          :text="props.item.meta.id"
        />
      </td>
      <td>{{ props.item.meta.type }}</td>
      <td>{{ props.item.decoder.type }}</td>
      <td>
        <sw-content-delete-icon
          @delete="onDeleteEventSource(props.item.meta.id)"
        />
      </td>
    </template>
    <template v-slot:datatable-footer>
      <sw-content-link
        class="mt-3"
        icon="fa-plus-circle"
        text="Add new event source."
        @linkClicked="onAddEventSource"
      />
    </template>
    <template v-slot:datatable-dialogs>
      <new-event-source-chooser ref="chooser" @chosen="onEventSourceCreate" />
      <mqtt-event-source-create-dialog
        ref="mqttCreate"
        @create="onEventSourceAdded"
      />
      <mqtt-event-source-update-dialog
        ref="mqttUpdate"
        @update="onEventSourceUpdated"
      />
      <coap-event-source-create-dialog
        ref="coapCreate"
        @create="onEventSourceAdded"
      />
      <coap-event-source-update-dialog
        ref="coapUpdate"
        @update="onEventSourceUpdated"
      />
    </template>
  </sw-datatable-section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Refs } from "sitewhere-ide-common";

import NewEventSourceChooser from "./NewEventSourceChooser.vue";
import MqttEventSourceCreateDialog from "../eventsources/mqtt/MqttEventSourceCreateDialog.vue";
import MqttEventSourceUpdateDialog from "../eventsources/mqtt/MqttEventSourceUpdateDialog.vue";
import CoapEventSourceCreateDialog from "../eventsources/coap/CoapEventSourceCreateDialog.vue";
import CoapEventSourceUpdateDialog from "../eventsources/coap/CoapEventSourceUpdateDialog.vue";

import { MicroserviceIcon } from "../../../../libraries/constants";
import { IEventSourceGenericConfiguration } from "sitewhere-configuration-model";

@Component({
  components: {
    NewEventSourceChooser,
    MqttEventSourceCreateDialog,
    MqttEventSourceUpdateDialog,
    CoapEventSourceCreateDialog,
    CoapEventSourceUpdateDialog
  }
})
export default class EventSourcesTable extends Vue {
  @Prop() readonly eventSources!: IEventSourceGenericConfiguration[];

  /** References */
  $refs!: Refs<{
    chooser: NewEventSourceChooser;
    mqttCreate: MqttEventSourceCreateDialog;
    mqttUpdate: MqttEventSourceUpdateDialog;
    coapCreate: CoapEventSourceCreateDialog;
    coapUpdate: CoapEventSourceUpdateDialog;
  }>;

  headers: any[] = [
    { text: "Id", value: "id" },
    { text: "Type", value: "type" },
    { text: "Decoder", value: "decoder" },
    { text: "", value: "delete" }
  ];

  /** Datastore configurations in format for display */
  eventSourcesAsSortedArray: any[] = [];

  @Watch("eventSources", { immediate: true })
  onEventSourcesUpdated(updated: any) {
    this.calculateEventSourcesAsSortedArray();
  }

  /** Get page icon */
  get icon(): MicroserviceIcon {
    return MicroserviceIcon.EventSources;
  }

  /** Get list of ids already in use */
  findIdsInUse(exclude?: string): string[] {
    let ids: string[] = [];
    if (this.eventSources) {
      this.eventSources.forEach(source => {
        if (source.id != exclude) {
          ids.push(source.id);
        }
      });
    }
    return ids;
  }

  /** Get event source index based on id */
  getEventSourceIndex(id: string): number | null {
    let match: number | null = null;
    if (this.eventSources) {
      this.eventSources.forEach((source, index) => {
        if (source.id === id) {
          match = index;
        }
      });
    }
    return match;
  }

  /** Get an event source by id */
  getEventSourceById(id: string): IEventSourceGenericConfiguration | null {
    let index: number | null = this.getEventSourceIndex(id);
    if (this.eventSources && index != null) {
      return this.eventSources[index];
    }
    return null;
  }

  /** Get event sources as a sorted array */
  calculateEventSourcesAsSortedArray(): void {
    let all: any[] = [];
    if (this.eventSources) {
      this.eventSources.forEach(source => {
        let meta: any = {};
        meta.id = source.id;
        meta.type = source.type;
        meta.decoder = source.decoder;
        let config: any = source.configuration;
        let decoder: any = source.decoder;
        all.push({ meta: meta, config: config, decoder: decoder });
      });
    }
    all.sort(function(a, b) {
      return a.meta.id.localeCompare(b.meta.id);
    });
    this.eventSourcesAsSortedArray = all;
  }

  /** Add new event source */
  onAddEventSource() {
    this.$refs.chooser.openChooser();
  }

  /** Called to create a new event source based on type */
  onEventSourceCreate(id: string): void {
    let idsInUse: string[] = this.findIdsInUse();
    if (id == "coap") {
      this.$refs.coapCreate.openDialog(idsInUse);
    } else if (id == "mqtt") {
      this.$refs.mqttCreate.openDialog(idsInUse);
    }
  }

  /** Called when MQTT event source is added */
  onEventSourceAdded(config: IEventSourceGenericConfiguration): void {
    if (this.eventSources) {
      this.eventSources.push(config);
      this.calculateEventSourcesAsSortedArray();
    }
    this.$emit("create", config);
  }

  /** Open event source by id */
  onOpenEventSource(id: string) {
    let config: IEventSourceGenericConfiguration | null = this.getEventSourceById(
      id
    );
    let idsInUse: string[] = this.findIdsInUse(id);
    if (config) {
      if (config.type === "coap") {
        this.$refs.coapUpdate.openDialog(config, idsInUse);
      } else if (config.type === "mqtt") {
        this.$refs.mqttUpdate.openDialog(config, idsInUse);
      }
    }
  }

  /** Called when MQTT event source is updated */
  onEventSourceUpdated(
    originalId: string,
    config: IEventSourceGenericConfiguration
  ): void {
    let index: number | null = this.getEventSourceIndex(originalId);
    if (this.eventSources && index != null) {
      Vue.set(this.eventSources, index, config);
      this.calculateEventSourcesAsSortedArray();
    }
    this.$emit("update", originalId, config);
  }

  /** Delete event source by id */
  onDeleteEventSource(id: string) {
    let index: number | null = this.getEventSourceIndex(id);
    if (this.eventSources && index != null) {
      this.eventSources.splice(index);
      this.calculateEventSourcesAsSortedArray();
    }
    this.$emit("delete", id);
  }
}
</script>

<style scoped></style>
