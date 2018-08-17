<template>
  <div>
    <v-breadcrumbs divider="/" class="pa-0 ma-0">
      <v-breadcrumbs-item v-for="bcContext in contextStack"
        :key="bcContext.model.localName">
        <v-btn small flat @click="onPopToContext(bcContext.model.localName)"
          class="pa-0 ma-0">
          {{ bcContext.model.name }}
        </v-btn>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-card class="mb-3">
      <v-toolbar flat dark dense card class="primary">
        <v-icon dark>fa-{{context.model.icon}}</v-icon>
        <v-toolbar-title class="white--text">{{context.model.name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon class="ml-0" v-if="contextStack.length > 1"
          @click="onPopContext">
          <v-icon class="fa-lg">fa-arrow-up</v-icon>
        </v-btn>
        <v-btn icon class="ml-0" v-if="context.model.attributes"
          @click="onConfigureCurrent">
          <v-icon class="fa-lg">fa-gear</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text v-html="context.model.description"></v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {

  data: () => ({
  }),

  props: ['context', 'contextStack'],

  methods: {
    // Pop context from stack.
    onPopContext: function () {
      this.$emit('popContext')
    },
    // Pop to a given context.
    onPopToContext: function (context) {
      this.$emit('popToContext', context)
    },
    // Pop context from stack.
    onConfigureCurrent: function () {
      this.$emit('configureCurrent')
    }
  }
}
</script>

<style scoped>
</style>
