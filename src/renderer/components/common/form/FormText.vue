<template>
  <div class="mb-3">
    <v-text-field
      :required="required"
      :title="title"
      :label="label"
      :type="type"
      placeholder=" "
      v-model="wrapped"
      hide-details
      :prepend-icon="icon"
    />
    <div class="verror">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

@Component({})
export default class FormText extends Vue {
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

<style scoped>
</style>
