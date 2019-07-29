<template>
  <dialog-form>
    <v-flex xs5>
      <form-text
        required
        v-model="token"
        title="Unique token that identifies the tenant. Should be alpahanumeric with no spaces."
        label="Tenant token"
        icon="info"
        class="mr-3"
      >
        <span v-if="!$v.token.required && $v.$dirty">Tenant token is required.</span>
        <span v-if="!$v.token.validToken && $v.$dirty">Tenant token is not valid.</span>
      </form-text>
    </v-flex>
    <v-flex xs7>
      <form-text
        required
        v-model="authToken"
        title="Token passed from clients to authenticate access to tenant."
        label="Authentication Token"
        icon="https"
      >
        <span v-if="$v.authToken.$invalid && $v.$dirty">Authentication Token is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs12>
      <form-text
        required
        v-model="name"
        title="Name shown in user interface for tenant."
        label="Name"
        icon="info"
      >
        <span v-if="$v.name.$invalid && $v.$dirty">Name is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs12>
      <form-select
        title="List of system users allowed to access tenant."
        label="Authorized users"
        :items="allUsers"
        v-model="authUsers"
        multiple
        item-text="username"
        item-value="username"
        chips
        icon="people"
      />
    </v-flex>
    <v-flex xs6>
      <form-select
        required
        title="Template used for initial tenant configuration."
        :items="templatesList"
        v-model="tenantTemplateId"
        label="Tenant Template"
        item-text="name"
        item-value="id"
        icon="layers"
        class="mr-3"
      >
        <span v-if="$v.tenantTemplateId.$invalid && $v.$dirty">Tenant template is required.</span>
      </form-select>
    </v-flex>
    <v-flex xs6>
      <form-select
        required
        title="Template for dataset initially loaded into tenant."
        :items="datasetsList"
        v-model="datasetTemplateId"
        label="Dataset Template"
        item-text="name"
        item-value="id"
        icon="backup"
      >
        <span v-if="$v.datasetTemplateId.$invalid && $v.$dirty">Dataset template is required.</span>
      </form-select>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import FormText from "../common/form/FormText.vue";
import FormSelect from "../common/form/FormSelect.vue";

import { required, helpers } from "vuelidate/lib/validators";
import { handleError } from "../common/Utils";

import { AxiosPromise } from "axios";
import {
  IUser,
  IUserSearchCriteria,
  IUserResponseFormat,
  IUserSearchResults,
  ITenantTemplate,
  IDatasetTemplate
} from "sitewhere-rest-api";
import {
  listTenantTemplates,
  listDatasetTemplates
} from "../../rest/sitewhere-tenants-api";
import { listUsers } from "../../rest/sitewhere-users-api";

// Validation for token.
const validToken = helpers.regex("validToken", /^[a-zA-Z0-9-_]+$/);

@Component({
  components: {
    DialogForm,
    FormText,
    FormSelect
  },
  validations: {
    token: {
      required,
      validToken
    },
    name: {
      required
    },
    authToken: {
      required
    },
    authUsers: {
      required
    },
    tenantTemplateId: {
      required
    },
    datasetTemplateId: {
      required
    }
  }
})
export default class TenantDetailFields extends DialogSection {
  token: string | null = null;
  name: string | null = null;
  authToken: string | null = null;
  authUsers: string[] = [];
  tenantTemplateId: string | null = null;
  datasetTemplateId: string | null = null;

  // Content for dropdowns.
  templatesList: ITenantTemplate[] = [];
  datasetsList: IDatasetTemplate[] = [];
  allUsers: IUser[] = [];

  /** Reset section content */
  reset(): void {
    this.token = null;
    this.name = null;
    this.authToken = null;
    this.authUsers = [];
    this.tenantTemplateId = null;
    this.datasetTemplateId = null;
    this.$v.$reset();
    this.refreshDropdownContent();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: {}): void {
    this.token = (input as any).token;
    this.name = (input as any).name;
    this.authToken = (input as any).authenticationToken;
    this.authUsers = (input as any).authorizedUserIds;
    this.tenantTemplateId = (input as any).tenantTemplateId;
    this.datasetTemplateId = (input as any).datasetTemplateId;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      token: this.token,
      name: this.name,
      authenticationToken: this.authToken,
      authorizedUserIds: this.authUsers,
      tenantTemplateId: this.tenantTemplateId,
      datasetTemplateId: this.datasetTemplateId
    };
  }

  /** Refresh content for dropdowns */
  refreshDropdownContent(): void {
    let component = this;
    let tenantTemplates: AxiosPromise<ITenantTemplate[]> = listTenantTemplates(
      this.$store
    );
    let datasetTemplates: AxiosPromise<
      IDatasetTemplate[]
    > = listDatasetTemplates(this.$store);

    let criteria: IUserSearchCriteria = { pageNumber: 1, pageSize: 0 };
    let format: IUserResponseFormat = {};
    let users: AxiosPromise<IUserSearchResults> = listUsers(
      this.$store,
      criteria,
      format
    );
    Promise.all([tenantTemplates, datasetTemplates, users])
      .then(values => {
        component.templatesList = values[0].data;
        component.datasetsList = values[1].data;
        component.allUsers = values[2].data.results;
      })
      .catch(error => {
        handleError(error);
      });
  }
}
</script>

<style scoped>
</style>
