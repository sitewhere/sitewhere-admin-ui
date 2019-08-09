<template>
  <dialog-form>
    <v-flex xs12>
      <form-token
        required
        label="Schedule token"
        title="Unique token for referencing schedule."
        v-model="token"
        :validator="$v"
      />
    </v-flex>
    <v-flex xs12>
      <form-text required label="Name" title="Schedule name." v-model="name" icon="info">
        <span v-if="!$v.name.required && $v.$dirty">Name is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs6 class="pr-5">
      <form-date-time-picker
        required
        label="Start date"
        title="Schedule start date."
        v-model="startDate"
        icon="info"
      />
    </v-flex>
    <v-flex xs6 class="pl-4">
      <form-date-time-picker
        required
        label="End date"
        title="Schedule end date."
        v-model="endDate"
        icon="info"
      />
    </v-flex>
    <v-flex xs12>
      <form-select
        required
        title="Schedule trigger type."
        :items="triggerTypes"
        v-model="triggerType"
        label="Trigger type"
        item-text="text"
        item-value="value"
        icon="flash_on"
      >
        <span v-if="$v.triggerType.$invalid && $v.$dirty">Trigger type is required.</span>
      </form-select>
    </v-flex>
    <v-flex xs12 v-if="triggerType === 'CronTrigger'">
      <form-text
        required
        label="Cron expression"
        title="Expression used to configure cron trigger."
        v-model="cronExpression"
        icon="info"
      >
        <span v-if="!$v.cronExpression.reqIfCron && $v.$dirty">Cron expression is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs6 v-if="triggerType === 'SimpleTrigger'">
      <form-text
        required
        label="Interval (ms)"
        title="Schedule interval in milliseconds."
        v-model="repeatInterval"
        icon="alarm"
      >
        <span v-if="!$v.repeatInterval.reqIfSimple && $v.$dirty">Repeat interval is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs6 v-if="triggerType === 'SimpleTrigger'">
      <form-text
        required
        label="Repetitions"
        title="Number of times trigger will be executed."
        v-model="repeatCount"
        icon="autorenew"
      >
        <span v-if="!$v.repeatCount.reqIfSimple && $v.$dirty">Repeat count is required.</span>
      </form-text>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import FormToken from "../common/form/FormToken.vue";
import FormText from "../common/form/FormText.vue";
import FormSelect from "../common/form/FormSelect.vue";
import FormDateTimePicker from "../common/form/FormDateTimePicker.vue";

import { formatIso8601 } from "../common/Utils";
import { required, requiredIf, helpers } from "vuelidate/lib/validators";
import {
  ISchedule,
  IScheduleCreateRequest,
  TriggerType
} from "sitewhere-rest-api";

// Validation for token.
const validToken = helpers.regex("validToken", /^[a-zA-Z0-9-_]+$/);

const reqIfCron = requiredIf((vm: ScheduleDetailFields) => {
  return vm.triggerType === TriggerType.CronTrigger;
});
const reqIfSimple = requiredIf((vm: ScheduleDetailFields) => {
  return vm.triggerType === TriggerType.SimpleTrigger;
});

@Component({
  components: {
    DialogForm,
    FormToken,
    FormText,
    FormSelect,
    FormDateTimePicker
  },
  validations: {
    token: {
      required,
      validToken
    },
    name: {
      required
    },
    triggerType: {
      required
    },
    cronExpression: {
      reqIfCron
    },
    repeatInterval: {
      reqIfSimple
    },
    repeatCount: {
      reqIfSimple
    }
  }
})
export default class ScheduleDetailFields extends DialogSection {
  token: string | null = null;
  name: string = "";
  startDate: Date | null = null;
  endDate: Date | null = null;
  triggerType: TriggerType = TriggerType.SimpleTrigger;
  cronExpression: string | null = null;
  repeatInterval: number = 1000;
  repeatCount: number = 1;

  triggerTypes: {}[] = [
    {
      text: "Simple Trigger",
      value: "SimpleTrigger"
    },
    {
      text: "Cron Trigger",
      value: "CronTrigger"
    }
  ];

  /** Reset section content */
  reset(): void {
    this.token = null;
    this.name = "";
    this.startDate = null;
    this.endDate = null;
    this.triggerType = TriggerType.SimpleTrigger;
    this.cronExpression = null;
    this.repeatInterval = 1000;
    this.repeatCount = 1;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: ISchedule): void {
    this.token = input.token;
    this.name = input.name;
    this.startDate = input.startDate;
    this.endDate = input.endDate;
    this.triggerType = input.triggerType;
    if (
      input.triggerConfiguration &&
      input.triggerType === TriggerType.CronTrigger
    ) {
      this.cronExpression = input.triggerConfiguration.cronExpression;
    } else if (
      input.triggerConfiguration &&
      input.triggerType === TriggerType.SimpleTrigger
    ) {
      this.repeatInterval = parseInt(input.triggerConfiguration.repeatInterval);
      this.repeatCount = parseInt(input.triggerConfiguration.repeatCount);
    }
  }

  /** Save form data to an object */
  save(): {} {
    let triggerConfig: any = {};
    if (this.triggerType === TriggerType.CronTrigger) {
      triggerConfig.cronExpression = this.cronExpression;
    } else if (this.triggerType === TriggerType.SimpleTrigger) {
      triggerConfig.repeatInterval = this.repeatInterval;
      triggerConfig.repeatCount = this.repeatCount;
    }

    let payload: IScheduleCreateRequest = {
      token: this.token || undefined,
      name: this.name,
      startDate: formatIso8601(this.startDate) as any,
      endDate: formatIso8601(this.endDate) as any,
      triggerType: this.triggerType,
      triggerConfiguration: triggerConfig
    };

    return payload;
  }
}
</script>
