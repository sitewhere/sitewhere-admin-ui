<template>
  <event-source-dialog
    ref="dialog"
    type="activemq-broker"
    :icon="icon"
    :title="title"
    :width="width"
    :loaded="true"
    :idsInUse="idsInUse"
    :visible="dialogVisible"
    :createLabel="createLabel"
    :cancelLabel="cancelLabel"
    @createClicked="onCreateClicked"
    @cancelClicked="onCancelClicked"
  >
    <template slot="event-source-tabs">
      <v-tab key="broker">Broker</v-tab>
    </template>
    <template slot="event-source-tab-items">
      <v-tab-item key="broker">
        <active-mq-broker-fields ref="broker" />
      </v-tab-item>
    </template>
  </event-source-dialog>
</template>

<script lang="ts">
import { Component, DialogComponent, Refs, Prop } from "sitewhere-ide-common";
import { IEventSourceGenericConfiguration } from "sitewhere-configuration-model";
import { MicroserviceIcon } from "../../../../../libraries/constants";

import EventSourceDialog from "../EventSourceDialog.vue";
import ActiveMqBrokerFields from "./ActiveMqBrokerFields.vue";

@Component({
  components: {
    EventSourceDialog,
    ActiveMqBrokerFields
  }
})
export default class ActiveMqBrokerEventSourceDialog extends DialogComponent<
  IEventSourceGenericConfiguration
> {
  @Prop() readonly title!: string;
  @Prop() readonly width!: number;
  @Prop() readonly createLabel!: string;
  @Prop() readonly cancelLabel!: string;
  @Prop() readonly idsInUse!: string[];

  // References.
  $refs!: Refs<{
    dialog: any;
    broker: ActiveMqBrokerFields;
  }>;

  /** Get icon for dialog */
  get icon(): MicroserviceIcon {
    return MicroserviceIcon.EventSources;
  }

  /** Generate payload from UI */
  generatePayload() {
    let config: any = {};
    Object.assign(config, this.$refs.broker.save());

    let payload: any = {};
    Object.assign(payload, this.$refs.dialog.save());
    payload.configuration = config;

    return payload;
  }

  /** Reset dialog contents */
  reset() {
    if (this.$refs.broker) {
      this.$refs.broker.reset();
    }
    this.$refs.dialog.reset();
  }

  /** Load dialog from a given configuration */
  load(config: IEventSourceGenericConfiguration) {
    this.reset();
    if (this.$refs.dialog) {
      this.$refs.dialog.load(config);
    }
    if (this.$refs.broker) {
      this.$refs.broker.load(config.configuration);
    }
  }

  /** Called after create button is clicked */
  onCreateClicked(e: any) {
    if (!this.$refs.dialog.validate()) {
      return;
    }
    if (!this.$refs.broker.validate()) {
      this.$refs.dialog.setActiveTab(0);
      return;
    }

    var payload = this.generatePayload();
    this.$emit("payload", payload);
  }
}
</script>
