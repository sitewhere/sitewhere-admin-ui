<template>
  <v-dialog v-model="visible" persistent :width="width" :lazy="true">
    <v-card>
      <v-toolbar dense flat card dark color="primary">
        <v-toolbar-title>{{title}}</v-toolbar-title>
      </v-toolbar>
      <error-banner :error="error"></error-banner>
      <v-card-text class="pa-0">
        <slot>
            <div>Your content goes here!</div>
        </slot>
      </v-card-text>
      <v-card-actions v-if="!hideButtons">
        <v-spacer></v-spacer>
        <v-btn class="grey--text darken-1" flat="flat"
          @click="onCancelClicked">{{cancelLabel}}</v-btn>
        <v-btn v-if="!hideCreate" :disabled="invalid" class="blue--text darken-1" flat="flat"
          @click="onCreateClicked">{{createLabel}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ErrorBanner from '../common/ErrorBanner'

export default {

  data: () => ({
  }),

  components: {
    ErrorBanner
  },

  props: ['title', 'width', 'visible', 'createLabel', 'cancelLabel', 'error',
    'hideButtons', 'hideCreate', 'invalid'],

  methods: {
    // Called when create button is clicked.
    onCancelClicked: function (e) {
      this.$emit('cancelClicked', e)
    },

    // Called when create button is clicked.
    onCreateClicked: function (e) {
      this.$emit('createClicked', e)
    }
  }
}
</script>

<style scoped>
</style>
