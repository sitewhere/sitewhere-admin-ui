<template>
  <v-app v-if="user">
    <in-app-system-bar style="-webkit-app-region: drag"/>
    <v-navigation-drawer fixed style="margin-top: 25px;" v-model="drawer" app>
      <v-toolbar class="elevation-1" style="height: 47px;" dense></v-toolbar>
      <navigation :sections="sections" @sectionSelected="onSectionClicked"></navigation>
      <v-menu class="current-user-block" top right offset-y>
        <v-btn class="grey darken-1 white--text" slot="activator">
          <font-awesome-icon icon="user" class="mr-2"/>
          {{ fullname }}
        </v-btn>
        <v-list>
          <v-list-tile @click="onUserAction(action)" v-for="action in userActions" :key="action.id">
            <font-awesome-icon :icon="action.icon" class="mr-2"/>
            <v-list-tile-title v-text="action.title"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-navigation-drawer>
    <v-content>
      <v-container class="pa-0" fluid fill-height>
        <v-layout>
          <v-flex fill-height>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <in-app-footer style="border-top: 1px solid #ddd;"/>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import InAppSystemBar from "./common/InAppSystemBar.vue";
import InAppFooter from "./common/InAppFooter.vue";
import Navigation from "./common/Navigation.vue";

import { handleError } from "./common/Utils";
import { AxiosResponse } from "axios";
import { getJwt } from "../rest/sitewhere-api-wrapper";
import { INavigationSection } from "../libraries/navigation-model";

/** Interface for toolbar action */
export interface IAction {
  id: "logout";
  title: "Log Out";
  icon: "power-off";
}

@Component({
  components: {
    InAppSystemBar,
    InAppFooter,
    Navigation
  }
})
export default class SystemAdministration extends Vue {
  drawer: boolean = true;
  sections: INavigationSection[] = [
    {
      id: "tenants",
      title: "Manage Tenants",
      icon: "layers",
      route: "system/tenants",
      longTitle: "Manage System Tenants",
      requireAll: ["ADMINISTER_TENANTS"]
    },
    {
      id: "users",
      title: "Manage Users",
      icon: "people",
      route: "system/users",
      longTitle: "Manage System Users",
      requireAll: ["ADMINISTER_USERS"]
    },
    {
      id: "global",
      title: "Global Microservices",
      icon: "language",
      route: "system/microservices",
      longTitle: "Manage Global microservices",
      requireAll: ["ADMINISTER_TENANTS"]
    }
  ];
  userActions: IAction[] = [
    {
      id: "logout",
      title: "Log Out",
      icon: "power-off"
    }
  ];

  created() {
    // Set up JWT auto-refresh.
    this.refreshJwt();

    // Verify that user is logged in.
    var user = this.$store.getters.user;
    if (!user) {
      console.log("No user found in store. Logging out!");
      this.onLogOut();
      return;
    }
    this.onSectionClicked(this.$data.sections[0]);
  }

  // Get logged in user.
  get user() {
    return this.$store.getters.user;
  }

  // Get currently selected section.
  get section() {
    return this.$store.getters.currentSection;
  }

  // Get user full name.
  get fullname() {
    var user = this.$store.getters.user;
    if (user) {
      var first = this.$store.getters.user.firstName;
      var last = this.$store.getters.user.lastName;
      if (last.length > 1) {
        return first + " " + last;
      } else {
        return first;
      }
    }
    return "Not Logged In";
  }

  // Get global loading indicator.
  get loading() {
    return this.$store.getters.loading;
  }

  // Get global error indicator.
  get error() {
    return this.$store.getters.error;
  }

  // Called when a section is clicked.
  onSectionClicked(section: INavigationSection) {
    this.$store.commit("currentSection", section);
    this.$router.push("/" + section.route);
  }

  onUserAction(action: IAction) {
    if (action.id === "logout") {
      this.onLogOut();
    }
  }

  // Called when user requests log out.
  onLogOut() {
    console.log("Logging out!");
    this.$store.commit("logOut");
    this.$router.push("/");
  }

  // Set up timer for reloading JWT.
  async refreshJwt() {
    var component = this;
    try {
      let response: AxiosResponse<any> = await getJwt(this.$store);
      console.log("Refreshed JWT.");
      var jwt = response.headers["x-sitewhere-jwt"];
      this.$store.commit("jwt", jwt);
      setTimeout(function() {
        component.refreshJwt();
      }, 1000 * 60 * 5);
    } catch (err) {
      handleError(err);
      console.log("Could not update JWT.");
      component.onLogOut();
    }
  }
}
</script>

<style scoped>
.current-user-block {
  position: absolute;
  bottom: 40px;
}
</style>
