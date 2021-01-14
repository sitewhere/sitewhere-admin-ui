<template>
  <dialog-form>
    <v-card flat tile>
      <form-select
        :items="allRoles"
        :multiple="true"
        title="Choose user roles"
        label="User Roles"
        item-text="role"
        item-value="role"
        v-model="roles"
        icon="assignment_ind"
      />
      <v-switch dense v-model="enabled" label="Enable user login"></v-switch>
    </v-card>
  </dialog-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { listRoles } from "sitewhere-ide-common";

import {
  DialogSection,
  DialogForm,
  FormSelect,
} from "sitewhere-ide-components";

import { handleError } from "sitewhere-ide-common";

import { AxiosResponse } from "axios";
import {
  IRole,
  IRoleSearchCriteria,
  IRoleResponseFormat,
  IRoleSearchResults,
} from "sitewhere-rest-api";

@Component({
  components: { DialogForm, FormSelect },
  validations: {},
})
export default class UserPermissions extends DialogSection {
  enabled = true;
  roles: string[] = [];
  allRoles: IRole[] = [];

  /** Reset section content */
  async reset() {
    this.enabled = true;
    this.roles = [];
    this.$v.$reset();

    // Reload roles list.
    try {
      const criteria: IRoleSearchCriteria = { pageNumber: 1, pageSize: 0 };
      const format: IRoleResponseFormat = {};
      const response: AxiosResponse<IRoleSearchResults> = await listRoles(
        this.$store,
        criteria,
        format
      );
      this.allRoles = response.data.results;
    } catch (err) {
      handleError(err);
    }
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: { roles: IRole[] }): void {
    this.roles = input.roles.map((role) => role.role);
  }

  /** Save form data to an object */
  save(): {} {
    return {
      roles: this.roles,
      enabled: this.enabled,
    };
  }
}
</script>
