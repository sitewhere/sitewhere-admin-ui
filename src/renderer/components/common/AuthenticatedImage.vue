<template>
  <img v-if="!hidden">
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

import { imageAuthGet } from "../../rest/sitewhere-api-wrapper";

@Component({})
export default class AuthenticatedImage extends Vue {
  @Prop() readonly url!: string;

  hidden: boolean = false;

  created() {
    var component = this;
    imageAuthGet(this.$store, this.url)
      .then(function(response) {
        var reader: FileReader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onload = function() {
          var imageDataUrl = reader.result;
          let image = component.$el;
          image.setAttribute("src", imageDataUrl as string);
          component.hidden = false;
        };
      })
      .catch(function(e) {
        component.hidden = true;
      });
  }
}
</script>

<style scoped>
</style>
