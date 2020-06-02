<template>
  <v-card flat>
    <content-field name="type" value="PostgreSQL" />
    <content-field :alt="true" name="dialect" value="postgres95" />
    <content-field name="hostname" :value="hostname" />
    <content-field :alt="true" name="port" :value="port" />
    <content-field name="username" :value="username" />
    <content-field :alt="true" name="password" :password="true" :value="password" />
    <content-field name="max connections" :value="maxConnections" />
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Postgres95Configuration } from "sitewhere-configuration-model";

import { ContentField } from "sitewhere-ide-components";
import { VCard } from "vuetify/lib";

@Component({
  components: { VCard, ContentField }
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
