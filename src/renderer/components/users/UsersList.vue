<template>
  <navigation-page
    icon="users"
    title="Manage Users"
    loadingMessage="Loading user list ..."
    :loaded="loaded"
  >
    <div slot="content">
      <v-layout row wrap v-if="users">
        <v-flex xs12>
          <no-results-panel v-if="users.length === 0" text="No Users Found"></no-results-panel>
          <v-data-table
            v-if="users.length > 0"
            class="elevation-2 pa-0"
            :headers="headers"
            :items="users"
            :hide-actions="true"
            no-data-text="No Users Found"
          >
            <template slot="items" slot-scope="props">
              <td width="5%" :title="props.item.username">{{ props.item.username }}</td>
              <td width="5%" :title="props.item.firstName">{{ props.item.firstName }}</td>
              <td width="10%" :title="props.item.lastName">{{ props.item.lastName }}</td>
              <td width="5%" :title="props.item.status">{{ props.item.status }}</td>
              <td
                width="15%"
                :title="formatDate(props.item.createdDate)"
              >{{ formatDate(props.item.createdDate) }}</td>
              <td
                width="15%"
                :title="formatDate(props.item.updatedDate)"
              >{{ formatDate(props.item.updatedDate) }}</td>
              <td width="12%" class="action-buttons">
                <actions-block @edited="refresh" @deleted="refresh">
                  <user-update-dialog slot="edit" :username="props.item.username"></user-update-dialog>
                  <user-delete-dialog slot="delete" :username="props.item.username"></user-delete-dialog>
                </actions-block>
              </td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
      <pager :pageSizes="pageSizes" :results="results" @pagingUpdated="updatePaging"></pager>
      <user-create-dialog ref="add" @userAdded="refresh"></user-create-dialog>
    </div>
    <div slot="actions">
      <navigation-action-button icon="plus" tooltip="Add User" @action="onAddUser"></navigation-action-button>
    </div>
  </navigation-page>
</template>

<script>
import NavigationPage from "../common/NavigationPage";
import NavigationActionButton from "../common/NavigationActionButton";
import Pager from "../common/Pager";
import NoResultsPanel from "../common/NoResultsPanel";
import ActionsBlock from "../common/ActionsBlock";
import UserCreateDialog from "./UserCreateDialog";
import UserUpdateDialog from "./UserUpdateDialog";
import UserDeleteDialog from "./UserDeleteDialog";

import { formatDate } from "../common/Utils";
import { listUsers } from "../../rest/sitewhere-users-api";

export default {
  data: () => ({
    results: null,
    paging: null,
    users: null,
    headers: [
      {
        align: "left",
        sortable: false,
        text: "User Name",
        value: "username"
      },
      {
        align: "left",
        sortable: false,
        text: "First Name",
        value: "firstname"
      },
      {
        align: "left",
        sortable: false,
        text: "Last Name",
        value: "lastname"
      },
      {
        align: "left",
        sortable: false,
        text: "Status",
        value: "status"
      },
      {
        align: "left",
        sortable: false,
        text: "Created",
        value: "created"
      },
      {
        align: "left",
        sortable: false,
        text: "Updated",
        value: "updated"
      },
      {
        align: "left",
        sortable: false,
        text: "Actions",
        value: "actions"
      }
    ],
    pageSizes: [
      {
        text: "25",
        value: 25
      },
      {
        text: "50",
        value: 50
      },
      {
        text: "100",
        value: 100
      }
    ],
    loaded: false
  }),

  components: {
    Pager,
    NavigationPage,
    NavigationActionButton,
    NoResultsPanel,
    ActionsBlock,
    UserCreateDialog,
    UserUpdateDialog,
    UserDeleteDialog
  },

  computed: {
    // Accessor for utility functions.
    utils: function() {
      return Utils;
    }
  },

  methods: {
    // Update paging values and run query.
    updatePaging: function(paging) {
      this.$data.paging = paging;
      this.refresh();
    },

    // Refresh list.
    refresh: function() {
      this.$data.loaded = false;
      var component = this;
      var paging = this.$data.paging.query;
      listUsers(this.$store, paging)
        .then(function(response) {
          component.results = response.data;
          component.users = response.data.results;
          component.loaded = true;
        })
        .catch(function(e) {
          component.loaded = true;
        });
    },

    // Called when page number is updated.
    onPageUpdated: function(pageNumber) {
      this.$data.pager.page = pageNumber;
      this.refresh();
    },

    // Called to open dialog.
    onAddUser: function() {
      this.$refs.add.onOpenDialog();
    }
  }
};
</script>

<style scoped>
</style>
