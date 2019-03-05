<template>
  <header-field :label="label">
    <a style="color: #33c; font-weight: 700;" @click="onLinkClicked">{{ text}}</a>
  </header-field>
</template>

<script>
import HeaderField from "./HeaderField";

import { routeTo } from "../common/Utils";

export default {
  data: () => ({}),

  props: ["label", "url", "text"],

  components: {
    HeaderField
  },

  methods: {
    // Handle link clicked.
    onLinkClicked: function() {
      routeTo(this, this.url);
    }
  }
};
</script>

<style scoped>
</style>
