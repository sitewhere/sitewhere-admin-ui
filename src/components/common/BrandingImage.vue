<template>
  <image-zoom-on-hover v-if="imageUrl" :imageUrl="imageUrl" />
  <span v-else-if="icon" class="icon-style">
    <v-icon style="font-size: 40px;" class="grey--text pt-4 pb-4 pl-3 pr-2">fa-{{icon}}</v-icon>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { ImageZoomOnHover } from "sitewhere-ide-components";

import { IBrandedEntity } from "sitewhere-rest-api";

@Component({ components: { ImageZoomOnHover } })
export default class BrandingImage extends Vue {
  @Prop() readonly entity!: IBrandedEntity;

  /** Accessor for image URL */
  get imageUrl() {
    return this.entity ? this.entity.imageUrl : null;
  }

  /** Accessor for icon */
  get icon() {
    return this.entity ? this.entity.icon : null;
  }
}
</script>

<style scoped>
.icon-style {
  width: 100%;
  height: 100%;
}
</style>
