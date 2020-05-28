<template>
  <img v-if="!hidden" />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { imageAuthGet } from "sitewhere-ide-common";

@Component({})
export default class AuthenticatedImage extends Vue {
  @Prop() readonly url!: string;

  hidden = false;

  created() {
    const component = this;
    imageAuthGet(this.$store, this.url)
      .then(function(response) {
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onload = function() {
          const imageDataUrl = reader.result;
          const image = component.$el;
          image.setAttribute("src", imageDataUrl as string);
          component.hidden = false;
        };
      })
      .catch(function() {
        component.hidden = true;
      });
  }
}
</script>
