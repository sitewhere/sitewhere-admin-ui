<template>
  <default-mqtt-parameter-extractor-fields ref="fields" :tenantId="tenantId" />
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { DialogSection } from "sitewhere-ide-components";

import DefaultMqttParameterExtractorFields from "./DefaultMqttParameterExtractorFields.vue";

@Component({
  components: {
    DefaultMqttParameterExtractorFields
  }
})
export default class DefaultMqttParameterExtractorConfiguration extends DialogSection {
  @Prop() readonly tenantId!: string;
  @Ref() readonly fields!: DefaultMqttParameterExtractorFields;

  /** Reset section content */
  reset(): void {
    if (this.fields) {
      this.fields.reset();
    }
  }

  /** Perform validation */
  validate(): boolean {
    if (!this.fields.validate()) {
      return false;
    }
    return true;
  }

  /** Load form data from an object */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  load(input: any): void {
    this.reset();
    if (this.fields) {
      this.fields.load(input);
    }
  }

  /** Save form data to an object */
  save(): {} {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const payload: any = {};
    if (this.fields) {
      Object.assign(payload, this.fields.save());
    }

    return payload;
  }
}
</script>
