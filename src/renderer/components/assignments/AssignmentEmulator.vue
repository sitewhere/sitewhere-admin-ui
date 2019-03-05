<template>
  <div v-if="assignment">
    <v-app>
      <assignment-list-panel :assignment="assignment" headerMode="false"></assignment-list-panel>
      <v-card>
        <v-tabs v-model="active">
          <v-tabs-bar dark color="primary">
            <v-tabs-item key="emulator" href="#emulator">Emulator</v-tabs-item>
            <v-tabs-item key="mqtt" href="#mqtt">MQTT Settings</v-tabs-item>
            <v-spacer></v-spacer>
            <navigation-action-button
              icon="exclamation-triangle"
              tooltip="Add Alert"
              @action="onAddAlertClicked"
            />
            <navigation-action-button
              icon="crosshairs"
              tooltip="Add Location"
              @action="onEnterAddLocationMode"
            />
            <navigation-action-button
              icon="crosshairs"
              tooltip="Pan to Last Location"
              @action="onPanToLastLocation"
            />
            <navigation-action-button
              icon="thermometer-full"
              tooltip="Add Measurements"
              @action="onAddMeasurementsClicked"
            />
            <v-tabs-slider></v-tabs-slider>
          </v-tabs-bar>
          <v-tabs-items>
            <v-tabs-content key="emulator" id="emulator" :lazy="true">
              <div>
                <assignment-emulator-map
                  ref="map"
                  :assignment="assignment"
                  height="800px"
                  @location="onLocationClicked"
                ></assignment-emulator-map>
                <v-card
                  class="mqtt-overlay"
                  raised
                  color="green darken-2 white--text"
                  v-if="mqttConnected"
                >
                  <v-card-text class="pa-2">
                    <font-awesome-icon class="mr-2" icon="plug" size="lg"/>MQTT Connected
                  </v-card-text>
                </v-card>
                <v-card class="mqtt-overlay" raised color="red darken-2 white--text" v-else>
                  <v-card-text class="pa-2">
                    <font-awesome-icon class="mr-2" icon="plug" size="lg"/>MQTT Disconnected
                  </v-card-text>
                </v-card>
              </div>
            </v-tabs-content>
            <v-tabs-content key="mqtt" id="mqtt">
              <v-card flat>
                <v-card-text>
                  <v-container fluid>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-text-field
                          class="mt-1"
                          label="MQTT Hostname"
                          v-model="mqttHostname"
                          prepend-icon="storage"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-text-field
                          class="mt-1"
                          label="MQTT Port"
                          v-model="mqttPort"
                          prepend-icon="storage"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-text-field
                          class="mt-1"
                          label="MQTT Topic"
                          v-model="mqttTopic"
                          prepend-icon="compare_arrows"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-tabs-content>
          </v-tabs-items>
        </v-tabs>
      </v-card>
      <location-create-dialog ref="locationCreate" :token="token" @locationAdded="onLocationAdded"></location-create-dialog>
      <measurements-create-dialog
        ref="mxCreate"
        :token="token"
        @locationAdded="onMeasurementsAdded"
      ></measurements-create-dialog>
      <alert-create-dialog ref="alertCreate" :token="token" @locationAdded="onAlertAdded"></alert-create-dialog>
    </v-app>
  </div>
</template>

<script>
import MQTT from "mqtt";
import AssignmentListPanel from "./AssignmentListPanel";
import AssignmentEmulatorMap from "./AssignmentEmulatorMap";
import LocationCreateDialog from "./LocationCreateDialog";
import MeasurementsCreateDialog from "./MeasurementsCreateDialog";
import AlertCreateDialog from "./AlertCreateDialog";
import NavigationActionButton from "../common/NavigationActionButton";

import { getDeviceAssignment } from "../../rest/sitewhere-device-assignments-api";

