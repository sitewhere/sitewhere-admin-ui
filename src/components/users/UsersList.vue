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
        :headers="headers"
        :items="matches"
        :hide-default-footer="true"
        no-data-text="No Users Found"
      >
        <template slot="item" slot-scope="props">
          <tr>
            <td width="15%" :title="props.item.username">{{ props.item.username }}</td>
            <td width="15%" :title="props.item.firstName">{{ props.item.firstName }}</td>
            <td width="15%" :title="props.item.lastName">{{ props.item.lastName }}</td>
            <td width="15%" :title="props.item.status">{{ props.item.status }}</td>
            <td
              width="15%"
              :title="format(props.item.createdDate)"
            >{{ format(props.item.createdDate) }}</td>
            <td
              width="15%"
              :title="format(props.item.updatedDate)"
            >{{ format(props.item.updatedDate) }}</td>
            <td width="12%" class="action-buttons">
              <actions-block
                @edit="onEditUser(props.item.username)"
                @delete="onDeleteUser(props.item.username)"
              />
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
  formatDate
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
  IUserSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    ListPage,
    AddButton,
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
  @Ref() readonly add!: UserCreateDialog;
  @Ref() readonly edit!: UserUpdateDialog;
  @Ref() readonly delete!: UserDeleteDialog;

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
