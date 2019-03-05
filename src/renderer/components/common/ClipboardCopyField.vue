<template>
  <span>
    {{ field }}
    <v-tooltip right>
      <span
        slot="activator"
        v-clipboard="field"
        :key="field"
        @success="onFieldCopied"
        @error="onFieldCopyFailed"
      >
        <font-awesome-icon
          class="grey--text text--lighten-1 mt-1"
          icon="copy"
          size="sm"
          style="vertical-align: top;"
        />
      </span>
      <span>Copy to Clipboard</span>
    </v-tooltip>
    <v-snackbar :timeout="2000" success v-model="showFieldCopied">
      {{ message }}
      <v-btn dark flat @click="showFieldCopied = false">Close</v-btn>
    </v-snackbar>
  </span>
</template>

<script>
export default {
  data: () => ({
    showFieldCopied: false
  }),

  props: ["field", "message"],

  methods: {
    // Called after id is copied.
    onFieldCopied: function(e) {
      this.$data.showFieldCopied = true;
    },

    // Called if unable to copy id.
    onFieldCopyFailed: function(e) {}
  }
};
</script>

<style scoped>
</style>
