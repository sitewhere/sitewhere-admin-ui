<template>
  <v-input :prepend-icon="icon">
    <v-card flat class="pa-0">
      <div>
        <div v-if="!editedRoles.length" class="subheading pl-1 pt-1">No roles currently assigned</div>
        <v-chip
          close
          small
          v-for="role in editedRoles"
          :key="role"
          class="grey white--text"
          @input="onRoleDeleted(role)"
        >{{ role }}</v-chip>
      </div>
      <div>
        <v-container fluid class="pa-0">
          <v-layout row wrap>
            <v-flex xs11>
              <v-text-field label="Add role" hide-details v-model="newRoles"></v-text-field>
            </v-flex>
            <v-flex xs1>
              <v-tooltip left>
                <v-btn icon @click="onRolesAdded" slot="activator">
                  <font-awesome-icon class="blue--text text--darken-2" icon="plus" size="lg"/>
                </v-btn>
                <span>Add Role</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </v-card>
  </v-input>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "sitewhere-ide-common";

@Component
export default class RolesField extends Vue {
  @Prop() readonly value!: string[];
  @Prop() readonly icon!: string;

  editedRoles: string[] = [];
  newRoles: string = "";

  @Watch("value")
  onValueChanged(val: string[], oldVal: string[]) {
    this.editedRoles = val;
  }

  // Called when roles are added.
  onRolesAdded() {
    let roles = this.newRoles.split(" ");
    roles.forEach(role => {
      if (this.editedRoles.indexOf(role) === -1) {
        this.editedRoles.push(role);
      }
    });
    this.newRoles = "";
  }

  // Called when a role is deleted.
  onRoleDeleted(role: string) {
    let roles = this.editedRoles;
    let index = roles.indexOf(role);
    if (index !== -1) {
      roles.splice(index, 1);
    }
  }

  // Called when roles are added or deleted.
  onRolesUpdated() {
    this.$emit("input", this.editedRoles);
  }
}
</script>

<style scoped>
</style>
