<template>
  <sw-dialog-form>
    <v-flex xs12>
      <schedule-chooser ref="schedule" />
    </v-flex>
  </sw-dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import ScheduleChooser from "../schedules/ScheduleChooser.vue";

@Component({
  components: {
    ScheduleChooser
  }
})
export default class InvocationDetailFields extends DialogSection {
  /** Reset section content */
  reset(): void {}

  /** Perform validation */
  validate(): boolean {
    return true;
  }

  /** Load form data from an object */
  load(input: {}): void {}

  /** Save form data to an object */
  save(): {} {
    return {};
  }
}
</script>
