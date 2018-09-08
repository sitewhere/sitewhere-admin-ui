<template>
  <v-container fluid class="pa-0">
  <v-layout row wrap>
      <v-flex xs5>
        <v-text-field :label="text" v-model="updatedColor" 
          prepend-icon="color_lens">
        </v-text-field>
      </v-flex>
      <v-flex xs7>
        <v-menu offset-y top :close-on-content-click="false" v-model="menu">
          <v-btn :style="{ 'background-color' : currentColor }" slot="activator"></v-btn>
          <chrome :value="chromeColor" @input="onColorChosen"></chrome>
        </v-menu>
      </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { Chrome } from "vue-color";

export default {
  data: () => ({
    menu: null,
    updatedColor: null
  }),

  components: {
    Chrome
  },

  computed: {
    chromeColor: function() {
      return {
        hex: this.currentColor
      };
    },
    currentColor: function() {
      return this.updatedColor || this.value;
    }
  },

  props: ["value", "text"],

  methods: {
    // Called when a color is chosen.
    onColorChosen: function(val) {
      this.updatedColor = val.hex;
      this.$emit("input", val.hex);
      this.$emit("opacityChanged", val.a);
    }
  }
};
</script>

<style scoped>
</style>
