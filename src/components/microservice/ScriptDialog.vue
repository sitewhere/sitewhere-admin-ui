<template>
  <sw-base-dialog
    ref="dialog"
    :icon="icon"
    :title="title"
    :width="width"
    :loaded="loaded"
    :visible="dialogVisible"
    :createLabel="createLabel"
    :cancelLabel="cancelLabel"
    @createClicked="onCreateClicked"
    @cancelClicked="onCancelClicked"
  >
    <template slot="tabs">
      <v-tab key="details">Details</v-tab>
      <v-tab key="content">Content</v-tab>
    </template>
    <template slot="tab-items">
      <v-tab-item key="details">
        <script-detail-fields
          ref="details"
          :scriptCategories="scriptCategories"
          @categoryUpdated="onCategoryUpdated"
        />
      </v-tab-item>
      <v-tab-item key="content">
        <script-content-fields :identifier="identifier" :category="category" ref="content" />
      </v-tab-item>
    </template>
  </sw-base-dialog>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { ITabbedComponent, NavigationIcon } from "sitewhere-ide-common";
import { DialogComponent } from "sitewhere-ide-components";

import ScriptDetailFields from "./ScriptDetailFields.vue";
import ScriptContentFields from "./ScriptContentFields.vue";
import { IScriptCreateRequest, IScriptCategory } from "sitewhere-rest-api";

@Component({
  components: {
    ScriptDetailFields,
    ScriptContentFields
  }
})
export default class ScriptDialog extends DialogComponent<
  IScriptCreateRequest
> {
  @Prop() readonly title!: string;
  @Prop() readonly width!: number;
  @Prop() readonly createLabel!: string;
  @Prop() readonly cancelLabel!: string;
  @Prop() readonly identifier!: string;
  @Prop() readonly scriptCategories!: IScriptCategory[];
  @Ref() readonly dialog!: ITabbedComponent;
  @Ref() readonly details!: ScriptDetailFields;
  @Ref() readonly content!: ScriptContentFields;

  category: string | null = null;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceType;
  }

  // Generate payload from UI.
  generatePayload() {
    const payload: any = {};
    Object.assign(payload, this.details.save(), this.content.save());
    return payload;
  }

  // Reset dialog contents.
  reset() {
    if (this.details) {
      this.details.reset();
    }
    if (this.content) {
      this.content.reset();
    }
    this.dialog.setActiveTab(0);
  }

  // Load dialog from a given payload.
  load(payload: IScriptCreateRequest) {
    this.reset();
    if (this.details) {
      this.details.load(payload);
    }
    if (this.content) {
      this.content.load(payload);
    }
  }

  /** Called when category is updated */
  onCategoryUpdated(updated: string) {
    this.category = updated;
  }

  // Called after create button is clicked.
  onCreateClicked() {
    if (!this.details.validate()) {
      this.dialog.setActiveTab(0);
      return;
    }

    if (!this.content.validate()) {
      this.dialog.setActiveTab(1);
      return;
    }

    const payload = this.generatePayload();
    console.log("Before payload emit:", this);
    this.$emit("payload", payload);
  }
}
</script>
