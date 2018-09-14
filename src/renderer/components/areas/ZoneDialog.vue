<template>
  <span>
    <base-dialog :title="title" :width="width" :visible="dialogVisible"
      :createLabel="createLabel" :cancelLabel="cancelLabel" :error="error"
      @createClicked="onCreateClicked" @cancelClicked="onCancelClicked">
      <v-tabs v-model="active">
        <v-tabs-bar dark color="primary">
          <v-tabs-item key="settings" href="#settings">
            Zone Settings
          </v-tabs-item>
          <v-tabs-item key="metadata" href="#metadata">
            Metadata
          </v-tabs-item>
          <v-tabs-slider></v-tabs-slider>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content key="settings" id="settings" :lazy="true">
            <v-card flat>
              <v-card-text>
                <map-with-zone-overlay-panel height='370px' :area='area'
                  :editedZoneToken='zoneToken' :bounds="zoneBounds"
                  :borderColor="zoneBorder" :fillColor="zoneFill"
                  :fillOpacity="zoneOpacity" @boundsUpdated="onBoundsUpdated">
                </map-with-zone-overlay-panel>
              </v-card-text>
              <v-card-text>
                <v-container fluid class="pt-0 pb-0 mr-2">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-text-field required class="mt-1" label="Token"
                        v-model="zoneToken" hide-details prepend-icon="info">
                      </v-text-field>
                      <div class="verror">
                        <span v-if="!$v.zoneToken.required && $v.$dirty">Zone token is required.</span>
                        <span v-if="!$v.zoneToken.validToken && $v.$dirty">Zone token is not valid.</span>
                      </div>
                    </v-flex>
                    <v-flex xs8>
                      <v-text-field required hide-details label="Zone name" 
                        v-model="zoneName" prepend-icon="info"></v-text-field>
                      <div class="verror">
                        <span v-if="$v.zoneName.$invalid && $v.$dirty">Zone name is required.</span>
                      </div>
                     </v-flex>
                    <v-flex xs2 pa-2>
                      <color-picker text="Border" v-model="zoneBorder">
                      </color-picker>
                    </v-flex>
                    <v-flex xs2 pa-2>
                      <color-picker text="Fill" v-model="zoneFill"
                        @opacityChanged="onFillOpacityUpdated">
                      </color-picker>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tabs-content>
          <v-tabs-content key="metadata" id="metadata">
            <metadata-panel :metadata="metadata"
              @itemDeleted="onMetadataDeleted" @itemAdded="onMetadataAdded"/>
          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>
    </base-dialog>
  </span>
</template>

<script>
import Utils from "../common/Utils";
import BaseDialog from "../common/BaseDialog";
import MetadataPanel from "../common/MetadataPanel";
import ColorPicker from "../common/ColorPicker";
import MapWithZoneOverlayPanel from "./MapWithZoneOverlayPanel";
import { required, helpers } from "vuelidate/lib/validators";

const validToken = helpers.regex("validToken", /^[a-zA-Z0-9-_]+$/);

export default {
  data: () => ({
    active: null,
    dialogVisible: false,
    zoneToken: null,
    zoneName: "",
    zoneBounds: [],
    zoneBorder: "#333333",
    zoneFill: "#dc0000",
    zoneOpacity: 1,
    metadata: [],
    error: null
  }),

  validations: {
    zoneToken: {
      required,
      validToken
    },
    zoneName: {
      required
    }
  },

  components: {
    BaseDialog,
    MetadataPanel,
    ColorPicker,
    MapWithZoneOverlayPanel
  },

  props: ["area", "title", "width", "createLabel", "cancelLabel", "mode"],

  methods: {
    // Generate payload from UI.
    generatePayload: function() {
      var payload = {};
      payload.token = this.$data.zoneToken;
      payload.areaToken = this.area.token;
      payload.name = this.$data.zoneName;
      payload.bounds = this.$data.zoneBounds;
      payload.borderColor = this.$data.zoneBorder;
      payload.fillColor = this.$data.zoneFill;
      payload.opacity = this.$data.zoneOpacity;
      payload.metadata = Utils.arrayToMetadata(this.$data.metadata);
      return payload;
    },

    // Reset dialog contents.
    reset: function(e) {
      this.$data.zoneToken = null;
      this.$data.zoneName = "";
      this.$data.zoneBounds = [];
      this.$data.zoneBorder = "#333333";
      this.$data.zoneFill = "#dc0000";
      this.$data.zoneOpacity = 1.0;
      this.$data.metadata = [];
      this.$data.active = "settings";
      this.$v.$reset();
    },

    // Load dialog from a given payload.
    load: function(payload) {
      this.reset();
      if (payload) {
        this.$data.zoneToken = payload.token;
        this.$data.zoneName = payload.name;
        this.$data.zoneBounds = payload.bounds;
        this.$data.zoneBorder = payload.borderColor;
        this.$data.zoneFill = payload.fillColor;
        this.$data.zoneOpacity = payload.opacity;
        this.$data.metadata = Utils.metadataToArray(payload.metadata);
      }
    },

    // Called to open the dialog.
    openDialog: function() {
      this.$data.dialogVisible = true;
    },

    // Called to open the dialog.
    closeDialog: function() {
      this.$data.dialogVisible = false;
    },

    // Called to show an error message.
    showError: function(error) {
      this.$data.error = error;
    },

    // Called when zone bounds are updated.
    onBoundsUpdated: function(bounds) {
      this.$data.zoneBounds = bounds;
    },

    // Called when zone opacity value is updated.
    onFillOpacityUpdated: function(opacity) {
      this.$data.zoneOpacity = opacity;
    },

    // Called after create button is clicked.
    onCreateClicked: function(e) {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      var payload = this.generatePayload();
      this.$emit("payload", payload);
    },

    // Called after cancel button is clicked.
    onCancelClicked: function(e) {
      this.$data.dialogVisible = false;
    },

    // Called when a metadata entry has been deleted.
    onMetadataDeleted: function(name) {
      var metadata = this.$data.metadata;
      for (var i = 0; i < metadata.length; i++) {
        if (metadata[i].name === name) {
          metadata.splice(i, 1);
        }
      }
    },

    // Called when a metadata entry has been added.
    onMetadataAdded: function(entry) {
      var metadata = this.$data.metadata;
      metadata.push(entry);
    }
  }
};
</script>

<style scoped>
</style>
