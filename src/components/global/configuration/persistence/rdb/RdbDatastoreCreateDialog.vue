<template>
  <rdb-datastore-dialog
    ref="dialog"
    title="Create Relational Datastore"
    createLabel="Create"
    @payload="onCreateClicked"
  >
    <v-card color="#f5f5f5" flat class="pl-3 pr-3 pt-1 pb-2">
      <v-text-field
        :required="true"
        title="Global datasource id"
        label="Datasource Id"
        placeholder=" "
        v-model="name"
        hide-details
        prepend-icon="fa-cog"
      />
      <span v-if="$v.name.$invalid && $v.$dirty">Datasource id is required.</span>
    </v-card>
  </rdb-datastore-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Ref, Prop } from "vue-property-decorator";

import RdbDatastoreDialog from "./RdbDatastoreDialog.vue";

import { required, helpers } from "vuelidate/lib/validators";

// Validation for token.
const validToken = helpers.regex("validToken", /^[a-zA-Z0-9-_]+$/);

import { IDatastoreDefinitionLocal } from "sitewhere-configuration-model";
import { IInstanceConfiguration } from "sitewhere-rest-api";

@Component({
  components: { RdbDatastoreDialog },
  validations: {
    name: {
      required,
      validToken
    }
  }
})
export default class RdbDatastoreUpdateDialog extends Vue {
  @Prop() readonly instance!: IInstanceConfiguration;
  @Ref() readonly dialog!: RdbDatastoreDialog;

  name = "";
  type = "postgres95";
  configuration: any = {};

  /** Open the dialog */
  openDialog(): void {
    this.dialog.reset();
    this.dialog.openDialog();
  }

  /** Called when create button is clicked */
  onCreateClicked(payload: IDatastoreDefinitionLocal): void {
    this.$v.$touch();
    if (this.$v.$invalid) {
      return;
    }

    this.type = payload.type;
    this.configuration = payload.configuration;
    this.$emit("created", {
      name: this.name,
      definition: { type: this.type, configuration: this.configuration }
    });
    this.dialog.dialogVisible = false;
  }
}
</script>
