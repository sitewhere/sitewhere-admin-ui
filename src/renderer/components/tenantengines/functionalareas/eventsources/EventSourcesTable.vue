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
      <active-mq-broker-event-source-create-dialog
        ref="amqBrokerCreate"
        @create="onEventSourceAdded"
      />
      <active-mq-broker-event-source-update-dialog
        ref="amqBrokerUpdate"
        @update="onEventSourceUpdated"
      />
      <active-mq-client-event-source-create-dialog
        ref="amqClientCreate"
        @create="onEventSourceAdded"
      />
      <active-mq-client-event-source-update-dialog
        ref="amqClientUpdate"
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
      <event-hub-event-source-create-dialog
        ref="eventHubCreate"
        @create="onEventSourceAdded"
      />
      <event-hub-event-source-update-dialog
        ref="eventHubUpdate"
        @update="onEventSourceUpdated"
      />
      <mqtt-event-source-create-dialog
        ref="mqttCreate"
        @create="onEventSourceAdded"
      />
      <mqtt-event-source-update-dialog
        ref="mqttUpdate"
        @update="onEventSourceUpdated"
      />
      <rabbit-mq-event-source-create-dialog
        ref="rabbitMqCreate"
        @create="onEventSourceAdded"
      />
      <rabbit-mq-event-source-update-dialog
        ref="rabbitMqUpdate"
        @update="onEventSourceUpdated"
      />
    </template>
  </sw-datatable-section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Refs } from "sitewhere-ide-common";

import NewEventSourceChooser from "./NewEventSourceChooser.vue";
import ActiveMqBrokerEventSourceCreateDialog from "../eventsources/activemq/ActiveMqBrokerEventSourceCreateDialog.vue";
import ActiveMqBrokerEventSourceUpdateDialog from "../eventsources/activemq/ActiveMqBrokerEventSourceUpdateDialog.vue";
import ActiveMqClientEventSourceCreateDialog from "../eventsources/activemq/ActiveMqClientEventSourceCreateDialog.vue";
import ActiveMqClientEventSourceUpdateDialog from "../eventsources/activemq/ActiveMqClientEventSourceUpdateDialog.vue";
import CoapEventSourceCreateDialog from "../eventsources/coap/CoapEventSourceCreateDialog.vue";
import CoapEventSourceUpdateDialog from "../eventsources/coap/CoapEventSourceUpdateDialog.vue";
import EventHubEventSourceCreateDialog from "../eventsources/azure/EventHubEventSourceCreateDialog.vue";
import EventHubEventSourceUpdateDialog from "../eventsources/azure/EventHubEventSourceUpdateDialog.vue";
import MqttEventSourceCreateDialog from "../eventsources/mqtt/MqttEventSourceCreateDialog.vue";
import MqttEventSourceUpdateDialog from "../eventsources/mqtt/MqttEventSourceUpdateDialog.vue";
import RabbitMqEventSourceCreateDialog from "../eventsources/rabbitmq/RabbitMqEventSourceCreateDialog.vue";
import RabbitMqEventSourceUpdateDialog from "../eventsources/rabbitmq/RabbitMqEventSourceUpdateDialog.vue";

import { MicroserviceIcon } from "../../../../libraries/constants";
import { IEventSourceGenericConfiguration } from "sitewhere-configuration-model";

@Component({
  components: {
    NewEventSourceChooser,
    ActiveMqBrokerEventSourceCreateDialog,
    ActiveMqBrokerEventSourceUpdateDialog,
    ActiveMqClientEventSourceCreateDialog,
    ActiveMqClientEventSourceUpdateDialog,
    CoapEventSourceCreateDialog,
    CoapEventSourceUpdateDialog,
    EventHubEventSourceCreateDialog,
    EventHubEventSourceUpdateDialog,
    MqttEventSourceCreateDialog,
    MqttEventSourceUpdateDialog,
    RabbitMqEventSourceCreateDialog,
    RabbitMqEventSourceUpdateDialog
  }
})
export default class EventSourcesTable extends Vue {
  @Prop() readonly eventSources!: IEventSourceGenericConfiguration[];

  /** References */
  $refs!: Refs<{
    chooser: NewEventSourceChooser;
    amqBrokerCreate: ActiveMqBrokerEventSourceCreateDialog;
    amqBrokerUpdate: ActiveMqBrokerEventSourceUpdateDialog;
    amqClientCreate: ActiveMqClientEventSourceCreateDialog;
    amqClientUpdate: ActiveMqClientEventSourceUpdateDialog;
    coapCreate: CoapEventSourceCreateDialog;
    coapUpdate: CoapEventSourceUpdateDialog;
    eventHubCreate: EventHubEventSourceCreateDialog;
    eventHubUpdate: EventHubEventSourceUpdateDialog;
    mqttCreate: MqttEventSourceCreateDialog;
    mqttUpdate: MqttEventSourceUpdateDialog;
    rabbitMqCreate: RabbitMqEventSourceCreateDialog;
    rabbitMqUpdate: RabbitMqEventSourceUpdateDialog;
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
    if (id == "activemq-broker") {
      this.$refs.amqBrokerCreate.openDialog(idsInUse);
    } else if (id == "activemq-client") {
      this.$refs.amqClientCreate.openDialog(idsInUse);
    } else if (id == "coap") {
      this.$refs.coapCreate.openDialog(idsInUse);
    } else if (id == "eventhub") {
      this.$refs.eventHubCreate.openDialog(idsInUse);
    } else if (id == "mqtt") {
      this.$refs.mqttCreate.openDialog(idsInUse);
    } else if (id == "rabbitmq") {
      this.$refs.rabbitMqCreate.openDialog(idsInUse);
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
      if (config.type === "activemq-broker") {
        this.$refs.amqBrokerUpdate.openDialog(config, idsInUse);
      } else if (config.type === "activemq-client") {
        this.$refs.amqClientUpdate.openDialog(config, idsInUse);
      } else if (config.type === "coap") {
        this.$refs.coapUpdate.openDialog(config, idsInUse);
      } else if (config.type === "eventhub") {
        this.$refs.eventHubUpdate.openDialog(config, idsInUse);
      } else if (config.type === "mqtt") {
        this.$refs.mqttUpdate.openDialog(config, idsInUse);
      } else if (config.type === "rabbitmq") {
        this.$refs.rabbitMqUpdate.openDialog(config, idsInUse);
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
