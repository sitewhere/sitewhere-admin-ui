<template>
  <v-tooltip left>
    <font-awesome-icon class="ma-1 navbutton" :icon="icon" size="lg" 
      @click="onAction" slot="activator"/>
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
.navbutton {
  color: #eee;
  vertical-align: middle;
}
.navbutton:hover {
  color: #fff;
}
</style>
