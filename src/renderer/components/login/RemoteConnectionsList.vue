<template>
  <div>
    <div style="height: 300px; overflow-y: auto; border: 1px solid #ddd;">
      <v-data-table v-model="selected" :items="connections" item-key="id" hide-headers hide-actions>
        <template v-slot:items="props">
          <tr style="cursor: pointer;" :active="props.selected" @click="onSelect(props.item)">
            <td width="5%" class="pa-2">
              <v-icon>{{ props.item.protocol === 'https' ? 'lock' : 'lock_open' }}</v-icon>
            </td>
            <td
              width="90%"
              class="subheading pa-2"
              :style="textStyle(props.item)"
            >{{ getNameAndUrl(props.item) }}</td>
            <td width="5%" class="pa-2">
              <v-icon v-if="props.item.id === remotes.default">star</v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
    <v-layout row wrap>
      <v-flex xs3 class="pa-1">
        <v-btn small block :disabled="isUpDisabled" @click="onConnectionMoveUp">
          <v-icon left>arrow_upward</v-icon>Up
        </v-btn>
      </v-flex>
      <v-flex xs3 class="pa-1">
        <v-btn small block :disabled="isDownDisabled" @click="onConnectionMoveDown">
          <v-icon left>arrow_downward</v-icon>Down
        </v-btn>
      </v-flex>
      <v-flex xs3 class="pa-1">
        <v-btn small block :disabled="isDefaultDisabled" @click="onConnectionDefault">
          <v-icon left>star</v-icon>Default
        </v-btn>
      </v-flex>
      <v-flex xs3 class="pa-1">
        <v-btn small block :disabled="isDeleteDisabled" @click="onConnectionDelete">
          <v-icon left>delete</v-icon>Delete
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";
import Vue from "vue";

import { arrayMove } from "../common/Utils";
import { IRemotes, IRemoteConnection } from "../common/ApplicationModel";

@Component({})
export default class RemoteConnectionsList extends Vue {
  @Prop() readonly remotes!: IRemotes;

  selected: IRemoteConnection[] = [];
  selection: IRemoteConnection | null = null;

  /** Single select item */
  onSelect(selected: IRemoteConnection) {
    this.selected = [];
    this.connections.forEach(connection => {
      if (connection.id == selected.id) {
        this.selected.push(connection);
        this.selection = connection;
        this.$emit("selected", connection);
      }
    });
  }

  textStyle(conn: IRemoteConnection): {} {
    return {
      "font-weight": conn.id === this.remotes.default ? "bold" : "normal"
    };
  }

  get isUpDisabled(): boolean {
    if (this.selection) {
      if (this.getConnectionIndex(this.selection) === 0) {
        return true;
      }
      return false;
    }
    return true;
  }

  get isDownDisabled(): boolean {
    if (this.selection) {
      if (
        this.getConnectionIndex(this.selection) >=
        this.remotes.connections.length - 1
      ) {
        return true;
      }
      return false;
    }
    return true;
  }

  get isDefaultDisabled(): boolean {
    if (this.selection) {
      if (this.selection.id === this.remotes.default) {
        return true;
      }
      return false;
    }
    return true;
  }

  get isDeleteDisabled(): boolean {
    if (this.selection) {
      if (this.selection.id === this.remotes.default) {
        return true;
      }
      return false;
    }
    return true;
  }

  get connections(): IRemoteConnection[] {
    return this.remotes ? this.remotes.connections : [];
  }

  getNameAndUrl(connection: IRemoteConnection): string {
    return `${connection.name} (${connection.protocol}://${connection.host}:${connection.port})`;
  }

  /** Handle click on connection in list */
  onConnectionClicked(connection: IRemoteConnection) {
    this.selected = [connection];
  }

  /** Get index for a connection */
  getConnectionIndex(connection: IRemoteConnection): number {
    return this.remotes.connections.indexOf(connection);
  }

  /** Move connection up in the list */
  onConnectionMoveUp() {
    if (this.selection) {
      let old: number = this.getConnectionIndex(this.selection);
      arrayMove(this.remotes.connections, old, old - 1);
    }
  }

  /** Move connection down in the list */
  onConnectionMoveDown() {
    if (this.selection) {
      let old: number = this.getConnectionIndex(this.selection);
      arrayMove(this.remotes.connections, old, old + 1);
    }
  }

  /** Delete a connection */
  onConnectionDelete() {
    if (this.selection) {
      this.remotes.connections.splice(
        this.getConnectionIndex(this.selection),
        1
      );
    }
  }

  /** Set current selection as the default */
  onConnectionDefault() {
    if (this.selection) {
      this.remotes.default = this.selection.id;
    }
  }
}
</script>
