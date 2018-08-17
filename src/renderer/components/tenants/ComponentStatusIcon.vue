<template>
  <v-avatar size="23px" :class="statusClass">
    <v-icon size="10px" style="font-size: 11pt; margin-top: -1px;"
      :class="statusIconClass">{{ statusIcon }}</v-icon>
  </v-avatar>
</template>

<script>
export default {

  data: () => ({
  }),

  props: ['status'],

  computed: {
    statusClass: function () {
      var status = this.status
      if (status === 'Initializing') {
        return ['green', 'darken-2']
      } else if (status === 'InitializationError') {
        return ['red', 'darken-3']
      } else if (status === 'Starting') {
        return ['green', 'darken-2']
      } else if (status === 'Started') {
        return ['green', 'darken-2']
      } else if (status === 'StartedWithErrors') {
        return ['red', 'darken-3']
      } else if (status === 'Stopping') {
        return ['grey', 'darken-3']
      } else if (status === 'Stopped') {
        return ['grey', 'darken-3']
      } else if (status === 'StoppedWithErrors') {
        return ['red', 'darken-3']
      } else if (status === 'Terminating') {
        return ['grey', 'darken-3']
      } else if (status === 'Terminated') {
        return ['grey', 'darken-3']
      } else if (status === 'LifecycleError') {
        return ['red', 'darken-3']
      } else {
        return ['grey', 'darken-3']
      }
    },
    statusIcon: function () {
      var status = this.status
      if (status === 'Initializing') {
        return 'fa-gear'
      } else if (status === 'InitializationError') {
        return 'fa-exclamation-circle'
      } else if (status === 'Starting') {
        return 'fa-gear'
      } else if (status === 'Started') {
        return 'fa-gear'
      } else if (status === 'StartedWithErrors') {
        return 'fa-exclamation-circle'
      } else if (status === 'Stopping') {
        return 'fa-gear'
      } else if (status === 'Stopped') {
        return 'fa-stop'
      } else if (status === 'StoppedWithErrors') {
        return 'fa-exclamation-circle'
      } else if (status === 'Terminating') {
        return 'fa-times'
      } else if (status === 'Terminated') {
        return 'fa-times'
      } else if (status === 'LifecycleError') {
        return 'fa-bolt'
      } else {
        return 'fa-question'
      }
    },
    statusIconClass: function () {
      var status = this.status
      if (status === 'Initializing') {
        return ['fa-spin', 'green--text']
      } else if (status === 'InitializationError') {
        return ['red--text', 'text--lighten-4']
      } else if (status === 'Starting') {
        return ['fa-spin', 'green--text']
      } else if (status === 'Started') {
        return ['green--text', 'text--lighten-3']
      } else if (status === 'StartedWithErrors') {
        return ['yellow--text', 'text--lighten-1']
      } else if (status === 'Stopping') {
        return ['grey--text', 'text--lighten-4']
      } else if (status === 'Stopped') {
        return ['grey--text', 'text--lighten-4']
      } else if (status === 'StoppedWithErrors') {
        return ['red--text', 'text--lighten-4']
      } else if (status === 'Terminating') {
        return ['grey--text', 'text--lighten-4']
      } else if (status === 'Terminated') {
        return ['grey--text', 'text--lighten-4']
      } else if (status === 'LifecycleError') {
        return ['red--text', 'text--lighten-4']
      } else {
        return ['grey--text', 'text--lighten-4']
      }
    }
  }
}
</script>

<style scoped>
</style>
