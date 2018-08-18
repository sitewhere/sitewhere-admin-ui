<template>
  <div>
    <v-card>
      <v-toolbar flat dark dense card class="primary">
        <font-awesome-icon :icon="icon" size="lg"/>
        <v-toolbar-title class="white--text">
          {{ title }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <slot name="actions"></slot>
      </v-toolbar>
      <slot name="content"></slot>
    </v-card>
    <v-card v-if="!loaded">
      <v-card-text>
        <span class="title">{{ loadingMessage || 'Loading ...' }}</span>
        <v-progress-circular :indeterminate="true"/>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({}),

  props: ["icon", "title", "loaded", "loadingMessage"],

  components: {},

  methods: {}
};
</script>

<style scoped>
</style>
