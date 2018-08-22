<template>
  <div>
    <v-breadcrumbs divider="/" class="pa-0 ma-0">
      <v-breadcrumbs-item v-for="bcContext in contextStack"
        :key="bcContext.model.localName">
        <v-btn small flat @click="onPopToContext(bcContext.model.localName)"
          class="pa-0 ma-0" style="font-size: 8pt;">
          {{ bcContext.model.name }}
        </v-btn>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-card class="mb-3">
      <v-toolbar flat dark dense card class="primary">
        <font-awesome-icon :icon="context.model.icon" size="lg"/>
        <v-toolbar-title class="white--text">{{context.model.name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon class="ml-0" v-if="contextStack.length > 1"
          @click="onPopContext">
          <font-awesome-icon icon="arrow-up" size="lg"/>
        </v-btn>
        <v-btn icon class="ml-0" v-if="context.model.attributes"
          @click="onConfigureCurrent">
          <font-awesome-icon icon="cog" size="lg"/>
        </v-btn>
      </v-toolbar>
      <v-card-text v-html="context.model.description"></v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({}),

  props: ["context", "contextStack"],

  methods: {
    // Pop context from stack.
    onPopContext: function() {
      this.$emit("popContext");
    },
    // Pop to a given context.
    onPopToContext: function(context) {
      this.$emit("popToContext", context);
    },
    // Pop context from stack.
    onConfigureCurrent: function() {
      this.$emit("configureCurrent");
    }
  }
};
</script>

<style scoped>
</style>
