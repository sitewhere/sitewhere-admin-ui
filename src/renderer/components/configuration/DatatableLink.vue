<template>
  <v-card
    style="background-color: transparent;"
    @click="onLinkClicked"
    flat
    class="caption"
  >
    <a class="clink">{{ text }}</a>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

@Component({
  components: {}
})
export default class DatatableLink extends Vue {
  @Prop() readonly text!: string;

  onLinkClicked() {
    this.$emit("linkClicked");
  }
}
</script>

<style scoped>
.clink {
  color: #2255cc;
  font-size: 13px;
  text-decoration: underline;
}
</style>
