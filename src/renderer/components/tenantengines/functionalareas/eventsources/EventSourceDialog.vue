<template>
  <sw-base-dialog
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
      <dialog-header class="pl-3 pr-3 pt-2 pb-1">
        <v-layout class="pl-2 pr-2 pt-0 pb-0" row wrap>
          <v-flex xs5>
            <form-text
              v-if="visible"
              label="Event source id"
              title="Unique event source identifier."
              v-model="id"
              icon="info"
              :dense="true"
              :autofocus="true"
              class="mr-3"
            >
              <span v-if="!$v.id.required && $v.$dirty">Id is required.</span>
              <span v-if="!$v.id.idConflict && $v.$dirty"
                >Id already in use.</span
              >
            </form-text>
          </v-flex>
          <v-flex xs7>
            <form-select
              :items="decoderTypes"
              title="Choose decoder for event source"
              label="Decoder"
              item-text="text"
              item-value="value"
              v-model="decoderType"
              icon="settings"
            />
          </v-flex>
        </v-layout>
      </dialog-header>
    </template>
    <template slot="tabs">
      <slot name="event-source-tabs" />
      <v-tab key="decoder">Decoder</v-tab>
    </template>
    <template slot="tab-items">
      <slot name="event-source-tab-items" />
      <v-tab-item key="decoder">
        <decoder-configuration ref="decoder" :type="decoderType" />
      </v-tab-item>
    </template>
  </sw-base-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import {
  Component,
  DialogComponent,
  ITabbedComponent,
  Prop,
  Refs
} from "sitewhere-ide-common";

import DialogHeader from "../../../common/dialog/DialogHeader.vue";
import FormText from "../../../common/form/FormText.vue";
import FormSelect from "../../../common/form/FormSelect.vue";
import DecoderConfiguration from "./decoders/DecoderConfiguration.vue";

import { IEventSourceGenericConfiguration } from "sitewhere-configuration-model";

import { required, ValidationRule, helpers } from "vuelidate/lib/validators";

/** Validator for checking if id is already used */
const idConflict: ValidationRule = helpers.withParams(
  { type: "idConflict" },
  (value, vm) => {
    let idsInUse: string[] = vm.idsInUse;
    let conflict: boolean = false;
    idsInUse.forEach(id => {
      if (vm.id == id) conflict = true;
    });
    return !conflict;
  }
);

@Component({
  components: { DialogHeader, FormText, FormSelect, DecoderConfiguration },
  validations: {
    id: {
      required,
      idConflict
    }
  }
})
export default class EventSourceDialog extends Vue {
  @Prop() readonly type!: string;
  @Prop() readonly icon!: string;
  @Prop() readonly title!: string;
  @Prop() readonly width!: number;
  @Prop() readonly cancelLabel!: string;
  @Prop() readonly createLabel!: string;
  @Prop() readonly visible!: boolean;
  @Prop() readonly idsInUse!: string[];

  // References.
  $refs!: Refs<{
    dialog: DialogComponent<any> & ITabbedComponent;
    idTextField: FormText;
    decoder: DecoderConfiguration;
  }>;

  id: string | null = null;
  decoderType: string = "json";

  /** List of decoder types */
  decoderTypes: { text: string; value: string }[] = [
    {
      text: "JSON",
      value: "json"
    },
    {
      text: "Google Protocol Buffers",
      value: "protobuf"
    }
  ];

  /** Save dialog fields */
  save(): any {
    let config: any = { id: this.id, type: this.type };
    let decoderConfig: any = this.$refs.decoder.save();
    let decoder: any = {
      decoder: { type: this.decoderType, config: decoderConfig }
    };
    Object.assign(config, decoder);
    return config;
  }

  /** Reset the dialog */
  reset(): void {
    this.id = null;
    this.decoderType = "json";
    this.setActiveTab(0);
    this.$refs.decoder.reset();
    this.$v.$reset();
  }

  /** Validate fields */
  validate(): boolean {
    if (!this.$refs.decoder.validate()) {
      return false;
    }
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load dialog from a given configuration */
  load(config: IEventSourceGenericConfiguration) {
    this.id = config.id;
    this.decoderType = config.decoder ? config.decoder.type : "json";
  }

  /** Set the active tab */
  setActiveTab(tab: number): void {
    this.$refs.dialog.setActiveTab(tab);
  }

  /** Called after create button is clicked */
  onCreateClicked(e: any) {
    this.$emit("createClicked", e);
  }

  /** Called after cancel button is clicked */
  onCancelClicked(e: any) {
    this.$emit("cancelClicked", e);
  }
}
</script>
