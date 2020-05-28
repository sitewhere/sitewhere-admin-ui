<template>
  <dialog-form>
    <v-flex xs12>
      <v-card flat>
        <v-card-text>
          <roles-field v-model="elementRoles" />
        </v-card-text>
      </v-card>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { DialogSection, DialogForm } from "sitewhere-ide-components";
import { IDeviceGroupElementCreateRequest } from "sitewhere-rest-api";

import RolesField from "./RolesField.vue";

@Component({
  components: {
    DialogForm,
    RolesField
  }
})
export default class DeviceGroupElementRoleFields extends DialogSection {
  elementRoles: string[] = [];

  /** Reset section content */
  reset(): void {
    this.elementRoles = [];
  }

  /** Perform validation */
  validate(): boolean {
    return true;
  }

  /** Load form data from an object */
  load(payload: IDeviceGroupElementCreateRequest): void {
    console.log(payload);
  }

  /** Save form data to an object */
  save(): IDeviceGroupElementCreateRequest {
    return {
      roles: this.elementRoles
    };
  }
}
</script>
