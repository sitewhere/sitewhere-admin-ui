<template>
  <sw-list-page
    :icon="icon"
    title="Users"
    loadingMessage="Loading users ..."
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
  >
    <v-flex xs12>
      <v-data-table
        :headers="headers"
        :items="matches"
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
            <actions-block
              @edit="onEditUser(props.item.username)"
              @delete="onDeleteUser(props.item.username)"
            />
          </td>
        </template>
      </v-data-table>
    </v-flex>
    <template slot="actions">
      <sw-navigation-action-button icon="plus" tooltip="Add User" @action="onAddUser"/>
    </template>
    <template slot="dialogs">
      <user-create-dialog ref="add" @created="refresh"/>
      <user-update-dialog ref="edit" @updated="refresh"/>
      <user-delete-dialog ref="delete" @deleted="refresh"/>
    </template>
  </sw-list-page>
</template>

<script lang="ts">
import {
  Component,
  ListComponent,
  IPageSizes,
  ITableHeaders,
  Refs
} from "sitewhere-ide-common";

import ActionsBlock from "../common/ActionsBlock.vue";
import UserCreateDialog from "./UserCreateDialog.vue";
import UserUpdateDialog from "./UserUpdateDialog.vue";
import UserDeleteDialog from "./UserDeleteDialog.vue";

import { NavigationIcon } from "../../libraries/constants";
import { formatDate } from "../common/Utils";
import { AxiosPromise } from "axios";

import { listUsers } from "../../rest/sitewhere-users-api";
import {
  IUser,
  IUserSearchCriteria,
  IUserResponseFormat,
  IUserSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    ActionsBlock,
    UserCreateDialog,
    UserUpdateDialog,
    UserDeleteDialog
  }
})
export default class UsersList extends ListComponent<
  IUser,
  IUserSearchCriteria,
  IUserResponseFormat,
  IUserSearchResults
> {
  $refs!: Refs<{
    add: UserCreateDialog;
    edit: UserUpdateDialog;
    delete: UserDeleteDialog;
  }>;

  headers: ITableHeaders = [
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
  ];
  pageSizes: IPageSizes = [
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
  ];

  /** Get page icon */
  get icon(): NavigationIcon {
    return NavigationIcon.User;
  }

  /** Build search criteria for list */
  buildSearchCriteria(): IUserSearchCriteria {
    let criteria: IUserSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IUserResponseFormat {
    let format: IUserResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IUserSearchCriteria,
    format: IUserResponseFormat
  ): AxiosPromise<IUserSearchResults> {
    return listUsers(this.$store, criteria, format);
  }

  // Called to open dialog.
  onAddUser() {
    this.$refs.add.open();
  }

  // Called to open edit dialog.
  onEditUser(username: string) {
    this.$refs.edit.open(username);
  }

  // Called to open delete dialog.
  onDeleteUser(username: string) {
    this.$refs.delete.open(username);
  }

  // Format a date.
  formatDate(date: Date) {
    formatDate(date);
  }
}
</script>

<style scoped>
</style>
