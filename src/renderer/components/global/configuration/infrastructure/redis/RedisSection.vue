<template>
  <content-section icon="fa-cogs" title="Redis Configuration">
    <template slot="overlay"><div class="logo"/></template>
    <v-card v-if="redis" flat>
      <content-field name="hostname" :value="redis.hostname" />
      <content-field :alt="true" name="sentinel port" :value="redis.port" />
      <content-field name="node count" :value="redis.nodeCount" />
      <content-field
        :alt="true"
        name="master group name"
        :value="redis.masterGroupName"
      />
      <content-link
        class="mt-3"
        icon="fa-edit"
        text="Edit Redis configuration."
        @linkClicked="onEdit"
      />
    </v-card>
    <redis-configuration-dialog
      ref="dialog"
      :redis="redis"
      @payload="onRedisUpdated"
    />
  </content-section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Refs } from "sitewhere-ide-common";

import ContentSection from "../../../../configuration/ContentSection.vue";
import ContentField from "../../../../configuration/ContentField.vue";
import ContentLink from "../../../../configuration/ContentLink.vue";
import RedisConfigurationDialog from "./RedisConfigurationDialog.vue";

import { ITenantEngineConfiguration } from "sitewhere-rest-api";
import {
  IDeviceManagementConfiguration,
  IDatastoreDefinition
} from "sitewhere-configuration-model";
import {
  IInstanceConfiguration,
  IInfrastructureConfiguration,
  IRedisConfiguration
} from "sitewhere-rest-api";

@Component({
  components: {
    ContentSection,
    ContentField,
    ContentLink,
    RedisConfigurationDialog
  }
})
export default class RedisSection extends Vue {
  @Prop() readonly configuration!: IInstanceConfiguration;

  /** References */
  $refs!: Refs<{
    dialog: RedisConfigurationDialog;
  }>;

  /** Get infrastructure information */
  get infrastructure(): IInfrastructureConfiguration | null {
    return this.configuration ? this.configuration.infrastructure : null;
  }

  /** Get Redis configuration */
  get redis(): IRedisConfiguration | null {
    return this.infrastructure ? this.infrastructure.redis : null;
  }

  /** Called to edit Kafka configuration */
  onEdit(): void {
    if (this.redis) {
      this.$refs.dialog.load(this.redis);
      this.$refs.dialog.openDialog();
    }
  }

  /** Called after Redis values are updated */
  onRedisUpdated(updated: IRedisConfiguration): void {
    this.$emit("updated", updated);
  }
}
</script>

<style scoped>
.logo {
  position: absolute;
  top: 10px;
  right: 100px;
  width: 150px;
  height: 150px;
  background-image: url("../../../../../assets/redis.png");
  background-size: contain;
  opacity: 0.9;
}
</style>
