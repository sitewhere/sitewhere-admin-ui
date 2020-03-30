<template>
  <v-card flat>
    <sw-content-field name="type" value="PostgreSQL" />
    <sw-content-field :alt="true" name="dialect" value="postgres95" />
    <sw-content-field name="hostname" :value="hostname" />
    <sw-content-field :alt="true" name="port" :value="port" />
    <sw-content-field name="username" :value="username" />
    <sw-content-field
      :alt="true"
      name="password"
      :password="true"
      :value="password"
    />
    <sw-content-field name="max connections" :value="maxConnections" />
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";
import { Postgres95Configuration } from "sitewhere-configuration-model";

@Component({
  components: {}
})
export default class Postgres95Summary extends Vue {
  @Prop() readonly configuration!: Postgres95Configuration;

  /** Hostname */
  get hostname(): string | null {
    return this.configuration ? this.configuration.hostname : null;
  }

  /** Port */
  get port(): number | null {
    return this.configuration ? this.configuration.port : null;
  }

  /** Username */
  get username(): string | null {
    return this.configuration ? this.configuration.username : null;
  }

  /** Password */
  get password(): string | null {
    return this.configuration ? this.configuration.password : null;
  }

  /** Max connections */
  get maxConnections(): number | null {
    return this.configuration ? this.configuration.maxConnections : null;
  }
}
</script>

<style scoped></style>
