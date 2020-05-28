<template>
  <v-app v-if="tenant">
    <in-app-system-bar style="-webkit-app-region: drag" />
    <v-navigation-drawer :width="300" style="margin-top: 25px;" v-model="drawer" app>
      <v-toolbar color="#fff" class="elevation-1" style="height: 47px;" dense>
        <div class="tenant-logo" :style="tenantLogoStyle" />
        <v-spacer />
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn small v-on="on" class="ma-0" icon @click="onInstanceSettings" slot="activator">
              <v-icon class="grey--text text--darken-1">settings</v-icon>
            </v-btn>
          </template>
          <span>Instance Settings</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn small v-on="on" class="ma-0 ml-1" icon @click="onLogOut" slot="activator">
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

import { AxiosResponse } from "axios";
import { Component } from "vue-property-decorator";
import {
  IAction,
  INavigationSection,
  getTenant,
  handleError,
  getJwt,
  NavigationIcon
} from "sitewhere-ide-common";
import {
  InAppSystemBar,
  InAppFooter,
  Navigation
} from "sitewhere-ide-components";
import Copyright from "../Copyright.vue";
import Notifications from "../common/Notifications.vue";

import { ITenant, ITenantResponseFormat } from "sitewhere-rest-api";

@Component({
  components: {
    InAppSystemBar,
    Navigation,
    InAppFooter,
    Copyright,
    Notifications
  }
})
export default class TenantAdministration extends Vue {
  tenant!: ITenant;
  tenantToken!: string;
  drawer = true;
  sections: INavigationSection[] = [
    {
      id: "deviceGroup",
      title: "Device Management",
      icon: NavigationIcon.Device,
      route: "devices",
      longTitle: "Manage Devices",
      subsections: [
        {
          id: "devicetypes",
          title: "Device Types",
          icon: NavigationIcon.DeviceType,
          route: "devicetypes",
          longTitle: "Manage Device Types"
        },
        {
          id: "devices",
          title: "Devices",
          icon: NavigationIcon.Device,
          route: "devices",
          longTitle: "Manage Devices"
        },
        {
          id: "assignments",
          title: "Device Assignments",
          icon: NavigationIcon.DeviceAssignment,
          route: "assignments",
          longTitle: "Manage Assignments"
        },
        {
          id: "groups",
          title: "Device Groups",
          icon: NavigationIcon.DeviceGroup,
          route: "groups",
          longTitle: "Manage Device Groups"
        }
      ]
    },
    {
      id: "customersGroup",
      title: "Customer Management",
      icon: NavigationIcon.Customer,
      route: "customers",
      longTitle: "Manage Customers",
      subsections: [
        {
          id: "customertypes",
          title: "Customer Types",
          icon: NavigationIcon.CustomerType,
          route: "customertypes",
          longTitle: "Manage Customer Types"
        },
        {
          id: "customers",
          title: "Customers",
          icon: NavigationIcon.Customer,
          route: "customers",
          longTitle: "Manage Customers"
        }
      ]
    },
    {
      id: "areasGroup",
      title: "Area Management",
      icon: NavigationIcon.Area,
      route: "areas",
      longTitle: "Manage Areas",
      subsections: [
        {
          id: "areatypes",
          title: "Area Types",
          icon: NavigationIcon.AreaType,
          route: "areatypes",
          longTitle: "Manage Area Types"
        },
        {
          id: "areas",
          title: "Areas",
          icon: NavigationIcon.Area,
          route: "areas",
          longTitle: "Manage Areas"
        }
      ]
    },
    {
      id: "assetGroup",
      title: "Asset Management",
      icon: NavigationIcon.Asset,
      route: "assets",
      longTitle: "Manage Assets",
      subsections: [
        {
          id: "assettypes",
          title: "Asset Types",
          icon: NavigationIcon.AssetType,
          route: "assettypes",
          longTitle: "Manage Asset Types"
        },
        {
          id: "assets",
          title: "Assets",
          icon: NavigationIcon.Asset,
          route: "assets",
          longTitle: "Manage Assets"
        }
      ]
    },
    {
      id: "batch",
      title: "Batch Operations",
      icon: NavigationIcon.BatchOperation,
      route: "batch",
      longTitle: "Manage Batch Operations"
    },
    {
      id: "schedules",
      title: "Schedules",
      icon: NavigationIcon.Schedule,
      route: "schedules",
      longTitle: "Manage Schedules"
    }
  ];
  userActions: IAction[] = [
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
  ];

  created() {
    // Set up JWT auto-refresh.
    this.refreshJwt();

    // Verify that user is logged in.
    const user = this.$store.getters.user;
    if (!user) {
      this.onLogOut();
      return;
    }

    // Verify that a tenant token was specified in the route.
    const tenantToken = this.$route.params.tenantToken;
    if (!tenantToken) {
      this.onLogOut();
      return;
    }
    this.tenantToken = tenantToken;

    // Load tenant if tenant id changed or not already loaded.
    const tenant = this.$store.getters.selectedTenant;
    if (!tenant || tenant.token !== this.tenantToken) {
      this.loadTenant();
    } else {
      this.tenant = tenant;
      console.log(tenant);
      this.onSectionClicked(this.$data.sections[0]);
    }
  }

  /** Set tenant logo in style */
  get tenantLogoStyle(): {} {
    return {
      backgroundImage: this.tenant ? "url(" + this.tenant.imageUrl + ")" : ""
    };
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
    this.$router.push("/tenants/" + this.tenantToken + "/" + section.route);
  }

  // Called when user requests log out.
  onLogOut() {
    this.$store.commit("logOut");
    this.$router.push("/");
  }

  /** Load tenant based on tenant id */
  async loadTenant() {
    try {
      const format: ITenantResponseFormat = {};
      const response: AxiosResponse<ITenant> = await getTenant(
        this.$store,
        this.tenantToken,
        format
      );
      this.onTenantLoaded(response.data);
    } catch (err) {
      console.log(
        "Unable to load tenant " + this.tenantToken + ". Logging out!"
      );
      this.onLogOut();
    }
  }

  /** Called after tenant is loaded */
  onTenantLoaded(tenant: ITenant) {
    this.tenant = tenant;
    console.log(this.tenant);
    this.$store.commit("selectedTenant", tenant);

    // Select first section from list.
    this.onSectionClicked(this.$data.sections[0]);
  }

  /** Route to instance settings */
  onInstanceSettings() {
    this.$router.push("/system");
  }

  // Set up timer for reloading JWT.
  async refreshJwt() {
    const component = this;
    try {
      const response: AxiosResponse<any> = await getJwt(this.$store);
      console.log("Refreshed JWT.");
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
.tenant-logo {
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
