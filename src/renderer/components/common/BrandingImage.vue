<template>
  <sw-image-zoom-on-hover v-if="imageUrl" :imageUrl="imageUrl" />
  <span v-else-if="icon" class="icon-style">
    <font-awesome-icon class="grey--text mt-2" :icon="icon" :size="iconSize" />
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

import { IBrandedEntity } from "sitewhere-rest-api";

@Component({})
export default class BrandingImage extends Vue {
  @Prop() readonly entity!: IBrandedEntity;
  @Prop({ default: "5x" }) readonly iconSize!: string;

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
