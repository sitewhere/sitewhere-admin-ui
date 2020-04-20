<template>
  <sw-dialog-form>
    <v-flex xs9>
      <sw-form-text
        required
        :readonly="readonly"
        label="Hostname"
        title="Hostname of PostgreSQL server."
        v-model="hostname"
        icon="fa-server"
        class="mr-3"
      >
        <!--span v-if="$v.hostname.$invalid && $v.$dirty"
          >Hostname is required.</span
        -->
      </sw-form-text>
    </v-flex>
    <v-flex xs3>
      <sw-form-text
        required
        :readonly="readonly"
        label="Port"
        title="Port for PostgreSQL server."
        type="number"
        v-model="port"
      >
        <!--span v-if="$v.hostname.$invalid && $v.$dirty"
          >Hostname is required.</span
        -->
      </sw-form-text>
    </v-flex>
    <v-flex xs12>
      <sw-form-text
        required
        :readonly="readonly"
        label="Max Connections"
        title="Maximum number of connections to server."
        type="number"
        v-model="maxConnections"
        icon="fa-stream"
      >
        <!--span v-if="$v.hostname.$invalid && $v.$dirty"
          >Hostname is required.</span
        -->
      </sw-form-text>
    </v-flex>
    <v-flex xs6>
      <sw-form-text
        required
        :readonly="readonly"
        label="Username"
        title="Username."
        v-model="username"
        icon="fa-user"
        class="mr-3"
      >
        <!--span v-if="$v.hostname.$invalid && $v.$dirty"
          >Hostname is required.</span
        -->
      </sw-form-text>
    </v-flex>
    <v-flex xs6>
      <sw-form-text
        required
        :readonly="readonly"
        label="Password"
        title="Password."
        v-model="password"
        icon="fa-lock"
        type="password"
      >
        <!--span v-if="$v.hostname.$invalid && $v.$dirty"
          >Hostname is required.</span
        -->
      </sw-form-text>
    </v-flex>
  </sw-dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection, Prop } from "sitewhere-ide-common";

import { required } from "vuelidate/lib/validators";

@Component({
  validations: {
    hostname: {
      required
    }
  }
} as any)
export default class Postgres95Fields extends DialogSection {
  @Prop() readonly readonly!: boolean;

  hostname: string | null = null;
  port: number | null = null;
  username: string | null = null;
  password: string | null = null;
  maxConnections: number | null = null;

  /** Reset section content */
  reset(): void {
    this.hostname = null;
    this.port = null;
    this.username = null;
    this.password = null;
    this.maxConnections = null;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(configuration: any): void {
    this.hostname = configuration.hostname;
    this.port = configuration.port;
    this.username = configuration.username;
    this.password = configuration.password;
    this.maxConnections = configuration.maxConnections;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      hostname: this.hostname,
      port: this.port,
      username: this.username,
      password: this.password,
      maxConnections: this.maxConnections
    };
  }
}
</script>

<style scoped></style>
