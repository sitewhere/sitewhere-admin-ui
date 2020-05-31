<template>
  <div class="mb-3">
    <date-time-picker v-model="wrapped" :title="title" :label="label" />
    <div class="verror">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { DateTimePicker } from "sitewhere-ide-components";

@Component({ components: { DateTimePicker } })
export default class FormDateTimePicker extends Vue {
  @Prop() readonly title!: string;
  @Prop() readonly label!: string;
  @Prop() readonly icon!: string;
  @Prop() readonly required!: boolean;
  @Prop() readonly value!: string;
  @Prop() readonly type!: string;

  get wrapped(): string {
    return this.value;
  }

  set wrapped(updated: string) {
    this.$emit("input", updated);
  }
}
</script>
