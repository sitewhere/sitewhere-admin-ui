<template>
  <dialog-form>
    <v-flex xs12>
      <v-data-table
        :headers="headers"
        :items="parameters"
        :rows-per-page-items="pagesize"
        no-data-text="Command has no existing parameters"
      >
        <template slot="items" slot-scope="props">
          <td
            width="250px"
            :title="props.item.name"
          >{{ (props.item.name.length > 25) ? props.item.name.substring(0, 25) + "..." : props.item.name }}</td>
          <td
            width="350px"
            :title="props.item.type"
          >{{ (props.item.type.length > 25) ? props.item.type.substring(0, 25) + "..." : props.item.type }}</td>
          <td width="200px">
            <span v-if="props.item.required">
              <font-awesome-icon color="#666" icon="check-circle" />
            </span>
          </td>
          <td width="20px">
            <v-tooltip left>
              <v-btn icon @click="onDeleteParameter(props.item.name)" slot="activator">
                <v-icon class="grey--text">delete</v-icon>
              </v-btn>
              <span>Delete Parameter</span>
            </v-tooltip>
          </td>
        </template>
      </v-data-table>
    </v-flex>
    <v-flex xs12>
      <v-container class="pa-0 pt-5" fluid>
        <v-layout row>
          <v-flex xs4>
            <v-text-field class="pr-3" placeholder=" " label="Name" v-model="name" />
          </v-flex>
          <v-flex xs4>
            <v-select
              class="pr-3"
              :items="types"
              placeholder=" "
              v-model="type"
              item-text="text"
              item-value="datatype"
              label="Parameter Type"
            />
          </v-flex>
          <v-flex xs3>
            <v-checkbox label="Required" v-model="required" />
          </v-flex>
          <v-flex xs1 class="pt-2">
            <v-tooltip left>
              <v-btn icon @click="onAddParameter" slot="activator">
                <v-icon large class="blue--text text--darken-2">add_circle</v-icon>
              </v-btn>
              <span>Add Parameter</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection, ITableHeaders } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";

import { required, helpers } from "vuelidate/lib/validators";
import { ICommandParameter, ParameterType } from "sitewhere-rest-api";
import { ParameterTypes } from "../../libraries/constants";

// Validation for token.
const validParamName = helpers.regex("validParamName", /^[\w-]+$/);

@Component({
  components: {
    DialogForm
  },
  validations: {
    name: {
      required,
      validParamName
    },
    type: {
      required
    }
  }
})
export default class ParametersPanel extends DialogSection {
  pagesize: number[] = [5];

  parameters: ICommandParameter[] = [];

  name: string | null = null;
  type: ParameterType | null = null;
  required: boolean = false;

  headers: ITableHeaders = [
    {
      align: "left",
      sortable: false,
      text: "Parameter Name",
      value: "name"
    },
    {
      align: "left",
      sortable: false,
      text: "Parameter Type",
      value: "type"
    },
    {
      align: "left",
      sortable: false,
      text: "Required",
      value: "required"
    },
    {
      align: "left",
      sortable: false,
      text: "",
      value: "delete"
    }
  ];
  types: {
    text: string;
    datatype: ParameterType;
  }[] = ParameterTypes;

  error: string | null = null;

  /** Reset section content */
  reset(): void {
    this.parameters = [];
    this.resetSubform();
    this.$v.$reset();
  }

  /** Reset form for entering values */
  resetSubform(): void {
    this.name = null;
    this.type = null;
    this.required = false;
  }

  /** Perform validation */
  validate(): boolean {
    return true;
  }

  /** Load form data from an object */
  load(input: {}): void {
    this.parameters = (input as any).parameters;
  }

  /** Load content of a single parameter */
  loadParameter(parameter: ICommandParameter) {
    this.name = parameter.name;
    this.type = parameter.type;
    this.required = parameter.required;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      parameters: this.parameters
    };
  }

  // Called when a parameter is deleted.
  onDeleteParameter(name: string) {
    this.$emit("parameterDeleted", name);
  }

  // Called when a parameter is added.
  onAddParameter() {
    if (!this.name || !this.type) {
      return;
    }
    this.$v.$touch();
    if (!this.$v.$invalid) {
      var parameter: ICommandParameter = {
        name: this.name,
        type: this.type,
        required: this.required
      };
      this.parameters.push(parameter);
      this.$emit("parameterAdded", parameter);
      this.resetSubform();
    }
  }
}
</script>
