<template>
  <v-app v-if="user">
    <sw-in-app-system-bar style="-webkit-app-region: drag" />
    <v-navigation-drawer fixed :permanent="true" style="margin-top: 25px;" v-model="drawer" app>
      <v-toolbar color="#fff" class="elevation-1" style="height: 47px;" dense>
        <div class="sitewhere-logo" />
        <v-spacer />
        <v-tooltip bottom>
          <v-btn class="ma-0" icon @click="onLogOut" slot="activator">
            <v-icon class="grey--text text--darken-1">exit_to_app</v-icon>
          </v-btn>
          <span>Log Out</span>
        </v-tooltip>
      </v-toolbar>
      <sw-navigation :sections="sections" @sectionSelected="onSectionClicked" />
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
    <sw-in-app-footer>
      <copyright />
    </sw-in-app-footer>
    <notifications />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

import { handleError } from "./common/Utils";
import { AxiosResponse } from "axios";
import { getJwt } from "../rest/sitewhere-api-wrapper";
import { Component, IAction, INavigationSection } from "sitewhere-ide-common";
import { NavigationIcon } from "../libraries/constants";

import Copyright from "./Copyright.vue";
import Notifications from "./common/Notifications.vue";

@Component({
  components: {
    Copyright,
    Notifications
  }
})
export default class SystemAdministration extends Vue {
  showMessage: boolean = true;
  drawer: boolean = true;
  sections: INavigationSection[] = [
    {
      id: "tenants",
      title: "Manage Tenants",
      icon: NavigationIcon.Tenant,
      route: "system/tenants",
      longTitle: "Manage System Tenants",
      requireAll: ["ADMINISTER_TENANTS"]
    },
    {
      id: "users",
      title: "Manage Users",
      icon: NavigationIcon.User,
      route: "system/users",
      longTitle: "Manage System Users",
      requireAll: ["ADMINISTER_USERS"]
    },
    {
      id: "global",
      title: "Global Microservices",
      icon: NavigationIcon.Global,
      route: "system/microservices",
      longTitle: "Manage Global microservices",
      requireAll: ["ADMINISTER_TENANTS"]
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
.sitewhere-logo {
  position: absolute;
  top: 5px;
  left: 17px;
  right: 5px;
  bottom: 5px;
  background-image: url("../assets/sitewhere-small.png");
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
