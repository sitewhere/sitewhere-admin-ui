<template>
  <div>
    <div style="height: 300px; overflow-y: auto; border: 1px solid #ddd">
      <v-data-table
        v-model="selected"
        :items="instances"
        item-key="id"
        hide-default-header
        hide-default-footer
      >
        <template v-slot:item="props">
          <tr
            style="cursor: pointer"
            :active="props.selected"
            @click="onSelect(props.item)"
          >
            <td width="5%" class="pa-2">
              <v-icon>link</v-icon>
            </td>
            <td
              width="90%"
              class="subheading pa-2"
              :style="textStyle(props.item)"
            >
              {{ getNameAndUrl(props.item) }}
            </td>
            <td width="5%" class="pa-2">
              <v-icon v-if="props.item.id === defaultInstance">star</v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
    <v-card flat tile class="mt-2">
      <v-layout>
        <v-flex xs3 class="mr-2">
          <v-btn
            outlined
            small
            block
            :disabled="isUpDisabled"
            @click="onConnectionMoveUp"
          >
            <v-icon left>arrow_upward</v-icon>Up
          </v-btn>
        </v-flex>
        <v-flex xs3 class="mr-2">
          <v-btn
            outlined
            small
            block
            :disabled="isDownDisabled"
            @click="onConnectionMoveDown"
          >
            <v-icon left>arrow_downward</v-icon>Down
          </v-btn>
        </v-flex>
        <v-flex xs3 class="mr-2">
          <v-btn
            outlined
            small
            block
            :disabled="isDefaultDisabled"
            @click="onConnectionDefault"
          >
            <v-icon left>star</v-icon>Default
          </v-btn>
        </v-flex>
        <v-flex xs3>
          <v-btn
            outlined
            small
            block
            :disabled="isDeleteDisabled"
            @click="onConnectionDelete"
          >
            <v-icon left>delete</v-icon>Delete
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";

import {
  arrayMove,
  IRemoteInstances,
  IRemoteInstance,
} from "sitewhere-ide-common";

@Component({ components: {} })
export default class RemoteInstancesList extends Vue {
  @Prop() readonly remoteInstances!: IRemoteInstances;

  selected: IRemoteInstance[] = [];
  selection: IRemoteInstance | null = null;

  /** Single select item */
  onSelect(selected: IRemoteInstance) {
    this.selected = [];
    this.instances.forEach((instance) => {
      if (instance.id == selected.id) {
        this.selected.push(instance);
        this.selection = instance;
        this.$emit("selected", instance);
      }
    });
  }

  textStyle(conn: IRemoteInstance): {} {
    return {
      "font-weight":
        conn.id === this.remoteInstances.default ? "bold" : "normal",
    };
  }

  /** Get list of instance from state */
  get instances(): IRemoteInstance[] {
    return this.remoteInstances ? this.remoteInstances.instances : [];
  }

  /** Get default instance */
  get defaultInstance(): string | null {
    return this.remoteInstances ? this.remoteInstances.default : null;
  }

  get isUpDisabled(): boolean {
    if (this.selection) {
      if (this.getInstanceIndex(this.selection) === 0) {
        return true;
      }
      return false;
    }
    return true;
  }

  get isDownDisabled(): boolean {
    if (this.selection) {
      if (
        this.getInstanceIndex(this.selection) >=
        this.remoteInstances.instances.length - 1
      ) {
        return true;
      }
      return false;
    }
    return true;
  }

  get isDefaultDisabled(): boolean {
    if (this.selection) {
      if (this.selection.id === this.remoteInstances.default) {
        return true;
      }
      return false;
    }
    return true;
  }

  get isDeleteDisabled(): boolean {
    if (this.selection) {
      if (this.selection.id === this.remoteInstances.default) {
        return true;
      }
      return false;
    }
    return true;
  }

  getNameAndUrl(instance: IRemoteInstance): string {
    return `${instance.name} (${instance.baseUrl})`;
  }

  /** Handle click on instance in list */
  onConnectionClicked(instance: IRemoteInstance) {
    this.selected = [instance];
  }

  /** Get index for an instance */
  getInstanceIndex(instance: IRemoteInstance): number {
    return this.remoteInstances.instances.indexOf(instance);
  }

  /** Move instance up in the list */
  onConnectionMoveUp() {
    if (this.selection) {
      const old: number = this.getInstanceIndex(this.selection);
      arrayMove(this.remoteInstances.instances, old, old - 1);
    }
  }

  /** Move instance down in the list */
  onConnectionMoveDown() {
    if (this.selection) {
      const old: number = this.getInstanceIndex(this.selection);
      arrayMove(this.remoteInstances.instances, old, old + 1);
    }
  }

  /** Delete an instance */
  onConnectionDelete() {
    if (this.selection) {
      this.remoteInstances.instances.splice(
        this.getInstanceIndex(this.selection),
        1
      );
    }
  }

  /** Set current selection as the default */
  onConnectionDefault() {
    if (this.selection) {
      this.remoteInstances.default = this.selection.id;
    }
  }
}
</script>
