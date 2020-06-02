<template>
  <v-app v-if="user">
    <in-app-system-bar
      style="-webkit-app-region: drag"
      @openWebTools="onOpenWebTools"
      @minimize="onMinWindow"
      @maximize="onMaxWindow"
      @close="onCloseWindow"
    />
    <v-navigation-drawer :width="300" style="margin-top: 25px;" v-model="drawer" app>
      <v-toolbar color="#fff" class="elevation-1" style="height: 47px;" dense>
        <div class="sitewhere-logo" />
        <v-spacer />
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn small v-on="on" class="ma-0" icon @click="onLogOut">
              <v-icon class="grey--text text--darken-1">exit_to_app</v-icon>
            </v-btn>
          </template>
          <span>Log Out</span>
        </v-tooltip>
      </v-toolbar>
      <navigation :sections="sections" @sectionSelected="onSectionClicked" />
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
    <in-app-footer>
      <copyright />
    </in-app-footer>
    <notifications />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

import { handleError, getJwt, NavigationIcon } from "sitewhere-ide-common";
import { AxiosResponse } from "axios";
import { Component } from "vue-property-decorator";
import { IAction, INavigationSection } from "sitewhere-ide-common";
import {
  InAppSystemBar,
  InAppFooter,
  Navigation
} from "sitewhere-ide-components";

import Copyright from "./Copyright.vue";
import Notifications from "./common/Notifications.vue";

import Electron from "electron";

@Component({
  components: {
    Copyright,
    Notifications,
    InAppSystemBar,
    Navigation,
    InAppFooter
  }
})
export default class SystemAdministration extends Vue {
  showMessage = true;
  drawer = true;
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
      id: "settings",
      title: "Global Settings",
      icon: NavigationIcon.Global,
      route: "system/settings",
      longTitle: "Manage Global Settings",
      requireAll: ["ADMINISTER_TENANTS"]
    }
  ];

  created() {
    // Set up JWT auto-refresh.
    this.refreshJwt();

    // Verify that user is logged in.
    const user = this.$store.getters.user;
    if (!user) {
      console.log("No user found in store. Logging out!");
      this.onLogOut();
      return;
    }
    this.onSectionClicked(this.$data.sections[0]);
  }

  /** Get logged in user */
  get user() {
    return this.$store.getters.user;
  }

  /** Get currently selected section */
  get section() {
    return this.$store.getters.currentSection;
  }

  /** Get user full name */
  get fullname() {
    const user = this.$store.getters.user;
    if (user) {
      const first = this.$store.getters.user.firstName;
      const last = this.$store.getters.user.lastName;
      if (last.length > 1) {
        return first + " " + last;
      } else {
        return first;
      }
    }
    return "Not Logged In";
  }

  /** Get global loading indicator */
  get loading() {
    return this.$store.getters.loading;
  }

  /** Get global error indicator */
  get error() {
    return this.$store.getters.error;
  }

  /** Called when a section is clicked */
  onSectionClicked(section: INavigationSection) {
    this.$store.commit("currentSection", section);
    this.$router.push("/" + section.route);
  }

  onUserAction(action: IAction) {
    if (action.id === "logout") {
      this.onLogOut();
    }
  }

  /** Called when user requests log out */
  onLogOut() {
    this.$store.commit("logOut");
    this.$router.push("/");
  }

  /** Open Web Tools */
  onOpenWebTools() {
    Electron.remote.getCurrentWebContents().openDevTools();
  }

  /** Minimize window */
  onMinWindow() {
    Electron.remote.getCurrentWindow().minimize();
  }

  /** Maximize window */
  onMaxWindow() {
    Electron.remote.getCurrentWindow().maximize();
  }

  /** Close window */
  onCloseWindow() {
    Electron.remote.getCurrentWindow().close();
    Electron.app.quit();
  }

  // Set up timer for reloading JWT.
  async refreshJwt() {
    const component = this;
    try {
      const response: AxiosResponse<any> = await getJwt(this.$store);
      const jwt = response.headers["x-sitewhere-jwt"];
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
