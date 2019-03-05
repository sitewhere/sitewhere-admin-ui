<template>
  <v-card>
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field class="mt-1" label="Image URL" v-model="imageUrl" prepend-icon="image"></v-text-field>
            <div class="verror">
              <span v-if="imageUrlRequired">ImageUrl is required.</span>
            </div>
          </v-flex>
          <v-flex xs12>
            <icon-selector v-model="icon"></icon-selector>
            <div class="verror">
              <span v-if="iconRequired">Icon is required.</span>
            </div>
          </v-flex>
          <v-flex xs12>
            <color-input-field text="Background" v-model="backgroundColor"></color-input-field>
            <div class="verror">
              <span v-if="backgroundColorRequired">Background color is required.</span>
            </div>
          </v-flex>
          <v-flex xs12>
            <color-input-field text="Foreground" v-model="foregroundColor"></color-input-field>
            <div class="verror">
              <span v-if="foregroundColorRequired">Foreground color is required.</span>
            </div>
          </v-flex>
          <v-flex xs12>
            <color-input-field text="Border" v-model="borderColor"></color-input-field>
            <div class="verror">
              <span v-if="borderColorRequired">Border color is required.</span>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import IconSelector from "../common/IconSelector";
import ColorInputField from "../common/ColorInputField";

import { isBlank } from "../common/Utils";

export default {
  data: () => ({
    brandingImageUrl: null,
    brandingIcon: null,
    brandingBackgroundColor: null,
    brandingForegroundColor: null,
    brandingBorderColor: null,
    loaded: false,
    validated: false
  }),

  components: {
    IconSelector,
    ColorInputField
  },

  computed: {
    imageUrl: {
      // getter
      get: function() {
        if (!this.$data.loaded) {
          this.load(this.$props.branding);
        }
        return this.$data.brandingImageUrl;
      },
      // setter
      set: function(newValue) {
        this.$data.brandingImageUrl = newValue;
        var payload = this.generatePayload();
        this.$emit("payload", payload);
      }
    },
    icon: {
      // getter
      get: function() {
        if (!this.$data.loaded) {
          this.load(this.$props.branding);
        }
        return this.$data.brandingIcon;
      },
      // setter
      set: function(newValue) {
        this.$data.brandingIcon = newValue;
        var payload = this.generatePayload();
        this.$emit("payload", payload);
      }
    },
    backgroundColor: {
      // getter
      get: function() {
        if (!this.$data.loaded) {
          this.load(this.$props.branding);
        }
        return this.$data.brandingBackgroundColor;
      },
      // setter
      set: function(newValue) {
        this.$data.brandingBackgroundColor = newValue;
        var payload = this.generatePayload();
        this.$emit("payload", payload);
      }
    },
    foregroundColor: {
      // getter
      get: function() {
        if (!this.$data.loaded) {
          this.load(this.$props.branding);
        }
        return this.$data.brandingForegroundColor;
      },
      // setter
      set: function(newValue) {
        this.$data.brandingForegroundColor = newValue;
        var payload = this.generatePayload();
        this.$emit("payload", payload);
      }
    },
    borderColor: {
      // getter
      get: function() {
        if (!this.$data.loaded) {
          this.load(this.$props.branding);
        }
        return this.$data.brandingBorderColor;
      },
      // setter
      set: function(newValue) {
        this.$data.brandingBorderColor = newValue;
        var payload = this.generatePayload();
        this.$emit("payload", payload);
      }
    },
    imageUrlRequired: function() {
      if (
        this.$props.validateImageUrlRequired === false ||
        this.$data.validated === false
      ) {
        return false;
      }
      var valid = isBlank(this.$data.brandingImageUrl);
      return valid;
    },
    iconRequired: function() {
      if (
        this.$props.validateIconRequired === false ||
        this.$data.validated === false
      ) {
        return false;
      }
      var valid = isBlank(this.$data.brandingIcon);
      return valid;
    },
    backgroundColorRequired: function() {
      if (
        this.$props.validateBackgroundColorRequired === false ||
        this.$data.validated === false
      ) {
        return false;
      }
      var valid = isBlank(this.$data.brandingBackgroundColor);
      return valid;
    },
    foregroundColorRequired: function() {
      if (
        this.$props.validateForegroundColorRequired === false ||
        this.$data.validated === false
      ) {
        return false;
      }
      var valid = isBlank(this.$data.brandingForegroundColor);
      return valid;
    },
    borderColorRequired: function() {
      if (
        this.$props.validateBorderColorRequired === false ||
        this.$data.validated === false
      ) {
        return false;
      }
      var valid = isBlank(this.$data.brandingBorderColor);
      return valid;
    }
  },

  props: {
    branding: {
      type: Object,
      require: true
    },
    validateImageUrlRequired: {
      type: Boolean,
      require: false,
      default: false
    },
    validateIconRequired: {
      type: Boolean,
      require: false,
      default: false
    },
    validateBackgroundColorRequired: {
      type: Boolean,
      require: false,
      default: false
    },
    validateForegroundColorRequired: {
      type: Boolean,
      require: false,
      default: false
    },
    validateBorderColorRequired: {
      type: Boolean,
      require: false,
      default: false
    }
  },

  methods: {
    // Generate payload from UI.
    generatePayload: function() {
      var payload = {};
      payload.imageUrl = this.$data.brandingImageUrl;
      payload.icon = this.$data.brandingIcon;
      payload.backgroundColor = this.$data.brandingBackgroundColor;
      payload.foregroundColor = this.$data.brandingForegroundColor;
      payload.borderColor = this.$data.brandingBorderColor;

      return payload;
    },

    // Reset dialog contents.
    reset: function(e) {
      this.$data.brandingImageUrl = null;
      this.$data.brandingIcon = null;
      this.$data.brandingBackgroundColor = null;
      this.$data.brandingForegroundColor = null;
      this.$data.brandingBorderColor = null;
      this.$data.validated = false;
    },

    // Load dialog from a given payload.
    load: function(payload) {
      this.reset();

      if (payload) {
        this.$data.brandingImageUrl = payload.imageUrl;
        this.$data.brandingIcon = payload.icon;
        this.$data.brandingBackgroundColor = payload.backgroundColor;
        this.$data.brandingForegroundColor = payload.foregroundColor;
        this.$data.brandingBorderColor = payload.borderColor;
      }
      this.$data.loaded = true;
    },

    isValid: function(payload) {
      this.$data.validated = true;
      if (this.$props.validateImageUrlRequired === true) {
        return !isBlank(this.$data.brandingImageUrl);
      }
      if (this.$props.validateIconRequired === true) {
        return !isBlank(this.$data.brandingIcon);
      }
      if (this.$props.validateBackgroundColorRequired === true) {
        return !isBlank(this.$data.brandingBackgroundColor);
      }
      if (this.$props.validateForegroundColorRequired === true) {
        return !isBlank(this.$data.brandingForegroundColor);
      }
      if (this.$props.validateBorderColorRequired === true) {
        return !isBlank(this.$data.brandingBorderColor);
      }
      return true;
    }
  }
};
</script>

<style scoped>
</style>
