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
          @delete="onDeleteEventSource(props.item.meta.name)"
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
        @create="onMqttEventSourceAdded"
      />
      <mqtt-event-source-update-dialog
        ref="mqttUpdate"
        @update="onMqttEventSourceUpdated"
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

import { MicroserviceIcon } from "../../../../libraries/constants";
import {
  IEventSourcesConfiguration,
  IEventSourceGenericConfiguration
} from "sitewhere-configuration-model";

@Component({
  components: {
    NewEventSourceChooser,
    MqttEventSourceCreateDialog,
    MqttEventSourceUpdateDialog
  }
})
export default class EventSourcesTable extends Vue {
  @Prop() readonly configuration!: IEventSourcesConfiguration;

  /** References */
  $refs!: Refs<{
    chooser: NewEventSourceChooser;
    mqttCreate: MqttEventSourceCreateDialog;
    mqttUpdate: MqttEventSourceUpdateDialog;
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
  onConfigurationsUpdated(updated: any) {
    this.calculateEventSourcesAsSortedArray();
  }

  /** Get page icon */
  get icon(): MicroserviceIcon {
    return MicroserviceIcon.EventSources;
  }

  /** Get event sources list */
  get eventSources(): IEventSourceGenericConfiguration[] | null {
    return this.configuration ? this.configuration.eventSources : null;
  }

  /** Get an event source by id */
  getEventSourceById(id: string): IEventSourceGenericConfiguration | null {
    let match: IEventSourceGenericConfiguration | null = null;
    if (this.eventSources) {
      this.eventSources.forEach(source => {
        if (source.id === id) {
          match = source;
        }
      });
    }
    return match;
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
    console.log(`Create for ${id}.`);
    if (id == "mqtt") {
      this.$refs.mqttCreate.openDialog();
    }
  }

  /** Called when MQTT event source is added */
  onMqttEventSourceAdded(config: IEventSourceGenericConfiguration): void {
    console.log("MQTT event source created.", config);
  }

  onMqttEventSourceUpdated(config: IEventSourceGenericConfiguration): void {
    console.log("MQTT event source updated.", config);
  }

  /** Open event source by id */
  onOpenEventSource(id: string) {
    let config: IEventSourceGenericConfiguration | null = this.getEventSourceById(
      id
    );
    if (config) {
      if (config.type === "mqtt") {
        this.$refs.mqttUpdate.openDialog(config);
      }
    }
  }

  /** Delete event source by id */
  onDeleteEventSource(id: string) {}
}
</script>

<style scoped></style>
