<template>
  <v-app v-if="user">
    <error-banner :error="error"></error-banner>
    <v-navigation-drawer fixed dark mini-variant.sync="false" v-model="drawer" app>
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
      <v-toolbar-side-icon class="grey--text" @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
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
  </v-app>
</template>

<script>
import Navigation from "../common/Navigation";
import ErrorBanner from "../common/ErrorBanner";

import { getJwt } from "../../rest/sitewhere-api-wrapper";
import { getTenant } from "../../rest/sitewhere-tenants-api";

export default {
  data: () => ({
    drawer: true,
    tenantToken: null,
    sections: [
      {
        id: "customersGroup",
        title: "Customer Management",
        icon: "account_balance",
        route: "customers",
        longTitle: "Manage Customers",
        subsections: [
          {
            id: "customertypes",
            title: "Customer Types",
            icon: "settings",
            route: "customertypes",
            longTitle: "Manage Customer Types"
          },
          {
            id: "customers",
            title: "Customers",
            icon: "account_balance",
            route: "customers",
            longTitle: "Manage Customers"
          }
        ]
      },
      {
        id: "areasGroup",
        title: "Area Management",
        icon: "collections",
        route: "areas",
        longTitle: "Manage Areas",
        subsections: [
          {
            id: "areatypes",
            title: "Area Types",
            icon: "settings",
            route: "areatypes",
            longTitle: "Manage Area Types"
          },
          {
            id: "areas",
            title: "Areas",
            icon: "collections",
            route: "areas",
            longTitle: "Manage Areas"
          }
        ]
      },
      {
        id: "deviceGroup",
        title: "Device Management",
        icon: "developer_board",
        route: "devices",
        longTitle: "Manage Devices",
        subsections: [
          {
            id: "devicetypes",
            title: "Device Types",
            icon: "settings",
            route: "devicetypes",
            longTitle: "Manage Device Types"
          },
          {
            id: "devices",
            title: "Devices",
            icon: "developer_board",
            route: "devices",
            longTitle: "Manage Devices"
          },
          {
            id: "groups",
            title: "Device Groups",
            icon: "apps",
            route: "groups",
            longTitle: "Manage Device Groups"
          }
        ]
      },
      {
        id: "assetGroup",
        title: "Asset Management",
        icon: "link",
        route: "assets",
        longTitle: "Manage Assets",
        subsections: [
          {
            id: "assettypes",
            title: "Asset Types",
            icon: "settings",
            route: "assettypes",
            longTitle: "Manage Asset Types"
          },
          {
            id: "assets",
            title: "Assets",
            icon: "link",
            route: "assets",
            longTitle: "Manage Assets"
          }
        ]
      },
      {
        id: "batch",
        title: "Batch Operations",
        icon: "view_module",
        route: "batch",
        longTitle: "Manage Batch Operations"
      },
      {
        id: "schedules",
        title: "Schedules",
        icon: "access_alarm",
        route: "schedules",
        longTitle: "Manage Schedules"
      }
    ],
    userActions: [
      {
        id: "sysadmin",
        title: "System Administration",
        icon: "cog"
      },
      {
        id: "logout",
        title: "Log Out",
        icon: "power-off"
      }
    ],
    right: null
  }),

  components: {
    Navigation,
    ErrorBanner
  },

  computed: {
    // Get loggied in user.
    user: function() {
      return this.$store.getters.user;
    },
    // Get currently selected section.
    section: function() {
      return this.$store.getters.currentSection;
    },
    fullname: function() {
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
    },

    // Get global loading indicator.
    loading: function() {
      return this.$store.getters.loading;
    },

    // Get global error indicator.
    error: function() {
      return this.$store.getters.error;
    }
  },

  created: function() {
    // Set up JWT auto-refresh.
    this.refreshJwt();

    // Verify that user is logged in.
    var user = this.$store.getters.user;
    if (!user) {
      this.onLogOut();
      return;
    }

    // Verify that a tenant token was specified in the route.
    var tenantToken = this.$route.params.tenantToken;
    if (!tenantToken) {
      this.onLogOut();
      return;
    }
    this.$data.tenantToken = tenantToken;

    // Load tenant if tenant id changed or not already loaded.
    var tenant = this.$store.getters.selectedTenant;
    if (!tenant || tenant.token !== tenantToken) {
      this.onLoadTenant(tenantToken);
    } else {
      // Select first section from list.
      this.onSectionClicked(this.$data.sections[0]);
    }
  },

  methods: {
    // Load tenant based on tenant id.
    onLoadTenant: function(tenantToken) {
      var component = this;

      // Make api call to load tenant.
      getTenant(this.$store, tenantToken)
        .then(function(response) {
          component.onTenantLoaded(response.data);
        })
        .catch(function(e) {
          console.log(
            "Unable to load tenant " + tenantToken + ". Logging out!"
          );
          component.onLogOut();
        });
    },
    // Called after tenant is loaded.
    onTenantLoaded: function(tenant) {
      this.$store.commit("selectedTenant", tenant);

      // Select first section from list.
      this.onSectionClicked(this.$data.sections[0]);
    },
    // Called when a section is clicked.
    onSectionClicked: function(section) {
      this.$store.commit("currentSection", section);
      this.$router.push(
        "/tenants/" + this.$data.tenantToken + "/" + section.route
      );
    },
    onUserAction: function(action) {
      if (action.id === "logout") {
        this.onLogOut();
      } else if (action.id === "sysadmin") {
        this.$router.push("/system");
      }
    },
    // Called when user requests log out.
    onLogOut: function() {
      console.log("Logging out!");
      this.$store.commit("logOut");
      this.$router.push("/");
    },

    // Set up timer for reloading JWT.
    refreshJwt: function() {
      var component = this;
      getJwt(this.$store)
        .then(function(response) {
          console.log("Refreshed JWT.");
          var jwt = response.headers["x-sitewhere-jwt"];
          component.$store.commit("jwt", jwt);
          setTimeout(function() {
            component.refreshJwt();
          }, 1000 * 60 * 5);
        })
        .catch(function(e) {
          console.log("Could not update JWT.");
          console.log(e);
          component.onLogOut();
        });
    }
  }
};
</script>

<style scoped>
.call-progress {
  position: fixed;
  height: 100px;
  z-index: 1000;
}
</style>
