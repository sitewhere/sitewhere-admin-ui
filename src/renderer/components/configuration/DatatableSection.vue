<template>
  <v-card flat>
    <div class="mb-3">
      <v-icon style="width: 25px;" small>{{ icon }}</v-icon
      >{{ title }}:
    </div>
    <v-card flat style="margin-left: 25px;" :width="width">
      <v-data-table
        class="datatable"
        dense
        :headers="headers"
        :items="items"
        hide-actions
      >
        <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope"
          ><slot :name="slot" v-bind="scope"
        /></template>
      </v-data-table>
      <slot name="datatable-footer" />
      <slot name="datatable-dialogs" />
    </v-card>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

@Component({
  components: {}
})
export default class Section extends Vue {
  @Prop() readonly icon!: string;
  @Prop() readonly title!: string;
  @Prop() readonly help!: string;
  @Prop() readonly headers!: any[];
  @Prop() readonly items!: any[];
  @Prop() readonly width!: string;
}
</script>

<style scoped>
.datatable >>> tr {
  height: 30px;
}
.datatable >>> th {
  padding: 3px !important;
}
.datatable >>> td {
  padding: 3px !important;
  height: 30px;
}
</style>
