<template>
  <list-page
    :icon="icon"
    title="Users"
    loadingMessage="Loading users ..."
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
  >
    <v-flex xs12>
      <v-data-table
        class="users-table"
        :headers="headers"
        :items="matches"
        :hide-default-footer="true"
        no-data-text="No Users Found"
      >
        <template slot="item" slot-scope="props">
          <tr>
            <td width="13%" :title="props.item.username">
              {{ props.item.username }}
            </td>
            <td width="13%" :title="props.item.firstName">
              {{ props.item.firstName }}
            </td>
            <td width="14%" :title="props.item.lastName">
              {{ props.item.lastName }}
            </td>
            <td width="25%" :title="props.item.email">
              {{ props.item.email }}
            </td>
            <td width="25%" :title="props.item.createdDate">
              {{ props.item.createdDate }}
            </td>
            <td
              width="80px"
              title="Actions"
              v-show="props.item.username != 'system'"
            >
              <v-icon
                small
                class="action-icon"
                @click="onEditUser(props.item.username)"
                >fa-edit</v-icon
              >
              <v-icon
                small
                class="action-icon ml-2"
                @click="onDeleteUser(props.item.username)"
                >fa-trash</v-icon
              >
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-flex>
    <template slot="actions">
      <add-button tooltip="Add User" @action="onAddUser" />
    </template>
    <template slot="dialogs">
      <user-create-dialog ref="add" @created="refresh" />
      <user-update-dialog ref="edit" @updated="refresh" />
      <user-delete-dialog ref="delete" @deleted="refresh" />
    </template>
  </list-page>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import {
  IPageSizes,
  ITableHeaders,
  NavigationIcon,
  listUsers,
  formatDate,
} from "sitewhere-ide-common";
import { ListComponent, ListPage } from "sitewhere-ide-components";

import ActionsBlock from "../common/ActionsBlock.vue";
import UserCreateDialog from "./UserCreateDialog.vue";
import UserUpdateDialog from "./UserUpdateDialog.vue";
import UserDeleteDialog from "./UserDeleteDialog.vue";
import AddButton from "../common/navbuttons/AddButton.vue";

import { AxiosPromise } from "axios";

import {
  IUser,
  IUserSearchCriteria,
  IUserResponseFormat,
  IUserSearchResults,
} from "sitewhere-rest-api";

@Component({
  components: {
    ListPage,
    AddButton,
    ActionsBlock,
    UserCreateDialog,
    UserUpdateDialog,
    UserDeleteDialog,
  },
})
export default class UsersList extends ListComponent<
  IUser,
  IUserSearchCriteria,
  IUserResponseFormat,
  IUserSearchResults
> {
  @Ref() readonly add!: UserCreateDialog;
  @Ref() readonly edit!: UserUpdateDialog;
  @Ref() readonly delete!: UserDeleteDialog;

  headers: ITableHeaders = [
    {
      align: "left",
      sortable: false,
      text: "Username",
      value: "username",
    },
    {
      align: "left",
      sortable: false,
      text: "First Name",
      value: "firstname",
    },
    {
      align: "left",
      sortable: false,
      text: "Last Name",
      value: "lastname",
    },
    {
      align: "left",
      sortable: false,
      text: "Email",
      value: "email",
    },
    {
      align: "left",
      sortable: false,
      text: "Created Date",
      value: "created",
    },
    {
      align: "left",
      sortable: false,
      text: "",
      value: "created",
    },
  ];
  pageSizes: IPageSizes = [
    {
      text: "25",
      value: 25,
    },
    {
      text: "50",
      value: 50,
    },
    {
      text: "100",
      value: 100,
    },
  ];

  /** Get page icon */
  get icon(): NavigationIcon {
    return NavigationIcon.User;
  }

  /** Build search criteria for list */
  buildSearchCriteria(): IUserSearchCriteria {
    const criteria: IUserSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IUserResponseFormat {
    const format: IUserResponseFormat = {};
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
    this.add.open();
  }

  // Called to open edit dialog.
  onEditUser(username: string) {
    this.edit.open(username);
  }

  // Called to open delete dialog.
  onDeleteUser(username: string) {
    this.delete.open(username);
  }

  // Format a date.
  format(date: Date) {
    formatDate(date);
  }
}
</script>

<style scoped>
.users-table >>> td {
  font-size: 0.875rem;
  height: 38px;
}
.action-icon {
  color: #ddd;
}
.action-icon:hover {
  color: #999;
}
</style>