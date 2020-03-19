<template>
  <event-source-dialog
    ref="dialog"
    type="mqtt"
    :icon="icon"
    :title="title"
    :width="width"
    :loaded="true"
    :visible="dialogVisible"
    :createLabel="createLabel"
    :cancelLabel="cancelLabel"
    @createClicked="onCreateClicked"
    @cancelClicked="onCancelClicked"
  >
    <template slot="event-source-tabs">
      <v-tab key="connection">Connection</v-tab>
      <v-tab key="authentication">Authentication</v-tab>
    </template>
    <template slot="event-source-tab-items">
      <v-tab-item key="connection">
        <mqtt-connection-fields ref="connection" />
      </v-tab-item>
      <v-tab-item key="authentication">
        <mqtt-authentication-fields ref="authentication" />
      </v-tab-item>
    </template>
  </event-source-dialog>
</template>

<script lang="ts">
import {
  Component,
  DialogComponent,
  DialogSection,
  ITabbedComponent,
  Refs,
  Prop
} from "sitewhere-ide-common";
import { IEventSourceGenericConfiguration } from "sitewhere-configuration-model";
import { MicroserviceIcon } from "../../../../../libraries/constants";

import EventSourceDialog from "../EventSourceDialog.vue";
import MqttConnectionFields from "../../../common/mqtt/MqttConnectionFields.vue";
import MqttAuthenticationFields from "../../../common/mqtt/MqttAuthenticationFields.vue";

@Component({
  components: {
    EventSourceDialog,
    MqttConnectionFields,
    MqttAuthenticationFields
  }
})
export default class MqttEventSourceDialog extends DialogComponent<
  IEventSourceGenericConfiguration
> {
  @Prop() readonly title!: string;
  @Prop() readonly width!: number;
  @Prop() readonly createLabel!: string;
  @Prop() readonly cancelLabel!: string;

  // References.
  $refs!: Refs<{
    dialog: any;
    connection: MqttConnectionFields;
    authentication: MqttAuthenticationFields;
  }>;

  /** Get icon for dialog */
  get icon(): MicroserviceIcon {
    return MicroserviceIcon.EventSources;
  }

  /** Generate payload from UI */
  generatePayload() {
    let config: any = {};
    Object.assign(config, this.$refs.connection.save());
    Object.assign(config, this.$refs.authentication.save());

    let payload: any = {};
    Object.assign(payload, this.$refs.dialog.save());
    payload.configuration = config;

    return payload;
  }

  /** Reset dialog contents */
  reset() {
    if (this.$refs.connection) {
      this.$refs.connection.reset();
    }
    if (this.$refs.authentication) {
      this.$refs.authentication.reset();
    }
    this.$refs.dialog.reset();
  }

  /** Load dialog from a given configuration */
  load(config: IEventSourceGenericConfiguration) {
    this.reset();
    if (this.$refs.dialog) {
      this.$refs.dialog.load(config);
    }
    if (this.$refs.connection) {
      this.$refs.connection.load(config.configuration);
    }
    if (this.$refs.authentication) {
      this.$refs.authentication.load(config.configuration);
    }
  }

  /** Called after create button is clicked */
  onCreateClicked(e: any) {
    if (!this.$refs.dialog.validate()) {
      return;
    }
    if (!this.$refs.connection.validate()) {
      this.$refs.dialog.setActiveTab(0);
      return;
    }
    if (!this.$refs.authentication.validate()) {
      this.$refs.dialog.setActiveTab(1);
      return;
    }

    var payload = this.generatePayload();
    this.$emit("payload", payload);
  }
}
</script>
