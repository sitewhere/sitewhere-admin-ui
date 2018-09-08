<template>
  <v-card>
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field required class="mt-1" label="Image URL"
              v-model="imageUrl" prepend-icon="image">
            </v-text-field>
          </v-flex>
          <v-flex xs12>
            <icon-selector v-model="icon"></icon-selector>
          </v-flex>
          <v-flex xs12>
            <color-picker text="Background" v-model="backgroundColor">
            </color-picker>
          </v-flex>
          <v-flex xs12>
            <color-picker text="Foreground" v-model="foregroundColor">
            </color-picker>
          </v-flex>
          <v-flex xs12>
            <color-picker text="Border" v-model="borderColor">
            </color-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import IconSelector from "../common/IconSelector";
import ColorPicker from "../common/ColorPicker"

export default {

  data: () => ({
    brandingImageUrl: null,
    brandingIcon: null,
    brandingBackgroundColor: null,
    brandingForegroundColor: null,
    brandingBorderColor: null,
    loaded: false
  }),

  components: {
    IconSelector,
    ColorPicker
  },

  computed: {
    imageUrl: {
      // getter
      get: function () {
        if (!this.$data.loaded) {
          this.load(this.$props.branding);
        }
        return this.$data.brandingImageUrl;
      },
      // setter
      set: function (newValue) {
        this.$data.brandingImageUrl = newValue;
        var payload = this.generatePayload();
        this.$emit("payload", payload);
      }
    },
    icon: {
      // getter
      get: function () {
        if (!this.$data.loaded) {
          this.load(this.$props.branding);
        }
        return this.$data.brandingIcon;
      },
      // setter
      set: function (newValue) {
        this.$data.brandingIcon = newValue;
        var payload = this.generatePayload();
        this.$emit("payload", payload);
      }
    },
    backgroundColor: {
      // getter
      get: function () {
        if (!this.$data.loaded) {
          this.load(this.$props.branding);
        }
        return this.$data.brandingBackgroundColor;
      },
      // setter
      set: function (newValue) {
        this.$data.brandingBackgroundColor = newValue;
        var payload = this.generatePayload();
        this.$emit("payload", payload);
      }
    },
    foregroundColor: {
      // getter
      get: function () {
        if (!this.$data.loaded) {
          this.load(this.$props.branding);
        }
        return this.$data.brandingForegroundColor;
      },
      // setter
      set: function (newValue) {
        this.$data.brandingForegroundColor = newValue;
        var payload = this.generatePayload();
        this.$emit("payload", payload);
      }
    },
    borderColor: {
      // getter
      get: function () {
        if (!this.$data.loaded) {
          this.load(this.$props.branding);
        }
        return this.$data.brandingBorderColor;
      },
      // setter
      set: function (newValue) {
        this.$data.brandingBorderColor = newValue;
        var payload = this.generatePayload();
        this.$emit("payload", payload);
      }
    }
  },

  props: ['branding'],

  methods: {
    // Generate payload from UI.
    generatePayload: function () {
      var payload = {};
      payload.imageUrl = this.$data.brandingImageUrl;
      payload.icon = this.$data.brandingIcon;
      payload.backgroundColor = this.$data.brandingBackgroundColor;
      payload.foregroundColor = this.$data.brandingForegroundColor;
      payload.borderColor = this.$data.brandingBorderColor;

      return payload;
    },

    // Reset dialog contents.
    reset: function (e) {
      this.$data.brandingImageUrl = null;
      this.$data.brandingIcon = null;
      this.$data.brandingBackgroundColor = null;
      this.$data.brandingForegroundColor = null;
      this.$data.brandingBorderColor = null;
    },

    // Load dialog from a given payload.
    load: function (payload) {
      console.log('Loading branding')
      this.reset();

      if (payload) {
        this.$data.brandingImageUrl = payload.imageUrl;
        this.$data.brandingIcon = payload.icon;
        this.$data.brandingBackgroundColor = payload.backgroundColor;
        this.$data.brandingForegroundColor = payload.foregroundColor;
        this.$data.brandingBorderColor = payload.borderColor;
      }
      this.$data.loaded = true;
    }
  }
}
</script>

<style scoped>
</style>
