<template>
  <v-card flat v-if="unsaved" class="yellow lighten-5">
    <v-divider/>
    <v-card-text class="subtitle">
      <v-icon large class="yellow--text text--darken-3">fa-warning</v-icon>The microservice configuration has been updated.
      <v-btn class="green white--text" @click.native="onSave">
        Save Changes
        <v-icon class="white--text pl-2">fa-cloud-upload</v-icon>
      </v-btn>
      <v-btn class="red white--text" @click.native="onRevert">
        Revert Changes
        <v-icon fa class="white--text pl-2">fa-times</v-icon>
      </v-btn>
    </v-card-text>
    <v-divider/>
  </v-card>
</template>

<script>
export default {
  data: () => ({}),

  props: ["unsaved"],

  methods: {
    onSave: function() {
      this.$emit("save");
    },
    onRevert: function() {
      this.$emit("revert");
    }
  }
};
</script>
