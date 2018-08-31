<template>
<v-app>
  <main>
    <div class="background">
      <div class="facets"></div>
      <div class="overlay"></div>
    </div>
    <div class="social">
      <div style="padding-top: 240px;">
        <social-button :settings="settings" type="Discord" 
          :svg="discordSvgContent" :title="discordTitle" 
          url="https://discord.gg/sq7sH7B" width="400" height="400">
        </social-button>
        <social-button :settings="settings" type="GitHub" 
          :svg="githubSvgContent" :title="githubTitle" 
          url="https://github.com/sitewhere/sitewhere" width="400" height="400">
        </social-button>
        <social-button :settings="settings" type="Website" 
          :svg="websiteSvgContent" :title="websiteTitle" 
          url="http://sitewhere.io/en/" width="400" height="400">
        </social-button>
        <social-button :settings="settings" type="Twitter" 
          :svg="twitterSvgContent" :title="twitterTitle" 
          url="https://twitter.com/sitewhere" width="400" height="400">
        </social-button>
      </div>
    </div>
    <v-container>
      <div style="width: 550px; margin-left: auto; margin-right: auto; position: relative; padding-top: 220px; padding-left: 50px;">
        <div class="sitewhere-logo"></div>
        <error-banner :error="error"></error-banner>
        <v-card-text class="ma-0 pa-1">
          <div style="width: 100%; text-align: center; color: #333; font-size: 35px; font-family: RobotoRegular">
            Instance Administration
          </div>
        </v-card-text>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 class="mb-2">
              <v-text-field hide-details label="Username" v-model="username">
              </v-text-field>
              <div class="verror">
                <span v-if="$v.username.$invalid && $v.$dirty">Username is required.</span>
              </div>
            </v-flex>
            <v-flex xs12 class="mb-4">
              <v-text-field hide-details label="Password" v-model="password"
                type="password">
              </v-text-field>
              <div class="verror">
                <span v-if="$v.password.$invalid && $v.$dirty">Password is required.</span>
              </div>
            </v-flex>
            <v-flex xs3 class="pr-3">
              <v-select required :items="protocols" v-model="protocol"
                label="Protocol"></v-select>
            </v-flex>
            <v-flex xs5 class="pr-3">
              <v-text-field hide-details label="Server" v-model="server">
              </v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field hide-details label="Port" type="number"
                v-model="port">
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="pr-2">
          <v-spacer></v-spacer>
          <v-btn type="submit" primary dark @click.native="onLogin" :loading="loggingIn">
            Login
          </v-btn>
        </v-card-actions>
        <v-dialog v-model="noserver" max-width="300">
          <v-card>
            <v-card-title class="headline">Instance Not Available</v-card-title>
            <v-card-text>The server location specified could not be contacted. Verify that
              you have started a SiteWhere instance and the microservices have
              started successfully.
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn primary flat @click.native="noserver = false">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </main>
</v-app>
</template>

<script>
import ErrorBanner from "./common/ErrorBanner";
import SocialButton from "./SocialButton";
import { required } from "vuelidate/lib/validators";
import { _getJwt, _getUser } from "../http/sitewhere-api-wrapper";
import { Settings } from "../libraries/Settings.ts";
import { GoogleAnalytics } from "../libraries/GoogleAnalytics.ts";

