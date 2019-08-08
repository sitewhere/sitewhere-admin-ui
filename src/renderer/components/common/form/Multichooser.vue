<template>
  <v-data-table
    v-model="selected"
    class="scrolling-list"
    :items="all"
    item-key="token"
    hide-headers
    hide-actions
  >
    <template v-slot:items="props">
      <tr
        style="cursor: pointer;"
        :active="props.selected"
        @click="props.selected = !props.selected"
      >
        <td>
          <v-checkbox color="#666" :input-value="props.selected" hide-details />
        </td>
        <td width="5%" class="pa-2">
          <v-avatar size="36px">
            <img :src="props.item.imageUrl" v-if="props.item.imageUrl" />
            <font-awesome-icon
              v-if="props.item.icon"
              class="grey--text"
              :icon="props.item.icon"
              size="2x"
            />
          </v-avatar>
        </td>
        <td width="90%" class="subheading pa-2">{{ props.item.name }}</td>
      </tr>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "sitewhere-ide-common";
import Vue from "vue";

import { IBrandedEntity } from "sitewhere-rest-api";

@Component({})
export default class Multichooser extends Vue {
  @Prop() readonly value!: string[];
  @Prop() readonly all!: IBrandedEntity[];
  @Prop({ default: false }) readonly idMode!: boolean;

  selected: IBrandedEntity[] = [];

  @Watch("value", { immediate: true })
  onValueUpdated(updated: string[]) {
    if (updated) {
      if (
        this.selected.length != updated.length ||
        !this.selected.every(e => updated.includes(e.token))
      ) {
        let selection: IBrandedEntity[] = [];
        if (this.idMode) {
          this.all.forEach(item => {
            if (updated.indexOf(item.id) > -1) {
              selection.push(item);
            }
          });
        } else {
          this.all.forEach(item => {
            if (updated.indexOf(item.token) > -1) {
              selection.push(item);
            }
          });
        }
        this.selected = selection;
      }
    } else {
      this.selected = [];
    }
  }

  @Watch("selected", { immediate: true })
  onSelectionUpdated(updated: IBrandedEntity[]) {
    let selection: string[] = [];
    this.selected.forEach(item => {
      selection.push(item.token);
    });
    this.$emit("input", selection);
  }
}
</script>

<style scoped>
.scrolling-list {
  max-height: 300px;
  overflow-y: auto;
}
</style>
