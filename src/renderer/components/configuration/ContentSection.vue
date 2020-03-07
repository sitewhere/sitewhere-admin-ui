<template>
  <v-card style="display: relative;" flat>
    <div class="mb-3">
      <v-icon style="width: 25px;" small>{{ icon }}</v-icon
      >{{ title }}:
    </div>
    <v-card flat style="margin-left: 25px;">
      <slot />
    </v-card>
    <div class="overlay"><slot name="overlay" /></div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

@Component({
  components: {}
})
export default class Section extends Vue {
  @Prop() readonly icon!: string;
  @Prop() readonly title!: string;
  @Prop() readonly help!: string;
}
</script>

<style scoped>
.overlay {
  position: absolute;
  left: 50%;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
