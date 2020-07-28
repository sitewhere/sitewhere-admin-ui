<template>
  <dialog-form>
    <v-flex xs12>
      <v-data-table
        hide-default-footer
        :headers="headers"
        :items="parameters"
        no-data-text="Command has no existing parameters"
      >
        <template slot="item" slot-scope="props">
          <tr>
            <td width="40%" :title="props.item.name">
              {{
              props.item.name.length > 25
              ? props.item.name.substring(0, 25) + "..."
              : props.item.name
              }}
            </td>
            <td width="40%" :title="props.item.type">
              {{
              props.item.type.length > 25
              ? props.item.type.substring(0, 25) + "..."
              : props.item.type
              }}
            </td>
            <td width="10%">
              <span v-if="props.item.required">
                <v-icon small class="green--text">fa-check-circle</v-icon>
              </span>
            </td>
            <td width="10%">
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-on="on"
                    icon
                    small
                    @click="onDeleteParameter(props.item.name)"
                    slot="activator"
                  >
                    <v-icon small class="grey--text">fa-trash</v-icon>
                  </v-btn>
                </template>
                <span>Delete Parameter</span>
              </v-tooltip>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-flex>
    <v-flex xs12>
      <v-divider class="mb-5" />
    </v-flex>
    <v-flex xs12>
      <v-card color="#eee" outlined>
        <v-container fluid>
          <v-layout class="pl-4 pr-4 pt-2 pb-2" row>
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
              <v-checkbox dense label="Required" v-model="required" />
            </v-flex>
            <v-flex xs1 class="pt-2">
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-on="on"
                    icon
                    outlined
                    color="primary"
                    class="mt-1 ml-2"
                    @click="onAddParameter"
                  >
                    <v-icon>add</v-icon>
                  </v-btn>
                </template>
                <span>Add Parameter</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { ITableHeaders } from "sitewhere-ide-common";
import { DialogSection, DialogForm } from "sitewhere-ide-components";

import { required, helpers } from "vuelidate/lib/validators";
import { ICommandParameter, ParameterType } from "sitewhere-rest-api";
import { ParameterTypes } from "../../libraries/constants";

// Validation for token.
const validParamName = helpers.regex("validParamName", /^[\w-]+$/);

@Component({
  components: { DialogForm },
  validations: {
    name: {
      required,
      validParamName,
    },
    type: {
      required,
    },
  },
})
export default class ParametersPanel extends DialogSection {
  parameters: ICommandParameter[] = [];

  name: string | null = null;
  type: ParameterType | null = null;
  required = false;

  headers: ITableHeaders = [
    {
      align: "left",
      sortable: false,
      text: "Parameter Name",
      value: "name",
    },
    {
      align: "left",
      sortable: false,
      text: "Parameter Type",
      value: "type",
    },
    {
      align: "left",
      sortable: false,
      text: "Required",
      value: "required",
    },
    {
      align: "left",
      sortable: false,
      text: "",
      value: "delete",
    },
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
      parameters: this.parameters,
    };
  }

  // Called when a parameter is deleted.
  onDeleteParameter(name: string) {
    let found: number | null = null;
    this.parameters.forEach((param, index) => {
      if (param.name === name) {
        found = index;
      }
    });
    if (found != null) {
      this.parameters.splice(found, 1);
    }
  }

  // Called when a parameter is added.
  onAddParameter() {
    if (!this.name || !this.type) {
      return;
    }
    this.$v.$touch();
    if (!this.$v.$invalid) {
      if (this.name && this.type) {
        const parameter: ICommandParameter = {
          name: this.name,
          type: this.type,
          required: this.required,
        };
        this.parameters.push(parameter);
        this.resetSubform();
      }
    }
  }
}
</script>
