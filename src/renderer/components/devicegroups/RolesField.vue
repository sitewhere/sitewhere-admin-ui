<template>
  <v-card>
    <div>
      <span v-if="editedRoles.length" class="subheading pl-2 pt-2">Roles:</span>
      <span v-else class="subheading pl-2 pt-2">No roles currently assigned</span>
      <v-chip
        close
        v-for="role in editedRoles"
        :key="role"
        class="grey white--text"
        @input="onRoleDeleted(role)"
      >{{ role }}</v-chip>
    </div>
    <div>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs11>
            <v-text-field label="Add role" hide-details v-model="newRole"></v-text-field>
          </v-flex>
          <v-flex xs1>
            <v-tooltip left>
              <v-btn icon @click="onRoleAdded" slot="activator">
                <font-awesome-icon class="blue--text text--darken-2" icon="plus" size="lg"/>
              </v-btn>
              <span>Add Role</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    editedRoles: [],
    newRole: null
  }),

  props: ["roles"],

  watch: {
    roles: {
      immediate: true,
      handler: function() {
        this.$data.editedRoles = this.roles;
      }
    }
  },

  methods: {
    // Called when a role is added.
    onRoleAdded: function(e) {
      let roles = this.$data.newRole.split(" ");
      roles.forEach(role => this.$data.editedRoles.push(role));
      this.$data.newRole = null;
    },

    // Called when a role is deleted.
    onRoleDeleted: function(role) {
      let roles = this.$data.editedRoles;
      let index = roles.indexOf(role);
      if (index !== -1) {
        roles.splice(index, 1);
      }
    },

    // Called when roles are added or deleted.
    onRolesUpdated: function() {
      this.$emit("rolesUpdated", this.$data.editedRoles);
    }
  }
};
</script>

<style scoped>
</style>
