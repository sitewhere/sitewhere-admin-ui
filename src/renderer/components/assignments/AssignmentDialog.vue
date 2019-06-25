<template>
  <div>
    <base-dialog
      :title="title"
      :width="width"
      :visible="dialogVisible"
      :createLabel="createLabel"
      :cancelLabel="cancelLabel"
      :error="error"
      @createClicked="onCreateClicked"
      @cancelClicked="onCancelClicked"
      hideButtons="true"
    >
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step step="1" :complete="firstPageComplete">Customer Assignment</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" :complete="secondPageComplete">Area Assignment</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3" :complete="thirdPageComplete">Asset Assignment</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4">
            Metadata
            <small>Optional</small>
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-content step="1">
          <v-card flat>
            <v-card-text>
              <v-checkbox
                label="Assign device to a customer?"
                v-model="assnAssociateCustomer"
                light
              ></v-checkbox>
              <customer-chooser
                v-if="assnAssociateCustomer"
                notChosenText="Choose a customer below for assignment:"
                chosenText="The customer below will be assigned:"
                :selectedToken="assnCustomerToken"
                @customerUpdated="onCustomerUpdated"
              ></customer-chooser>
            </v-card-text>
          </v-card>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="onCancelClicked">{{ cancelLabel }}</v-btn>
            <v-btn :disabled="!firstPageComplete" flat @click="step = 2">
              Assign Area
              <v-icon light>keyboard_arrow_right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card flat>
            <v-card-text>
              <v-checkbox label="Assign device to an area?" v-model="assnAssociateArea" light></v-checkbox>
              <area-chooser
                v-if="assnAssociateArea"
                notChosenText="Choose an area below for assignment:"
                chosenText="The area below will be assigned:"
                :selectedToken="assnAreaToken"
                @areaUpdated="onAreaUpdated"
              ></area-chooser>
            </v-card-text>
          </v-card>
          <v-card-actions>
            <v-btn flat @click="step = 1">
              <v-icon light>keyboard_arrow_left</v-icon>Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn flat @click="onCancelClicked">{{ cancelLabel }}</v-btn>
            <v-btn :disabled="!firstPageComplete || !secondPageComplete" flat @click="step = 3">
              Assign Asset
              <v-icon light>keyboard_arrow_right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card flat>
            <v-card-text>
              <v-checkbox label="Assign device to an asset?" v-model="assnAssociateAsset" light></v-checkbox>
              <asset-chooser
                v-if="assnAssociateAsset"
                notChosenText="Choose an asset below for assignment:"
                chosenText="The asset below will be assigned:"
                :selectedToken="assnAssetToken"
                @assetUpdated="onAssetUpdated"
              ></asset-chooser>
            </v-card-text>
          </v-card>
          <v-card-actions>
            <v-btn flat @click="step = 2">
              <v-icon light>keyboard_arrow_left</v-icon>Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn flat @click="onCancelClicked">{{ cancelLabel }}</v-btn>
            <v-btn
              :disabled="!firstPageComplete || !secondPageComplete || !thirdPageComplete"
              flat
              @click="onCreateClicked"
            >{{ createLabel }}</v-btn>
            <v-btn
              :disabled="!firstPageComplete || !secondPageComplete || !thirdPageComplete"
              flat
              @click="step = 4"
            >
              Add Metadata
              <v-icon light>keyboard_arrow_right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-stepper-content>
        <v-stepper-content step="4">
          <metadata-panel
            class="mb-3"
            :metadata="metadata"
            @itemDeleted="onMetadataDeleted"
            @itemAdded="onMetadataAdded"
          />
          <v-card-actions>
            <v-btn flat @click="step = 2">
              <v-icon light>keyboard_arrow_left</v-icon>Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn flat @click="onCancelClicked">{{ cancelLabel }}</v-btn>
            <v-btn flat color="primary" @click="onCreateClicked">{{ createLabel }}</v-btn>
          </v-card-actions>
        </v-stepper-content>
      </v-stepper>
    </base-dialog>
  </div>
</template>

<script>
import { BaseDialog, MetadataPanel } from "sitewhere-ide-components";
import CustomerChooser from "../customers/CustomerChooser";
import AreaChooser from "../areas/AreaChooser";
import AssetChooser from "../assets/AssetChooser";

import { arrayToMetadata } from "../common/Utils";

export default {
  data: () => ({
    step: null,
    dialogVisible: false,
    assnAssociateCustomer: false,
    assnCustomerToken: null,
    assnAssociateArea: false,
    assnAreaToken: null,
    assnAssociateAsset: false,
    assnAssetToken: null,
    metadata: [],
    error: null
  }),

  components: {
    BaseDialog,
    MetadataPanel,
    CustomerChooser,
    AreaChooser,
    AssetChooser
  },

  props: ["deviceToken", "title", "width", "createLabel", "cancelLabel"],

  computed: {
    // Indicates if first page fields are filled in.
    firstPageComplete: function() {
      return this.$data.assnAssociateCustomer
        ? this.$data.assnCustomerToken != null
        : true;
    },
    // Indicates if second page fields are filled in.
    secondPageComplete: function() {
      return this.$data.assnAssociateArea
        ? this.$data.assnAreaToken != null
        : true;
    },
    // Indicates if third page fields are filled in.
    thirdPageComplete: function() {
      return this.$data.assnAssociateAsset
        ? this.$data.assnAssetToken != null
        : true;
    }
  },

  watch: {
    assnAssociateCustomer: function(value) {
      if (!value) {
        this.$data.assnCustomerToken = null;
      }
    },
    assnAssociateArea: function(value) {
      if (!value) {
        this.$data.assnAreaToken = null;
      }
    },
    assnAssociateAsset: function(value) {
      if (!value) {
        this.$data.assnAssetToken = null;
      }
    }
  },

  methods: {
    // Generate payload from UI.
    generatePayload: function() {
      var payload = {};
      payload.deviceToken = this.deviceToken;
      payload.customerToken = this.$data.assnCustomerToken;
      payload.areaToken = this.$data.assnAreaToken;
      payload.assetToken = this.$data.assnAssetToken;
      payload.metadata = arrayToMetadata(this.$data.metadata);
      return payload;
    },
    // Reset dialog contents.
    reset: function() {
      this.$data.assnAssociateCustomer = false;
      this.$data.assnCustomerToken = null;
      this.$data.assnAssociateArea = false;
      this.$data.assnAreaToken = null;
      this.$data.assnAssociateAsset = false;
      this.$data.assnAssetToken = null;
      this.$data.metadata = [];
      this.$data.step = 1;
      this.$data.error = null;
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
    // Called after create button is clicked.
    onCreateClicked: function(e) {
      var payload = this.generatePayload();
      this.$emit("payload", payload);
    },
    // Called after cancel button is clicked.
    onCancelClicked: function(e) {
      this.$data.dialogVisible = false;
    },
    // Called when customer is updated.
    onCustomerUpdated: function(customer) {
      if (customer) {
        this.$data.assnCustomerToken = customer.token;
      } else {
        this.$data.assnCustomerToken = null;
      }
    },
    // Called when area is updated.
    onAreaUpdated: function(area) {
      if (area) {
        this.$data.assnAreaToken = area.token;
      } else {
        this.$data.assnAreaToken = null;
      }
    },
    // Called when asset is updated.
    onAssetUpdated: function(asset) {
      if (asset) {
        this.$data.assnAssetToken = asset.token;
      } else {
        this.$data.assnAssetToken = null;
      }
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
