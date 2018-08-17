<template>
  <div>
    <base-dialog :title="title" :width="width" :visible="dialogVisible"
      :createLabel="createLabel" :cancelLabel="cancelLabel" :error="error"
      @createClicked="onCreateClicked" @cancelClicked="onCancelClicked">
      <v-tabs v-model="active">
        <v-tabs-bar dark color="primary">
          <v-tabs-item key="details" href="#details">
            Area Details
          </v-tabs-item>
          <v-tabs-item key="bounds" href="#bounds">
            Area Bounds
          </v-tabs-item>
          <v-tabs-item key="metadata" href="#metadata">
            Metadata
          </v-tabs-item>
          <v-tabs-slider></v-tabs-slider>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content key="details" id="details">
            <v-card flat>
              <v-card-text>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-text-field class="mt-1" label="Area name" v-model="areaName" prepend-icon="info"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <area-type-selector v-model="areaTypeId"
                        @areaTypeUpdated="onAreaTypeUpdated">
                      </area-type-selector>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field class="mt-1" multi-line label="Description" v-model="areaDescription" prepend-icon="subject"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field class="mt-1" label="Image URL" v-model="areaImageUrl" prepend-icon="image"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
                </v-card-text>
            </v-card>
          </v-tabs-content>
          <v-tabs-content key="bounds" id="bounds" :lazy="true">
            <area-bounds-panel :bounds="areaBounds"
              @boundsUpdated="onBoundsUpdated"/>
          </v-tabs-content>
          <v-tabs-content key="metadata" id="metadata">
            <metadata-panel :metadata="metadata"
              @itemDeleted="onMetadataDeleted" @itemAdded="onMetadataAdded"/>
          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>
    </base-dialog>
  </div>
</template>

<script>
import Utils from '../common/Utils'
import MapUtils from './MapUtils'
import BaseDialog from '../common/BaseDialog'
import AreaTypeSelector from '../areatypes/AreaTypeSelector'
import AreaBoundsPanel from './AreaBoundsPanel'
import MetadataPanel from '../common/MetadataPanel'

export default {

  data: () => ({
    active: null,
    dialogVisible: false,
    areaTypeId: '',
    areaTypeToken: null,
    areaName: '',
    areaDescription: '',
    areaImageUrl: '',
    areaBounds: [],
    metadata: [],
    error: null
  }),

  components: {
    BaseDialog,
    AreaTypeSelector,
    AreaBoundsPanel,
    MetadataPanel
  },

  props: ['title', 'width', 'createLabel', 'cancelLabel', 'parentArea'],

  methods: {
    // Generate payload from UI.
    generatePayload: function () {
      var payload = {}
      payload.areaTypeToken = this.$data.areaTypeToken
      payload.parentAreaToken = this.parentArea ? this.parentArea.token : null
      payload.name = this.$data.areaName
      payload.description = this.$data.areaDescription
      payload.imageUrl = this.$data.areaImageUrl
      payload.bounds = this.$data.areaBounds
      payload.metadata = Utils.arrayToMetadata(this.$data.metadata)
      return payload
    },

    // Reset dialog contents.
    reset: function (e) {
      this.$data.areaTypeId = null
      this.$data.areaTypeToken = null
      this.$data.areaName = null
      this.$data.areaDescription = null
      this.$data.areaImageUrl = null
      this.$data.areaBounds = []
      this.$data.metadata = []
      this.$data.active = 'details'
    },

    // Load dialog from a given payload.
    load: function (payload) {
      this.reset()

      if (payload) {
        this.$data.areaTypeId = payload.areaType.id
        this.$data.areaTypeToken = payload.areaType.token
        this.$data.areaName = payload.name
        this.$data.areaDescription = payload.description
        this.$data.areaImageUrl = payload.imageUrl
        this.$data.areaBounds = payload.bounds
        this.$data.metadata = Utils.metadataToArray(payload.metadata)
      }
    },

    // Called to open the dialog.
    openDialog: function () {
      this.$data.dialogVisible = true
    },

    // Called to open the dialog.
    closeDialog: function () {
      this.$data.dialogVisible = false
    },

    // Called to show an error message.
    showError: function (error) {
      this.$data.error = error
    },

    // Called when area type is updated.
    onAreaTypeUpdated: function (areaType) {
      this.$data.areaTypeToken = areaType ? areaType.token : null
    },

    // Called after create button is clicked.
    onCreateClicked: function (e) {
      var payload = this.generatePayload()
      this.$emit('payload', payload)
    },

    // Called after cancel button is clicked.
    onCancelClicked: function (e) {
      this.$data.dialogVisible = false
    },

    // Called when area bounds are updated.
    onBoundsUpdated: function (updated) {
      if (updated) {
        let swBounds = MapUtils.leafletToSwBounds(updated)
        this.$data.areaBounds = swBounds
      } else {
        this.$data.areaBounds = null
      }
    },

    // Called when a metadata entry has been deleted.
    onMetadataDeleted: function (name) {
      var metadata = this.$data.metadata
      for (var i = 0; i < metadata.length; i++) {
        if (metadata[i].name === name) {
          metadata.splice(i, 1)
        }
      }
    },

    // Called when a metadata entry has been added.
    onMetadataAdded: function (entry) {
      var metadata = this.$data.metadata
      metadata.push(entry)
    }
  }
}
</script>

<style scoped>
</style>
