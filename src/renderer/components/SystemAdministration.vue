<template>
  <v-app v-if="user">
    <error-banner :error="error"></error-banner>
    <v-progress-linear v-if="loading" class="call-progress pa-0 ma-0"></v-progress-linear>
    <v-navigation-drawer dark fixed mini-variant.sync="false" v-model="drawer" app>
      <v-list>
        <v-list-tile tag="div">
          <img
            src="https://s3.amazonaws.com/sitewhere-demo/sitewhere-white.png"
            style="height: 40px;"
          >
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <navigation :sections="sections" @sectionSelected="onSectionClicked"></navigation>
    </v-navigation-drawer>
    <v-toolbar fixed class="grey darken-3" dark app>
      <v-toolbar-side-icon class="grey--text" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <font-awesome-icon :icon="section.icon" size="lg"/>
      <v-toolbar-title class="subheading">{{ section.longTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom right offset-y>
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
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <!--
    <v-footer fixed dark class="pa-1">Copyright 2017 <strong>SiteWhere LLC</strong></v-footer>
    -->
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import Navigation from "./common/Navigation.vue";
import ErrorBanner from "./common/ErrorBanner.vue";

import { handleError } from "./common/Utils";
import { AxiosResponse } from "axios";
import { getJwt } from "../rest/sitewhere-api-wrapper";

/** Interface for functional section */
export interface ISection {
  id: string;
  title: string;
  icon: string;
  route: string;
  longTitle: string;
  requireAll: string[];
}

/** Interface for toolbar action */
export interface IAction {
  id: "logout";
  title: "Log Out";
  icon: "power-off";
}

@Component({
  components: {
    Navigation,
    ErrorBanner
  }
})
export default class DeviceTypeSelector extends Vue {
  drawer: boolean = true;
  sections: ISection[] = [
    {
      id: "tenants",
      title: "Manage Tenants",
      icon: "layer-group",
      route: "system/tenants",
      longTitle: "Manage System Tenants",
      requireAll: ["ADMINISTER_TENANTS"]
    },
    {
      id: "users",
      title: "Manage Users",
      icon: "users",
      route: "system/users",
      longTitle: "Manage System Users",
      requireAll: ["ADMINISTER_USERS"]
    },
    {
      id: "global",
      title: "Global Microservices",
      icon: "globe",
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
  onSectionClicked(section: ISection) {
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
.call-progress {
  position: fixed;
  height: 100px;
  z-index: 1000;
}
</style>