export default {
  data: () => ({
    noserver: false,
    error: null,
    username: "",
    password: "",
    protocol: null,
    server: null,
    port: null,
    protocols: [
      {
        text: "http",
        value: "http"
      },
      {
        text: "https",
        value: "https"
      }
    ],
    loggingIn: false,
    settings: null,
    discordSvgContent:
      '<path d="M137,134c-8.15,0-14.58,7.15-14.58,15.87S129,165.72,137,165.72s14.59-7.15,14.59-15.87S145.14,134,137,134Zm52.2,0c-8.15,0-14.59,7.15-14.59,15.87s6.58,15.87,14.59,15.87,14.58-7.15,14.58-15.87S197.34,134,189.19,134Z" transform="translate(-32.75 -17)"/><path class="cls-1" d="M315.49,17H70.26A37.61,37.61,0,0,0,32.75,54.7V302.11a37.6,37.6,0,0,0,37.51,37.7H277.79L268.09,306l23.42,21.77,22.15,20.5L353,383V54.7A37.61,37.61,0,0,0,315.49,17ZM244.85,256s-6.59-7.87-12.08-14.82c24-6.78,33.12-21.78,33.12-21.78a104.88,104.88,0,0,1-21,10.8,120.4,120.4,0,0,1-26.54,7.86,128.13,128.13,0,0,1-47.4-.18A153.38,153.38,0,0,1,144,230a106.78,106.78,0,0,1-13.36-6.22c-.54-.37-1.09-.55-1.64-.91a2.6,2.6,0,0,1-.73-.55c-3.3-1.83-5.13-3.11-5.13-3.11s8.79,14.64,32,21.59c-5.49,6.95-12.26,15.19-12.26,15.19-40.45-1.28-55.82-27.82-55.82-27.82,0-58.92,26.35-106.69,26.35-106.69,26.35-19.76,51.43-19.21,51.43-19.21l1.83,2.19c-32.94,9.52-48.13,24-48.13,24s4-2.2,10.79-5.31c19.58-8.6,35.14-11,41.55-11.53a18.19,18.19,0,0,1,3.11-.36,154.68,154.68,0,0,1,37-.37,149.19,149.19,0,0,1,55.09,17.57s-14.46-13.73-45.57-23.24l2.56-2.93s25.07-.55,51.42,19.21c0,0,26.36,47.77,26.36,106.69C300.85,228.18,285.29,254.72,244.85,256Z" transform="translate(-32.75 -17)"/>',
    discordTitle: "Get Support on the SiteWhere Discord Server",
    websiteSvgContent:
      '<path class="cls-1" d="M183.73,297.47v-45.6h-38C154,276.05,167.77,293.2,183.73,297.47Z" transform="translate(-23 -26)"/><path class="cls-1" d="M137.29,189.73h46.44V158.67H141.31A173.49,173.49,0,0,0,137.29,189.73Z" transform="translate(-23 -26)"/><path class="cls-1" d="M141.31,236.33h42.42V205.27H137.29A173.49,173.49,0,0,0,141.31,236.33Z" transform="translate(-23 -26)"/><path class="cls-1" d="M276.61,143.13a101.62,101.62,0,0,0-41.54-36.73c7.53,10,13.75,22.47,18.3,36.73Z" transform="translate(-23 -26)"/><path class="cls-1" d="M145.68,143.13h38V97.54C167.77,101.8,154,119,145.68,143.13Z" transform="translate(-23 -26)"/><path class="cls-1" d="M125.58,158.67H98.27a99.91,99.91,0,0,0-7.44,31.06h30.93A183.58,183.58,0,0,1,125.58,158.67Z" transform="translate(-23 -26)"/><path class="cls-1" d="M147.93,106.4a101.49,101.49,0,0,0-41.54,36.73h23.27C134.2,128.87,140.43,116.37,147.93,106.4Z" transform="translate(-23 -26)"/><path class="cls-1" d="M106.39,251.87a101.35,101.35,0,0,0,41.54,36.73c-7.52-10-13.75-22.47-18.28-36.73Z" transform="translate(-23 -26)"/><path class="cls-1" d="M121.76,205.27H90.83a99.91,99.91,0,0,0,7.44,31.06h27.31A183.58,183.58,0,0,1,121.76,205.27Z" transform="translate(-23 -26)"/><path class="cls-1" d="M323.13,26H65.88A42.9,42.9,0,0,0,23,68.88V326.13A42.89,42.89,0,0,0,65.88,369H323.13A42.89,42.89,0,0,0,366,326.13V68.88A42.89,42.89,0,0,0,323.13,26ZM308,197.5v7.77h-.28A116.46,116.46,0,0,1,199.27,313.72V314H183.73v-.28A116.48,116.48,0,0,1,75.26,205.27H75V189.73h.26A116.51,116.51,0,0,1,183.73,81.26V81h15.54v.26A116.48,116.48,0,0,1,307.72,189.73H308Z" transform="translate(-23 -26)"/><path class="cls-1" d="M257.42,236.33h27.31a99.62,99.62,0,0,0,7.43-31.06H261.24A183.58,183.58,0,0,1,257.42,236.33Z" transform="translate(-23 -26)"/><path class="cls-1" d="M235.07,288.6a101.47,101.47,0,0,0,41.54-36.73H253.37C248.82,266.13,242.57,278.62,235.07,288.6Z" transform="translate(-23 -26)"/><path class="cls-1" d="M257.42,158.67a183.58,183.58,0,0,1,3.82,31.06h30.93a99.91,99.91,0,0,0-7.44-31.06Z" transform="translate(-23 -26)"/><path class="cls-1" d="M199.27,97.54v45.59h38C229,119,215.22,101.8,199.27,97.54Z" transform="translate(-23 -26)"/><path class="cls-1" d="M241.67,158.67h-42.4v31.06h46.44A174.37,174.37,0,0,0,241.67,158.67Z" transform="translate(-23 -26)"/><path class="cls-1" d="M199.27,251.87v45.6c15.95-4.27,29.71-21.42,38-45.6Z" transform="translate(-23 -26)"/><path class="cls-1" d="M245.71,205.27H199.27v31.06h42.4A171.66,171.66,0,0,0,245.71,205.27Z" transform="translate(-23 -26)"/>',
    websiteTitle: "Visit the SiteWhere Community Website",
    githubSvgContent:
      '<path d="M117.3,302.22q-1.8,2-4.5-.68-2.94-2.48-.9-4.28c1.2-1.35,2.7-1.13,4.5.68Q119.1,300.41,117.3,302.22Zm-9.46-13.74c1.35,1.8,1.35,3.22,0,4.28q-1.8,1.35-3.83-1.58c-1.35-1.95-1.35-3.31,0-4.06Q106,285.54,107.84,288.48ZM94.1,275a1.93,1.93,0,0,1-2.93.45c-1.5-.75-2-1.65-1.58-2.7.45-.75,1.43-.91,2.93-.45C94,273,94.55,273.91,94.1,275Zm7,7.66q-1.35,1.58-3.6-.68-2-2.47-.45-3.6,1.35-1.35,3.6.67Q102.66,281.5,101.08,282.62Zm29.06,25.23c-.6,1.8-2,2.25-4.28,1.35q-3.83-.9-2.93-3.38c.61-1.65,2-2.18,4.28-1.58C129.62,305,130.59,306.2,130.14,307.85Zm14.2,1.12c0,1.66-1.21,2.48-3.61,2.48-2.55.3-3.83-.52-3.83-2.48q0-2.48,3.61-2.47Q144.34,306,144.34,309Zm13.06-2.25c.3,1.5-.75,2.56-3.15,3.16s-3.76,0-4.06-1.81.75-2.92,3.16-3.38Q157,304.24,157.4,306.72ZM368,95.29V302.76c0,17.14-3.12,35.67-15.29,47.85S322.9,365,305.76,365H257.35a47.11,47.11,0,0,1-5.3-.22,18.65,18.65,0,0,1-4.21-1.08,5.93,5.93,0,0,1-3.46-3.13,13.89,13.89,0,0,1-1.08-5.94V303q0-21-11.24-30.68a148.63,148.63,0,0,0,22.16-3.89A88.45,88.45,0,0,0,274.53,260,60.51,60.51,0,0,0,292,245.6q7-8.53,11.45-22.7t4.43-32.52q0-26.15-17.07-44.52,8-19.67-1.73-44.09-6.06-1.93-17.51,2.38a116.35,116.35,0,0,0-19.88,9.51l-8.21,5.18a156.27,156.27,0,0,0-83,0q-3.47-2.37-9.19-5.83t-18-8.32q-12.32-4.86-18.59-2.92-9.51,24.42-1.51,44.09-17.07,18.38-17.07,44.52,0,18.38,4.43,32.42t11.34,22.69A58.24,58.24,0,0,0,129.3,260a88.33,88.33,0,0,0,20.32,8.43,148.49,148.49,0,0,0,22.15,3.89q-8.66,7.77-10.59,22.26a43,43,0,0,1-9.73,3.24,61.18,61.18,0,0,1-12.32,1.08A25.43,25.43,0,0,1,125,294.22a38.25,38.25,0,0,1-12-13.5,34.68,34.68,0,0,0-10.48-11.24q-6.37-4.32-10.7-5.19l-4.32-.65c-3,0-5.11.33-6.26,1s-1.52,1.48-1.09,2.49a12.29,12.29,0,0,0,2,3,15.88,15.88,0,0,0,2.81,2.59l1.51,1.08Q91.15,276,95.8,282a54.18,54.18,0,0,1,6.81,11l2.16,5a27.38,27.38,0,0,0,9.51,13.3,33.74,33.74,0,0,0,14.48,6.48,91.67,91.67,0,0,0,15,1.51,64.22,64.22,0,0,0,12-.75l5-.87q0,8.22.1,22.26c.08,9.37.11,14.26.11,14.7q0,4.75-2.38,7.24a8.4,8.4,0,0,1-4.75,2.81,58.8,58.8,0,0,1-7.13.32H98.29c-17.15,0-37.47-.42-49.65-12.59S36.05,319.9,36.05,302.76V95.29c0-17.15-1.38-37.47,10.79-49.65s34.3-12.59,51.45-12.59H305.76c17.14,0,37.47.42,49.65,12.59S368,78.14,368,95.29Z" transform="translate(-36 -33.05)"/>',
    githubTitle: "View Repository on GitHub",
    twitterSvgContent:
      '<path class="cls-1" d="M328.13,33H70.88A42.9,42.9,0,0,0,28,75.88V333.13A42.89,42.89,0,0,0,70.88,376H328.13A42.89,42.89,0,0,0,371,333.13V75.88A42.89,42.89,0,0,0,328.13,33ZM284.74,160.85c.08,1.89.08,3.78.08,5.66,0,58.06-44.25,125.11-125.11,125.11A125.13,125.13,0,0,1,92.4,272a86.28,86.28,0,0,0,10.46.6,88.2,88.2,0,0,0,54.62-18.87,44,44,0,0,1-41.07-30.53,43.94,43.94,0,0,0,19.81-.77A44.06,44.06,0,0,1,101,179.29v-.6a44.51,44.51,0,0,0,19.9,5.49,44.17,44.17,0,0,1-13.64-58.74,124.88,124.88,0,0,0,90.64,46,48.31,48.31,0,0,1-1.11-10,44,44,0,0,1,76.06-30.1,87.4,87.4,0,0,0,27.95-10.63A44.21,44.21,0,0,1,281.39,145a89.17,89.17,0,0,0,25.3-7A89.52,89.52,0,0,1,284.74,160.85Z" transform="translate(-28 -33)"/>',
    twitterTitle: "Follow SiteWhere on Twitter"
  }),

  validations: {
    username: {
      required
    },
    password: {
      required
    }
  },

  components: {
    ErrorBanner,
    SocialButton
  },

  created: function() {
    this.$data.protocol = this.$store.getters.protocol;
    this.$data.server = this.$store.getters.server;
    this.$data.port = this.$store.getters.port;
    this.getOrCreateSiteWhereSettings();
  },

  watch: {
    // Push protocol value to store.
    protocol: function(value) {
      this.$store.commit("protocol", value);
    },

    // Push server value to store.
    server: function(value) {
      this.$store.commit("server", value);
    },

    // Push port value to store.
    port: function(value) {
      this.$store.commit("port", value);
    }
  },

  computed: {
    // Get global error indicator.
    error: function() {
      return this.$store.getters.error;
    }
  },

  methods: {
    onLogin: function() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      var component = this;
      this.$data.loggingIn = true;

      var token = btoa(this.username + ":" + this.password);
      this.$store.commit("authToken", token);
      this.$store.commit("selectedTenant", null);

      _getJwt(this.$store)
        .then(function(response) {
          var jwt = response.headers["x-sitewhere-jwt"];
          component.$store.commit("jwt", jwt);
          component.onJwtAcquired();
          component.$data.loggingIn = false;
        })
        .catch(function(e) {
          component.$data.error = e;
          component.$data.loggingIn = false;
          if (e.message === "Network Error") {
            component.$data.noserver = true;
          }
        });
    },

    onJwtAcquired: function(jwt) {
      var component = this;
      this.$data.loggingIn = true;

      _getUser(this.$store, this.username)
        .then(function(response) {
          component.$store.commit("user", response.data);
          component.$router.push("/system");
          component.$data.loggingIn = false;
        })
        .catch(function(e) {
          component.$data.error = e;
          component.$data.loggingIn = false;
        });
    },

    // Load or create the SiteWhere settings file.
    getOrCreateSiteWhereSettings: function() {
      let settings = Settings.load();
      this.$data.settings = settings;
      this.$store.commit("settings", settings);
      GoogleAnalytics.sendStartupEvent(settings);
    }
  }
};
</script>

<style scoped>
.verror {
  color: #900;
  height: 12px;
}
.background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.social {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 15%;
}
.facets {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url("../assets/facets.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.overlay {
  position: absolute;
  top: 30px;
  right: 0;
  bottom: 30px;
  left: 0;
  background-image: url("../assets/overlay.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.sitewhere-logo {
  position: absolute;
  top: 0;
  left: 50px;
  right: 0;
  height: 165px;
  background-image: url("../assets/sitewhere-with-tagline.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: fill;
}
</style>
