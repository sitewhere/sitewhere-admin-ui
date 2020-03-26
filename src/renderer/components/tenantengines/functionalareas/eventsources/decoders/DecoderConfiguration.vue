<template>
  <v-card flat>
    <json-decoder-configuration ref="details" v-if="type == 'json'" />
    <protobuf-decoder-configuration ref="details" v-if="type == 'protobuf'" />
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, DialogSection, Refs } from "sitewhere-ide-common";

import JsonDecoderConfiguration from "./json/JsonDecoderConfiguration.vue";
import ProtobufDecoderConfiguration from "./protobuf/ProtobufDecoderConfiguration.vue";

@Component({
  components: {
    JsonDecoderConfiguration,
    ProtobufDecoderConfiguration
  }
})
export default class DecoderConfiguration extends DialogSection {
  @Prop() readonly type!: string;

  // References.
  $refs!: Refs<{
    details: DialogSection;
  }>;

  /** Reset section content */
  reset(): void {
    if (this.$refs.details) {
      this.$refs.details.reset();
    }
  }

  /** Perform validation */
  validate(): boolean {
    if (this.$refs.details) {
      if (!this.$refs.details.validate()) {
        return false;
      }
    }
    return true;
  }

  /** Load form data from an object */
  load(input: any): void {
    if (this.$refs.details) {
      this.$refs.details.load(input);
    }
  }

  /** Save form data to an object */
  save(): {} {
    let config: any = {};
    if (this.$refs.details) {
      Object.assign(config, this.$refs.details.save());
    }
    return config;
  }
}
</script>
