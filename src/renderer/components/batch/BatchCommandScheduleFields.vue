<template>
  <sw-dialog-form>
    <v-flex xs12>
      <v-card>
        <v-card-text>
          <v-switch class="mb-0" :label="scheduleMessage" v-model="useSchedule" />
          <schedule-chooser :enabled="useSchedule" v-model="scheduleToken" />
        </v-card-text>
      </v-card>
    </v-flex>
  </sw-dialog-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { DialogSection } from "sitewhere-ide-components";

import ScheduleChooser from "../schedules/ScheduleChooser.vue";

@Component({
  components: {
    ScheduleChooser
  }
})
export default class BatchCommandScheduleFields extends DialogSection {
  scheduleToken: string | null = null;
  useSchedule: boolean = false;

  /** Message shown for switch */
  get scheduleMessage() {
    return !this.useSchedule
      ? "No schedule. Invoke command immediately."
      : "Invoke command on schedule below.";
  }

  /** Reset section content */
  reset(): void {
    this.scheduleToken = null;
    this.useSchedule = false;
  }

  /** Perform validation */
  validate(): boolean {
    return true;
  }

  /** Load form data from an object */
  load(input: {}): void {
    this.scheduleToken = (input as any).scheduleToken;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      scheduleToken: this.scheduleToken
    };
  }
}
</script>
