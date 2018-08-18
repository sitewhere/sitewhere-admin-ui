<template>
  <v-tooltip left>
    <v-btn flat icon class="ma-0" @click="onAction" slot="activator">
      <font-awesome-icon class="white--text" :icon="icon" size="lg"/>
    </v-btn>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  data: () => ({}),

  props: ["icon", "tooltip"],

  components: {},

  methods: {
    onAction: function() {
      this.$emit("action");
    }
  }
};
</script>

<style scoped>
</style>
