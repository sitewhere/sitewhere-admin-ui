<template>
  <div class="mb-3">
    <v-select
      :required="required"
      :title="title"
      :label="label"
      :items="items"
      v-model="wrapped"
      :multiple="multiple"
      :item-text="itemText"
      :item-value="itemValue"
      :chips="chips"
      :prepend-icon="icon"
      placeholder=" "
      @change="onSelectionChanged"
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
export default class FormSelect extends Vue {
  @Prop() readonly title!: string;
  @Prop() readonly label!: string;
  @Prop() readonly icon!: string;
  @Prop() readonly items!: {}[];
  @Prop() readonly required!: boolean;
  @Prop() readonly value!: string;
  @Prop() readonly itemText!: string;
  @Prop() readonly itemValue!: string;
  @Prop() readonly multiple!: boolean;
  @Prop() readonly chips!: boolean;

  get wrapped(): string {
    return this.value;
  }

  set wrapped(updated: string) {
    this.$emit("input", updated);
  }

  onSelectionChanged(selection: any) {
    this.$emit("change", selection);
  }
}
</script>

<style scoped>
</style>
