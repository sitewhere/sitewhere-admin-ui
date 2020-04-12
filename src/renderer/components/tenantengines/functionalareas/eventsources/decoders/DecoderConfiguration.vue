<template>
  <v-card flat>
    <json-decoder-configuration ref="details" v-if="decoderType == 'json'" />
    <protobuf-decoder-configuration
      ref="details"
      v-if="decoderType == 'protobuf'"
    />
    <scripted-event-decoder-configuration
      ref="details"
      :tenantId="tenantId"
      v-if="decoderType == 'scripted'"
    />
  </v-card>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  DialogSection,
  Refs,
  Watch
} from "sitewhere-ide-common";

import JsonDecoderConfiguration from "./json/JsonDecoderConfiguration.vue";
import ProtobufDecoderConfiguration from "./protobuf/ProtobufDecoderConfiguration.vue";
import ScriptedEventDecoderConfiguration from "./scripted/ScriptedEventDecoderConfiguration.vue";
import { IEventDecoderGenericConfiguration } from "sitewhere-configuration-model";

@Component({
  components: {
    JsonDecoderConfiguration,
    ProtobufDecoderConfiguration,
    ScriptedEventDecoderConfiguration
  }
})
export default class DecoderConfiguration extends DialogSection {
  @Prop() readonly tenantId!: string;
  @Prop() readonly decoder!: IEventDecoderGenericConfiguration;

  // References.
  $refs!: Refs<{
    details: DialogSection;
  }>;

  @Watch("decoderType", { immediate: true })
  onDecoderTypeUpdated(updated: string) {
    this.load(this.decoder);
  }

  /** Decoder type */
  get decoderType(): string | null {
    return this.decoder ? this.decoder.type : null;
  }

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
  load(input: IEventDecoderGenericConfiguration): void {
    this.$nextTick().then(() => {
      if (this.$refs.details) {
        this.$refs.details.load(input.configuration);
      }
    });
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
