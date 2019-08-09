<template>
  <v-select v-model="selected" :items="connections" solo>
    <template slot="selection" slot-scope="data">
      <v-icon small class="pr-2">router</v-icon>
      {{ getNameAndUrl(data.item) }}
    </template>
    <template slot="item" slot-scope="data">
      <v-icon small class="pr-2">router</v-icon>
      {{ getNameAndUrl(data.item) }}
    </template>
  </v-select>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "sitewhere-ide-common";
import { IRemotes, IRemoteConnection } from "../common/ApplicationModel";

@Component
export default class RemotesDropdown extends Vue {
  @Prop() readonly remotes!: IRemotes;

  selected: IRemoteConnection | null = null;

  get connections(): IRemoteConnection[] {
    return this.remotes ? this.remotes.connections : [];
  }

  @Watch("connections", { immediate: true })
  onConnectionsUpdated(updated: IRemoteConnection[]) {
    updated.forEach(connection => {
      if (this.remotes && this.remotes.default) {
        if (this.remotes.default === connection.id) {
          this.selected = connection;
        }
      }
    });
  }

  @Watch("selected", { immediate: true })
  onSelectionChanged(updated: IRemoteConnection) {
    this.$emit("selected", updated);
  }

  getNameAndUrl(connection: IRemoteConnection): string {
    return `${connection.name} (${connection.protocol}://${connection.host}:${connection.port})`;
  }
}
</script>
