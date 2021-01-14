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
import { Component, Prop, Watch } from "vue-property-decorator";
import { IRemoteInstances, IRemoteInstance } from "sitewhere-ide-common";

@Component({ components: {} })
export default class RemotesDropdown extends Vue {
  @Prop() readonly remotes!: IRemoteInstances;

  selected: IRemoteInstance | null = null;

  get connections(): IRemoteInstance[] {
    return this.remotes ? this.remotes.instances : [];
  }

  @Watch("connections", { immediate: true })
  onConnectionsUpdated(updated: IRemoteInstance[]) {
    updated.forEach((connection) => {
      if (this.remotes && this.remotes.default) {
        if (this.remotes.default === connection.id) {
          this.selected = connection;
        }
      }
    });
  }

  @Watch("selected", { immediate: true })
  onSelectionChanged(updated: IRemoteInstance) {
    this.$emit("selected", updated);
  }

  getNameAndUrl(connection: IRemoteInstance): string {
    return `${connection.name} (${connection.baseUrl})`;
  }
}
</script>
