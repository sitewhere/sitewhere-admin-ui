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
import { Component, Ref, Prop } from "vue-property-decorator";
import { NavigationIcon } from "sitewhere-ide-common";
import { DialogComponent } from "sitewhere-ide-components";

import RedisConfigurationFields from "./RedisConfigurationFields.vue";

import { IRedisConfiguration } from "sitewhere-rest-api";

@Component({
  components: { RedisConfigurationFields }
})
export default class RedisConfigurationDialog extends DialogComponent<
  IRedisConfiguration
> {
  @Prop() readonly redis!: IRedisConfiguration;
  @Ref() readonly dialog!: any;
  @Ref() readonly details!: RedisConfigurationFields;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Settings;
  }

  /** Generate payload from UI data */
  generatePayload(): IRedisConfiguration {
    return Object.assign({}, this.redis, this.details.save());
  }

  /** Reset dialog content to default */
  reset() {
    if (this.details) {
      this.details.reset();
    }
  }

  /** Load data from an existing configuration */
  load(payload: IRedisConfiguration) {
    this.reset();
    if (this.details) {
      this.details.load(payload);
    }
  }

  /** Called after update button is clicked */
  onUpdateClicked(e: any) {
    if (!this.details.validate()) {
      return;
    }

    var payload = this.generatePayload();
    this.$emit("payload", payload);
    this.dialogVisible = false;
  }
}
</script>

<style scoped></style>
