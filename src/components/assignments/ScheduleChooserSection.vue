<template>
  <dialog-form>
    <v-flex xs12>
      <schedule-chooser ref="schedule" />
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import { DialogSection, DialogForm } from "sitewhere-ide-components";

import ScheduleChooser from "../schedules/ScheduleChooser.vue";

@Component({
  components: {
    DialogForm,
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
  load(input: any): void {
    console.log(input);
  }

  /** Save form data to an object */
  save(): {} {
    return {};
  }
}
</script>
