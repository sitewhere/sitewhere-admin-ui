<template>
  <sw-base-dialog
    ref="dialog"
    :icon="icon"
    title="Edit Redis Configuration"
    width="550"
    :loaded="true"
    :visible="dialogVisible"
    createLabel="Update"
    cancelLabel="Cancel"
    @createClicked="onUpdateClicked"
    @cancelClicked="onCancelClicked"
  >
    <redis-configuration-fields ref="details" />
  </sw-base-dialog>
</template>

<script lang="ts">
import { Component, Refs, Prop, DialogComponent } from "sitewhere-ide-common";
import { NavigationIcon } from "../../../../../libraries/constants";

import RedisConfigurationFields from "./RedisConfigurationFields.vue";

import { IRedisConfiguration } from "sitewhere-rest-api";

@Component({
  components: { RedisConfigurationFields }
})
export default class RedisConfigurationDialog extends DialogComponent<
  IRedisConfiguration
> {
  @Prop() readonly redis!: IRedisConfiguration;

  /** References */
  $refs!: Refs<{
    dialog: any;
    details: RedisConfigurationFields;
  }>;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Settings;
  }

  /** Generate payload from UI data */
  generatePayload(): IRedisConfiguration {
    return Object.assign({}, this.redis, this.$refs.details.save());
  }

  /** Reset dialog content to default */
  reset() {
    if (this.$refs.details) {
      this.$refs.details.reset();
    }
  }

  /** Load data from an existing configuration */
  load(payload: IRedisConfiguration) {
    this.reset();
    if (this.$refs.details) {
      this.$refs.details.load(payload);
    }
  }

  /** Called after update button is clicked */
  onUpdateClicked(e: any) {
    if (!this.$refs.details.validate()) {
      return;
    }

    var payload = this.generatePayload();
    this.$emit("payload", payload);
    this.dialogVisible = false;
  }
}
</script>

<style scoped></style>
