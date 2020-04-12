<template>
  <div class="mb-3">
    <v-select
      class="text-field-input"
      :required="true"
      :title="title"
      :label="label"
      :items="items"
      v-model="wrapped"
      item-text="name"
      item-value="id"
      :prepend-icon="icon"
      :menu-props="{ closeOnContentClick: true }"
      :hide-details="true"
      placeholder=" "
      @change="onSelectionChanged"
    />
    <div class="verror">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

import { AxiosResponse } from "axios";
import { listTenantScriptsForCategory } from "../../../rest/sitewhere-scripting-api";
import { IScriptMetadata } from "sitewhere-rest-api";
import { showError } from "sitewhere-ide-common";

@Component({})
export default class ScriptChooser extends Vue {
  @Prop() readonly tenantId!: string;
  @Prop() readonly functionalArea!: string;
  @Prop() readonly category!: string;
  @Prop() readonly title!: string;
  @Prop() readonly label!: string;
  @Prop() readonly icon!: string;
  @Prop() readonly value!: string;

  items: IScriptMetadata[] = [];

  get wrapped(): string {
    return this.value;
  }

  set wrapped(updated: string) {
    this.$emit("input", updated);
  }

  /** Perform reset on initial create */
  created() {
    this.reset();
  }

  /** Reload list of scripts for functional area */
  async reset() {
    try {
      let response: AxiosResponse<
        IScriptMetadata[]
      > = await listTenantScriptsForCategory(
        this.$store,
        this.functionalArea,
        this.tenantId,
        this.category
      );
      this.items = response.data;
    } catch (err) {
      showError(this, err);
    }
  }

  onSelectionChanged(selection: any) {
    this.$emit("change", selection);
  }
}
</script>

<style scoped>
.text-field-input >>> i.v-icon {
  font-size: 16px;
  color: #999;
}
</style>
