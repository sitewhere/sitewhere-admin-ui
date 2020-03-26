<template>
  <no-configuration />
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import NoConfiguration from "../NoConfiguration.vue";

@Component({
  components: {
    NoConfiguration
  }
})
export default class ProtobufDecoderConfiguration extends DialogSection {
  /** Reset section content */
  reset(): void {}

  /** Perform validation */
  validate(): boolean {
    return true;
  }

  /** Load form data from an object */
  load(input: any): void {}

  /** Save form data to an object */
  save(): {} {
    return {};
  }
}
</script>
