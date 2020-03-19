<template>
  <div :class="!dense ? 'mb-3' : ''">
    <v-text-field
      ref="field"
      class="text-field-input"
      :required="required"
      :title="title"
      :label="label"
      :type="type"
      placeholder=" "
      v-model="wrapped"
      hide-details
      :prepend-icon="icon"
      :disabled="readonly"
      :autofocus="autofocus"
    />
    <div class="verror">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Refs } from "sitewhere-ide-common";

@Component({})
export default class FormText extends Vue {
  @Prop() readonly title!: string;
  @Prop() readonly label!: string;
  @Prop() readonly icon!: string;
  @Prop() readonly required!: boolean;
  @Prop() readonly value!: string;
  @Prop() readonly type!: string;
  @Prop() readonly readonly!: boolean;
  @Prop() readonly dense!: boolean;
  @Prop() readonly autofocus!: boolean;

  // References.
  $refs!: Refs<{
    field: any;
  }>;

  get wrapped(): string {
    return this.value;
  }

  set wrapped(updated: string) {
    this.$emit("input", updated);
  }

  /** Focus the wrapped input */
  focus(): void {
    this.$refs.field.focus();
  }
}
</script>

<style scoped>
.text-field-input >>> i.v-icon {
  font-size: 16px;
  color: #ccc;
}
</style>
