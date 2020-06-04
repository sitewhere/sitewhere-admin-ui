<template>
  <v-card flat>
    <default-mqtt-parameter-extractor-configuration
      ref="details"
      v-if="extractorType == 'mqtt-default'"
    />
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Ref, Watch } from "vue-property-decorator";

import { DialogSection } from "sitewhere-ide-components";
import { VCard } from "vuetify/lib";

import DefaultMqttParameterExtractorConfiguration from "./mqtt/DefaultMqttParameterExtractorConfiguration.vue";
import { IParameterExtractorGenericConfiguration } from "sitewhere-configuration-model";

@Component({
  components: { VCard, DefaultMqttParameterExtractorConfiguration }
})
export default class ParameterExtractorConfiguration extends DialogSection {
  @Prop() readonly tenantId!: string;
  @Prop() readonly parameterExtractor!: IParameterExtractorGenericConfiguration;
  @Ref() readonly details!: DialogSection;

  @Watch("extractorType", { immediate: true })
  onExtractorTypeUpdated() {
    this.load(this.parameterExtractor);
  }

  /** Parameter extractor type */
  get extractorType(): string | null {
    return this.parameterExtractor ? this.parameterExtractor.type : null;
  }

  /** Reset section content */
  reset(): void {
    if (this.details) {
      this.details.reset();
    }
  }

  /** Perform validation */
  validate(): boolean {
    if (this.details) {
      if (!this.details.validate()) {
        return false;
      }
    }
    return true;
  }

  /** Load form data from an object */
  load(input: IParameterExtractorGenericConfiguration): void {
    this.$nextTick().then(() => {
      if (this.details) {
        this.details.load(input.configuration);
      }
    });
  }

  /** Save form data to an object */
  save(): {} {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const config: any = {};
    if (this.details) {
      Object.assign(config, this.details.save());
    }
    return config;
  }
}
</script>
