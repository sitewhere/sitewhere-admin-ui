<template>
  <v-tooltip left>
    <v-btn
      fab
      fixed
      bottom
      right
      dark
      color="red darken-2"
      class="elevation-5"
      @click.stop="onButtonClicked"
      slot="activator"
    >
      <font-awesome-icon :icon="icon" size="lg"/>
    </v-btn>
    <span>{{ label }}</span>
  </v-tooltip>
</template>

<script>
export default {
  data: () => ({}),

  props: ["label", "icon"],

  methods: {
    // Called when button is clicked.
    onButtonClicked: function() {
      this.$emit("action");
    }
  }
};
</script>

<style scoped>
</style>