export default {
  data: () => ({
    token: null,
    assignment: null,
    mqttClient: null,
    mqttHostname: "localhost",
    mqttPort: 1883,
    mqttTopic: "SiteWhere/default/input/json",
    mqttConnected: false,
    swUsername: "admin",
    swPassword: "password",
    active: null,
    mapVisible: true
  }),

  components: {
    AssignmentListPanel,
    AssignmentEmulatorMap,
    LocationCreateDialog,
    MeasurementsCreateDialog,
    AlertCreateDialog,
    NavigationActionButton
  },

  created: function() {
    this.$data.token = this.$route.params.token;
    this.refresh();
  },

  mounted: function() {
    this.$data.mqttHostname = this.$el.ownerDocument.location.host;
  },

  watch: {
    // Monitor MQTT connection.
    mqttConnected: function(value) {
      console.log("MQTT connected " + value);
    },
    mqttHostname: function(value) {
      this.establishMqttConnection();
    },
    mqttPort: function(value) {
      this.establishMqttConnection();
    },
    mqttTopic: function(value) {
      this.establishMqttConnection();
    }
  },

  methods: {
    // Get map reference.
    getMap: function() {
      return this.$refs.map;
    },

    // Get location create dialog reference.
    getLocationCreateDialog: function() {
      return this.$refs.locationCreate;
    },

    // Get location create dialog reference.
    getMeasurementsCreateDialog: function() {
      return this.$refs.mxCreate;
    },

    // Get alert create dialog reference.
    getAlertCreateDialog: function() {
      return this.$refs.alertCreate;
    },

    // Called to refresh data.
    refresh: function() {
      var token = this.$data.token;
      var component = this;

      // Load site information.
      getDeviceAssignment(this.$store, token)
        .then(function(response) {
          component.onAssignmentLoaded(response.data);
        })
        .catch(function(e) {});
    },

    // Called after data is loaded.
    onAssignmentLoaded: function(assignment) {
      this.$data.assignment = assignment;
      var section = {
        id: "emulator",
        title: "Assignment Emulator",
        icon: "link",
        route: "/admin/assignments/" + assignment.token + "/emulator",
        longTitle: "Emulate Assignment: " + assignment.token
      };
      this.$store.commit("currentSection", section);

      // Connect to MQTT broker with current settings.
      this.establishMqttConnection();
    },

    // Called when a map location is clicked.
    onLocationClicked: function(e) {
      let payload = {
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
        elevation: 0.0
      };
      this.getLocationCreateDialog().onOpenDialog();
      this.getLocationCreateDialog().load(payload);
    },

    // Called after a location has been added.
    onLocationAdded: function() {
      var component = this;

      // Wait for data to become available.
      setTimeout(function() {
        component.getMap().refreshLocations();
      }, 1000);
    },

    // Called after measurements have been added.
    onMeasurementsAdded: function() {},

    // Called after alert has been added.
    onAlertAdded: function() {
      console.log("Alert added.");
    },

    // Asks map to pan to last recorded location.
    onPanToLastLocation: function() {
      this.getMap().panToLastLocation();
    },

    // Puts map in mode for adding location.
    onEnterAddLocationMode: function() {
      this.getMap().enterAddLocationMode();
    },

    // Called when button for adding mx is clicked.
    onAddMeasurementsClicked: function() {
      this.getMeasurementsCreateDialog().onOpenDialog();
    },

    // Called when button for adding alert is clicked.
    onAddAlertClicked: function() {
      this.getAlertCreateDialog().onOpenDialog();
    },

    // Establish connection with MQTT broker.
    establishMqttConnection: function() {
      var component = this;

      let mqttClient = this.$data.mqttClient;
      let mqttConnected = this.$data.mqttConnected;

      // Kill any existing connection.
      if (mqttClient && mqttConnected) {
        this.killMqttConnection();
      }

      // Build URL based on form data.
      let url = "mqtt://" + this.$data.mqttHostname + ":" + this.$data.mqttPort;
      console.log(`Connecting to MQTT via ${url}`);

      mqttClient = MQTT.connect(url);
      mqttClient.on("connect", function() {
        component.$data.mqttConnected = true;
        mqttClient.subscribe(component.$data.mqttTopic);
      });
      this.$data.mqttClient = mqttClient;
    },
    killMqttConnection: function() {
      mqttClient.end();
      this.$data.mqttConnected = false;
    }
  }
};
</script>

<style scoped>
.mqtt-overlay {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
}
</style>
