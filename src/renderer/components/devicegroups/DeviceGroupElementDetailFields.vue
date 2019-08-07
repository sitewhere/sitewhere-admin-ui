<template>
  <dialog-form>
    <v-flex xs12>
      <form-select
        required
        title="Type of element to add."
        :items="elementTypes"
        v-model="elementType"
        label="Element type"
        item-text="text"
        item-value="value"
        icon="info"
      >
        <span v-if="$v.elementType.$invalid && $v.$dirty">Element type is required.</span>
      </form-select>
    </v-flex>
    <v-flex xs12>
      <v-card flat>
        <device-chooser
          v-if="elementType === 'device'"
          v-model="deviceToken"
          chosenText="Element points to device below:"
          notChosenText="Choose a device from the list below:"
        />
        <device-group-chooser
          v-if="elementType === 'group'"
          v-model="groupToken"
          chosenText="Element points to group below:"
          notChosenText="Choose a group from the list below:"
        />
      </v-card>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import FormSelect from "../common/form/FormSelect.vue";
import DeviceChooser from "../devices/DeviceChooser.vue";
import DeviceGroupChooser from "./DeviceGroupChooser.vue";

import { required } from "vuelidate/lib/validators";

@Component({
  components: {
    DialogForm,
    FormSelect,
    DeviceChooser,
    DeviceGroupChooser
  },
  validations: {
    elementType: {
      required
    }
  }
})
export default class DeviceGroupElementDetailFields extends DialogSection {
  deviceToken: string | null = null;
  groupToken: string | null = null;
  elementType: string | null = null;
  elementTypes: {}[] = [
    {
      text: "Device",
      value: "device"
    },
    {
      text: "Nested Group",
      value: "group"
    }
  ];

  /** Reset section content */
  reset(): void {
    this.deviceToken = null;
    this.groupToken = null;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: {}): void {}

  /** Save form data to an object */
  save(): any {
    if (this.elementType === "device" && this.deviceToken) {
      return { deviceToken: this.deviceToken };
    } else if (this.elementType === "group" && this.groupToken) {
      return {
        nestedGroupToken: this.groupToken
      };
    }
    return {};
  }
}
</script>
