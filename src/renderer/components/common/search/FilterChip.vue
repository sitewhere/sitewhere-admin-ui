<template>
  <v-tooltip bottom>
    <v-chip close @input="onFilterClosed" slot="activator">
      <v-avatar>
        <img :src="imageUrl" :alt="label" />
      </v-avatar>
      {{ label }}
    </v-chip>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";
import Vue from "vue";

@Component({})
export default class FilterChip extends Vue {
  @Prop() type!: string;
  @Prop() token!: string;
  @Prop() imageUrl!: string;
  @Prop() label!: string;
  @Prop() tooltip!: string;

  /** Emit when filter is closed */
  onFilterClosed() {
    this.$emit("closed", this.type, this.token);
  }
}
</script>
