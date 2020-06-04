<template>
  <base-dialog
    ref="dialog"
    :icon="icon"
    :title="title"
    :width="width"
    :loaded="true"
    :visible="visible"
    :createLabel="createLabel || 'Create'"
    :cancelLabel="cancelLabel || 'Cancel'"
    @createClicked="onCreateClicked"
    @cancelClicked="onCancelClicked"
  >
    <template slot="header">
      <dialog-header>
        <v-layout class="pl-4 pr-4 pt-0 pb-0" row wrap>
          <v-flex xs5>
            <form-text
              v-if="visible"
              label="Command destination id"
              title="Unique command destination identifier."
              v-model="id"
              icon="info"
              :dense="true"
              :autofocus="true"
              class="mr-3"
            >
              <span v-if="!$v.id.required && $v.$dirty">Id is required.</span>
              <span v-if="!$v.id.idConflict && $v.$dirty">Id already in use.</span>
            </form-text>
          </v-flex>
          <v-flex xs7>
            <form-select
              :items="parameterExtractors"
              title="Choose parameter extractor for command destination"
              label="Parameter extractor"
              item-text="text"
              item-value="value"
              v-model="extractorType"
              icon="settings"
            />
          </v-flex>
        </v-layout>
      </dialog-header>
    </template>
    <template slot="tabs">
      <slot name="command-destination-tabs" />
      <v-tab key="extractor">Parameter Extractor</v-tab>
    </template>
    <template slot="tab-items">
      <slot name="command-destination-tab-items" />
      <v-tab-item key="extractor">
        <parameter-extractor-configuration
          ref="extractor"
          :parameterExtractor="parameterExtractor"
          :tenantId="tenantId"
        />
      </v-tab-item>
    </template>
  </base-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref } from "vue-property-decorator";
import {
  BaseDialog,
  DialogHeader,
  FormText,
  FormSelect
} from "sitewhere-ide-components";
import { VFlex, VLayout, VTab, VTabItem } from "vuetify/lib";

import ParameterExtractorConfiguration from "./extractors/ParameterExtractorConfiguration.vue";

import {
  ICommandDestinationGenericConfiguration,
  IParameterExtractorGenericConfiguration
} from "sitewhere-configuration-model";

import { required, ValidationRule, helpers } from "vuelidate/lib/validators";

/** Validator for checking if id is already used */
const idConflict: ValidationRule = helpers.withParams(
  { type: "idConflict" },
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  (value: any, vm: any) => {
    const idsInUse: string[] = vm.idsInUse;
    let conflict = false;
    idsInUse.forEach(id => {
      if (vm.id == id) conflict = true;
    });
    return !conflict;
  }
);

@Component({
  components: {
    BaseDialog,
    DialogHeader,
    FormText,
    FormSelect,
    VFlex,
    VLayout,
    VTab,
    VTabItem,
    ParameterExtractorConfiguration
  },
  validations: {
    id: {
      required,
      idConflict
    }
  }
})
export default class CommandDestinationDialog extends Vue {
  @Prop() readonly tenantId!: string;
  @Prop() readonly type!: string;
  @Prop() readonly icon!: string;
  @Prop() readonly title!: string;
  @Prop() readonly width!: number;
  @Prop() readonly cancelLabel!: string;
  @Prop() readonly createLabel!: string;
  @Prop() readonly visible!: boolean;
  @Prop() readonly idsInUse!: string[];
  @Prop() readonly parameterExtractors!: { text: string; value: string }[];
  @Ref() readonly dialog!: BaseDialog;
  @Ref() readonly extractor!: ParameterExtractorConfiguration;

  id: string | null = null;
  parameterExtractor: IParameterExtractorGenericConfiguration | null = null;

  /** Parameter extractor type */
  get extractorType(): string | null {
    return this.parameterExtractor ? this.parameterExtractor.type : null;
  }

  /** Blank configuration if type updated */
  set extractorType(value: string | null) {
    if (value) {
      this.parameterExtractor = {
        type: value,
        configuration: {}
      };
    }
  }

  /** Save dialog fields */
  save(): { id: string | null; type: string } {
    const config: { id: string | null; type: string } = {
      id: this.id,
      type: this.type
    };
    return config;
  }

  /** Reset the dialog */
  reset(): void {
    this.id = null;
    this.setActiveTab(0);
    this.$v.$reset();
  }

  /** Validate fields */
  validate(): boolean {
    if (!this.extractor.validate()) {
      return false;
    }
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load dialog from a given configuration */
  load(config: ICommandDestinationGenericConfiguration) {
    this.id = config.id;
    this.parameterExtractor = config.parameterExtractor;
  }

  /** Set the active tab */
  setActiveTab(tab: number): void {
    this.dialog.setActiveTab(tab);
  }

  /** Called after create button is clicked */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  onCreateClicked(e: any) {
    this.$emit("createClicked", e);
  }

  /** Called after cancel button is clicked */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  onCancelClicked(e: any) {
    this.$emit("cancelClicked", e);
  }
}
</script>
